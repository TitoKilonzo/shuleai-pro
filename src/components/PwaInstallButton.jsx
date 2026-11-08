import { useEffect, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';

const isRunningAsInstalledApp = () =>
  window.matchMedia?.('(display-mode: standalone)').matches
  || window.navigator.standalone === true;

export default function PwaInstallButton({ transparent = false, fullWidth = false, compact = false }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [installError, setInstallError] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const [isEmbeddedBrowser, setIsEmbeddedBrowser] = useState(false);
  const installedRef = useRef(false);
  const installTimeoutRef = useRef(null);

  useEffect(() => {
    const standalone = isRunningAsInstalledApp();
    installedRef.current = standalone;
    setInstalled(standalone);
    const userAgent = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent)
      || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1));
    setIsEmbeddedBrowser(/Electron|Code\//.test(userAgent));

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      window.__shuleaiInstallPrompt = event;
      setInstallPrompt(event);
      setInstallError('');
    };
    const handleAppInstalled = () => {
      installedRef.current = true;
      setInstalled(true);
      setInstalling(false);
      setInstallPrompt(null);
      window.__shuleaiInstallPrompt = null;
      setShowInstructions(false);
      window.clearTimeout(installTimeoutRef.current);
    };
    const handleDisplayModeChange = (event) => {
      if (event.matches) handleAppInstalled();
    };
    const displayMode = window.matchMedia?.('(display-mode: standalone)');

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    if (window.__shuleaiInstallPrompt) {
      setInstallPrompt(window.__shuleaiInstallPrompt);
    }
    if (displayMode?.addEventListener) {
      displayMode.addEventListener('change', handleDisplayModeChange);
    } else {
      displayMode?.addListener?.(handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (displayMode?.removeEventListener) {
        displayMode.removeEventListener('change', handleDisplayModeChange);
      } else {
        displayMode?.removeListener?.(handleDisplayModeChange);
      }
      window.clearTimeout(installTimeoutRef.current);
    };
  }, []);

  const handleInstall = async () => {
    setInstallError('');
    if (!installPrompt) {
      setShowInstructions(true);
      return;
    }

    try {
      const promptEvent = installPrompt;
      setInstalling(true);
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      setInstallPrompt(null);
      window.__shuleaiInstallPrompt = null;
      if (outcome === 'accepted') {
        if (installedRef.current || isRunningAsInstalledApp()) {
          installedRef.current = true;
          setInstalled(true);
          setInstalling(false);
          return;
        }

        installTimeoutRef.current = window.setTimeout(() => {
          if (!installedRef.current) {
            setInstalling(false);
            setInstallError('Installation was not confirmed. You can try again from your browser menu.');
            setShowInstructions(true);
          }
        }, 15000);
        return;
      }

      setInstalling(false);
    } catch (error) {
      setInstalling(false);
      console.error('Unable to open the app install prompt:', error);
      setInstallError('The install prompt could not be opened. Use your browser menu to install the app.');
      setShowInstructions(true);
    }
  };

  if (installed) return null;

  return (
    <>
      <button
        type="button"
        className="btn btn-sm"
        onClick={handleInstall}
        disabled={installing}
        aria-label={installing ? 'Installing ShuleAI Pro' : 'Install App'}
        title="Install App"
        style={{
          gap: '0.4rem',
          justifyContent: fullWidth ? 'center' : undefined,
          width: fullWidth ? '100%' : compact ? 38 : undefined,
          padding: compact ? '0.55rem' : undefined,
          background: transparent ? 'rgba(255,255,255,0.12)' : 'var(--forest-pale)',
          color: transparent ? '#fff' : 'var(--forest)',
          border: transparent ? '1px solid rgba(255,255,255,0.3)' : 'none',
        }}
      >
        {installing ? <Download size={15} className="pwa-installing-icon" /> : <Download size={15} />}
        {!compact && (installing ? 'Installing...' : 'Install App')}
      </button>
      {installError && !showInstructions && (
        <p role="status" style={{ position: 'absolute', top: '100%', right: 0, width: 260, padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--muted)', boxShadow: 'var(--shadow)', fontSize: '0.78rem', zIndex: 1001 }}>
          {installError}
        </p>
      )}

      {showInstructions && (
        <div
          className="modal-overlay"
          style={{ zIndex: 3000 }}
          onClick={() => setShowInstructions(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-app-title"
            onClick={event => event.stopPropagation()}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              width: 'min(100% - 2rem, 420px)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setShowInstructions(false)}
              aria-label="Close install instructions"
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', color: 'var(--muted)' }}
            >
              <X size={20} />
            </button>
            <Download size={24} color="var(--forest)" />
            <h2 id="install-app-title" style={{ fontSize: '1.25rem', margin: '0.75rem 2rem 0.5rem 0' }}>
              Install ShuleAI Pro
            </h2>
            <p style={{ color: 'var(--muted)', margin: '0 0 1.25rem' }}>
              {installPrompt
                ? 'Install ShuleAI Pro on this device for quick access from your home screen.'
                : installError || (isIOS
                  ? 'Tap Share in Safari, then choose Add to Home Screen.'
                  : isEmbeddedBrowser
                    ? 'Open ShuleAI Pro in Chrome or Edge, then choose Install app from the browser menu.'
                  : 'To install, open your browser menu and choose Install app or Add to Home screen.')}
            </p>
            {installPrompt && (
              <button type="button" className="btn btn-primary" onClick={handleInstall} disabled={installing}>
                <Download size={16} /> {installing ? 'Installing...' : 'Install App'}
              </button>
            )}
          </section>
        </div>
      )}
    </>
  );
}
