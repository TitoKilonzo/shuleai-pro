/**
 * Appwrite Function: demo-login
 * Runtime: Node.js 18
 *
 * This function creates a demo session for users to try the app.
 * It logs in as demo user and returns a JWT.
 */

const { Client, Account, Databases, ID, Query } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new Account(client);
    const databases = new Databases(client);

    // Login as demo user
    await account.createEmailPasswordSession('demo@shuleaipro.co.ke', 'Demo@2026');

    // Create JWT
    const jwt = await account.createJWT();

    // Get demo user
    const demoUsers = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECTION,
      [Query.equal('email', 'demo@shuleaipro.co.ke'), Query.limit(1)]
    );

    const demoUser = demoUsers.documents[0];

    return res.json({
      jwt: jwt.jwt,
      user: demoUser,
    });
  } catch (err) {
    error(`Demo login failed: ${err.message}`);
    return res.json({ error: 'Failed to create demo session' }, 500);
  }
};