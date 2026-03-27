/**
 * M-Pesa Daraja API Integration
 * NOTE: In production, all Daraja API calls MUST be proxied through
 * Appwrite Functions or a secure server to protect your credentials.
 * This file handles the client-side STK Push initiation flow.
 */

// ─── Plan Definitions ─────────────────────────────────────────────
export const SUBSCRIPTION_PLANS = {
  weekly: {
    id: 'weekly',
    name: 'Weekly Access',
    price: 200,
    days: 7,
    badge: null,
    color: '#52B788',
    features: [
      'Access all 54+ games',
      'All Learning Areas included',
      '7 days full access',
      'Progress tracking',
    ],
  },
  monthly: {
    id: 'monthly',
    name: 'Monthly Access',
    price: 600,
    days: 30,
    badge: 'Most Popular',
    color: '#0B4F3C',
    features: [
      'Access all 54+ games',
      'All Subjects included',
      '30 days full access',
      'Progress tracking',
      'Priority Support',
    ],
  },
  termly: {
    id: 'termly',
    name: 'Termly Access',
    price: 1650,
    days: 90,
    badge: 'Best Value',
    color: '#F59E0B',
    features: [
      'Access all 54+ games',
      'All Subjects included',
      '90 days full access',
      'Progress tracking',
      'Priority Support',
      'Achievement Certificates',
    ],
  },
};

// ─── Phone Number Formatter ───────────────────────────────────────
export const formatPhone = (phone) => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) cleaned = '254' + cleaned.slice(1);
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (!cleaned.startsWith('254')) cleaned = '254' + cleaned;
  return cleaned;
};

export const validatePhone = (phone) => {
  const formatted = formatPhone(phone);
  return /^2547[0-9]{8}$/.test(formatted) || /^2541[0-9]{8}$/.test(formatted);
};

// ─── STK Push via Appwrite Function / Proxy ───────────────────────
export const mpesaService = {
  /**
   * Initiates M-Pesa STK Push payment.
   * Routes through Appwrite Function: mpesa-stk-push
   * The function handles Daraja auth token, STK push, and callback.
   */
  async initiateStkPush({ phone, amount, accountRef, description }) {
    const formattedPhone = formatPhone(phone);

    const payload = {
      phone: formattedPhone,
      amount,
      accountRef: accountRef || 'ShuleAIPro',
      description: description || 'ShuleAI Pro Subscription',
    };

    // In demo/sandbox mode, simulate a successful payment
    if (import.meta.env.VITE_MPESA_ENV === 'sandbox' || import.meta.env.DEV) {
      return simulateStkPush(payload);
    }

    // Production: call your Appwrite Function
    const response = await fetch(
      `${import.meta.env.VITE_APPWRITE_ENDPOINT}/functions/mpesa-stk-push/executions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID,
        },
        body: JSON.stringify({ body: JSON.stringify(payload) }),
      }
    );
    const result = await response.json();
    return JSON.parse(result.responseBody);
  },

  /**
   * Poll payment status (via Appwrite Function)
   */
  async checkPaymentStatus(checkoutRequestId) {
    if (import.meta.env.VITE_MPESA_ENV === 'sandbox' || import.meta.env.DEV) {
      return { ResultCode: '0', ResultDesc: 'The service request is processed successfully.' };
    }
    const response = await fetch(
      `${import.meta.env.VITE_APPWRITE_ENDPOINT}/functions/mpesa-query/executions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID,
        },
        body: JSON.stringify({ body: JSON.stringify({ checkoutRequestId }) }),
      }
    );
    const result = await response.json();
    return JSON.parse(result.responseBody);
  },
};

// ─── Sandbox Simulator ────────────────────────────────────────────
async function simulateStkPush({ phone, amount }) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 2000));
  const checkoutRequestId = `ws_CO_${Date.now()}`;
  // Simulate processing time then approve
  setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent('mpesa-payment-complete', {
        detail: {
          checkoutRequestId,
          ResultCode: '0',
          ResultDesc: 'The service request is processed successfully.',
          MpesaReceiptNumber: `QFJ${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          Amount: amount,
          PhoneNumber: phone,
        },
      })
    );
  }, 5000);

  return {
    MerchantRequestID: `mr_${Date.now()}`,
    CheckoutRequestID: checkoutRequestId,
    ResponseCode: '0',
    ResponseDescription: 'Success. Request accepted for processing',
    CustomerMessage: 'Success. Request accepted for processing',
  };
}

export const getExpiryDate = (plan) => {
  const days = SUBSCRIPTION_PLANS[plan]?.days || 30;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};
