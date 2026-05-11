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

    // Check if demo user exists, create if not
    let demoUser;
    try {
      const demoUsers = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION,
        [Query.equal('email', 'demo@shuleaipro.co.ke'), Query.limit(1)]
      );
      demoUser = demoUsers.documents[0];
    } catch (err) {
      log('Demo user not found, creating...');
      // Create demo user account if it doesn't exist
      try {
        const user = await account.create(ID.unique(), 'demo@shuleaipro.co.ke', 'Demo@2026', 'Demo User');
        // Create profile
        await databases.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_USERS_COLLECTION,
          user.$id,
          {
            name: 'Demo User',
            email: 'demo@shuleaipro.co.ke',
            phone: '',
            role: 'student',
            createdAt: new Date().toISOString(),
            avatar: '',
          }
        );
        demoUser = { $id: user.$id, name: 'Demo User', email: 'demo@shuleaipro.co.ke', role: 'student' };
      } catch (createErr) {
        error(`Failed to create demo user: ${createErr.message}`);
        return res.json({ error: 'Failed to create demo user' }, 500);
      }
    }

    // Login as demo user
    await account.createEmailPasswordSession('demo@shuleaipro.co.ke', 'Demo@2026');

    // Create JWT
    const jwt = await account.createJWT();

    return res.json({
      jwt: jwt.jwt,
      user: demoUser,
    });
  } catch (err) {
    error(`Demo login failed: ${err.message}`);
    return res.json({ error: 'Failed to create demo session' }, 500);
  }
};