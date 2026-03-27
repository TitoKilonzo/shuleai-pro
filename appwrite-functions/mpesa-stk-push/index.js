/**
 * Appwrite Function: mpesa-stk-push
 * Runtime: Node.js 18
 * 
 * Deploy this as an Appwrite Cloud Function.
 * Add these environment variables in Appwrite console:
 *   MPESA_CONSUMER_KEY
 *   MPESA_CONSUMER_SECRET
 *   MPESA_SHORTCODE
 *   MPESA_PASSKEY
 *   MPESA_CALLBACK_URL
 *   APPWRITE_ENDPOINT
 *   APPWRITE_PROJECT_ID
 *   APPWRITE_API_KEY
 *   APPWRITE_DATABASE_ID
 *   APPWRITE_SUBSCRIPTIONS_COLLECTION
 */

const { Client, Databases, ID } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  try {
    const body = JSON.parse(req.body || '{}');
    const { phone, amount, accountRef, description } = body;

    // ── 1. Get M-Pesa access token ──────────────────────────────
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const tokenRes = await fetch(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // ── 2. Generate timestamp & password ───────────────────────
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    // ── 3. Initiate STK Push ────────────────────────────────────
    const stkRes = await fetch(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.ceil(amount),
          PartyA: phone,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: phone,
          CallBackURL: process.env.MPESA_CALLBACK_URL,
          AccountReference: accountRef || 'ShuleAIPro',
          TransactionDesc: description || 'ShuleAI Pro Subscription',
        }),
      }
    );

    const stkData = await stkRes.json();
    log('STK Push response:', JSON.stringify(stkData));

    return res.json(stkData);
  } catch (err) {
    error('STK Push error:', err.message);
    return res.json({ error: err.message }, 500);
  }
};
