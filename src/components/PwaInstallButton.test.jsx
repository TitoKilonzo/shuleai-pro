import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PwaInstallButton from './PwaInstallButton';

beforeEach(() => {
  window.__shuleaiInstallPrompt = null;
});

afterEach(() => {
  cleanup();
  window.__shuleaiInstallPrompt = null;
});

describe('PwaInstallButton', () => {
  it('opens the browser install prompt and waits for installation confirmation', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event('beforeinstallprompt', { cancelable: true });
    Object.assign(event, {
      prompt,
      userChoice: Promise.resolve({ outcome: 'accepted' }),
    });

    render(<PwaInstallButton />);
    act(() => window.dispatchEvent(event));

    expect(event.defaultPrevented).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /install app/i }));

    await waitFor(() => expect(prompt).toHaveBeenCalledOnce());
    expect(screen.getByRole('button', { name: /installing/i })).toBeDisabled();
    act(() => window.dispatchEvent(new Event('appinstalled')));
    await waitFor(() => expect(screen.queryByRole('button', { name: /install/i })).not.toBeInTheDocument());
  });

  it('uses an install prompt captured before the button mounted', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event('beforeinstallprompt', { cancelable: true });
    Object.assign(event, {
      prompt,
      userChoice: Promise.resolve({ outcome: 'accepted' }),
    });
    window.__shuleaiInstallPrompt = event;

    render(<PwaInstallButton />);
    fireEvent.click(screen.getByRole('button', { name: /install app/i }));

    await waitFor(() => expect(prompt).toHaveBeenCalledOnce());
    expect(screen.getByRole('button', { name: /installing/i })).toBeDisabled();
    act(() => window.dispatchEvent(new Event('appinstalled')));
    await waitFor(() => expect(screen.queryByRole('button', { name: /install/i })).not.toBeInTheDocument());
  });

  it('keeps the install action available when the browser prompt is dismissed', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event('beforeinstallprompt', { cancelable: true });
    Object.assign(event, {
      prompt,
      userChoice: Promise.resolve({ outcome: 'dismissed' }),
    });

    render(<PwaInstallButton />);
    act(() => window.dispatchEvent(event));
    fireEvent.click(screen.getByRole('button', { name: /install app/i }));

    await waitFor(() => expect(prompt).toHaveBeenCalledOnce());
    expect(screen.getByRole('button', { name: /install app/i })).toBeEnabled();
  });

  it('shows browser instructions when no install prompt is available', () => {
    render(<PwaInstallButton />);
    fireEvent.click(screen.getByRole('button', { name: /install app/i }));

    expect(screen.getByRole('dialog', { name: /install shuleai pro/i })).toBeInTheDocument();
    expect(screen.getByText(/open your browser menu and choose install app/i)).toBeInTheDocument();
  });
});
