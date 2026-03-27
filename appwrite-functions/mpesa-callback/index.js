/**
 * Appwrite Function: mpesa-callback
 * Handles M-Pesa payment confirmation from Safaricom.
 * Set your MPESA_CALLBACK_URL to:
 *   https://[REGION].appwrite.io/v1/functions/mpesa-callback/executions
 */

const { Client, Databases, ID, Query } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const DB_ID = process.env.APPWRITE_DATABASE_ID;
  const SUBS_COLLECTION = process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION;

  try {
    const callback = JSON.parse(req.body || '{}');
    const { Body: { stkCallback } } = callback;
    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;

    log(`M-Pesa callback: CheckoutRequestID=${CheckoutRequestID}, ResultCode=${ResultCode}`);

    if (ResultCode !== 0) {
      log(`Payment failed: ${ResultDesc}`);
      return res.json({ success: false, message: ResultDesc });
    }

    // Extract metadata
    const meta = {};
    if (CallbackMetadata?.Item) {
      CallbackMetadata.Item.forEach(item => { meta[item.Name] = item.Value; });
    }

    log('Payment successful:', JSON.stringify(meta));

    // Update subscription status in Appwrite
    const subs = await databases.listDocuments(DB_ID, SUBS_COLLECTION, [
      Query.equal('mpesaRef', `PENDING-${CheckoutRequestID}`),
      Query.limit(1),
    ]);

    if (subs.documents.length > 0) {
      await databases.updateDocument(DB_ID, SUBS_COLLECTION, subs.documents[0].$id, {
        mpesaRef: meta.MpesaReceiptNumber || CheckoutRequestID,
        status: 'active',
        paidAt: new Date().toISOString(),
      });
      log('Subscription activated:', subs.documents[0].$id);
    }

    return res.json({ success: true, receipt: meta.MpesaReceiptNumber });
  } catch (err) {
    error('Callback error:', err.message);
    return res.json({ success: false, error: err.message }, 500);
  }
};
