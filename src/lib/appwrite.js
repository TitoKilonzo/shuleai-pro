import { Client, Account, Databases, Storage, Functions, Query, ID } from 'appwrite';

// ─── Appwrite Client ─────────────────────────────────────────────
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '69c617ba003919c47d2a');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export { client };

// ─── Constants ───────────────────────────────────────────────────
export const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '69c61a7b001484e05a91';
export const COLLECTIONS = {
  USERS: import.meta.env.VITE_APPWRITE_USERS_COLLECTION || '69c61f41001ab5c3dfc1',
  SUBSCRIPTIONS: import.meta.env.VITE_APPWRITE_SUBSCRIPTIONS_COLLECTION || '69c61f7b00235ff27bbb',
  PROGRESS: import.meta.env.VITE_APPWRITE_PROGRESS_COLLECTION || '69c61fa80009f9e1434d',
  GAMES: import.meta.env.VITE_APPWRITE_GAMES_COLLECTION || '69c61fcb001601ce824e',
  ACCESS_CODES: import.meta.env.VITE_APPWRITE_ACCESS_CODES_COLLECTION || '69c61ff80017a8df288f',
};

// ─── Auth Functions ───────────────────────────────────────────────
export const authService = {
  async register({ name, email, password, role = 'student', phone = '' }) {
    try {
      console.log('Starting registration for:', email);
      const user = await account.create(ID.unique(), email, password, name);
      console.log('User account created:', user.$id);
      await account.createEmailPasswordSession(email, password);
      console.log('Session created for user');
      // Skip profile creation for now due to permission issues
      // try {
      //   await databases.createDocument(DB_ID, COLLECTIONS.USERS, user.$id, {
      //     name, email, phone, role,
      //     createdAt: new Date().toISOString(),
      //     avatar: '',
      //   });
      //   console.log('User profile created');
      // } catch (dbError) {
      //   console.error('Failed to create user profile document:', dbError.message);
      //   // We don't throw here so the user is still logged in even if the profile document fails
      // }
      return user;
    } catch (authError) {
      console.error('Registration failed:', authError.message);
      throw authError;
    }
  },

  async login(email, password) {
    try {
      console.log('Starting login for:', email);
      const session = await account.createEmailPasswordSession(email, password);
      console.log('Login session created');
      return session;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async logout() {
    return account.deleteSession('current');
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      // Return base user with default role since profile collection may not be accessible
      return { ...user, role: 'student', isProfileIncomplete: true };
    } catch (error) {
      console.error('Get current user failed:', error.message);
      return null;
    }
  },

  async resetPassword(email) {
    return account.createRecovery(email, `${window.location.origin}/reset-password`);
  },
};

// ─── Subscription Functions ───────────────────────────────────────
export const subscriptionService = {
  async createSubscription({ userId, plan, amount, mpesaRef, phone, expiresAt }) {
    return databases.createDocument(DB_ID, COLLECTIONS.SUBSCRIPTIONS, ID.unique(), {
      userId, plan, amount, mpesaRef, phone,
      status: 'active',
      startedAt: new Date().toISOString(),
      expiresAt,
    });
  },

  async getUserSubscription(userId) {
    try {
      const result = await databases.listDocuments(DB_ID, COLLECTIONS.SUBSCRIPTIONS, [
        Query.equal('userId', userId),
        Query.equal('status', 'active'),
        Query.orderDesc('$createdAt'),
        Query.limit(1),
      ]);
      return result.documents[0] || null;
    } catch {
      return null;
    }
  },

  async isSubscriptionActive(userId) {
    const sub = await this.getUserSubscription(userId);
    if (!sub) return false;
    return new Date(sub.expiresAt) > new Date();
  },

  async validateAccessCode(code) {
    try {
      const result = await databases.listDocuments(DB_ID, COLLECTIONS.ACCESS_CODES, [
        Query.equal('code', code.toUpperCase()),
        Query.equal('used', false),
      ]);
      return result.documents[0] || null;
    } catch {
      return null;
    }
  },

  async redeemAccessCode(codeDocId, userId) {
    return databases.updateDocument(DB_ID, COLLECTIONS.ACCESS_CODES, codeDocId, {
      used: true, usedBy: userId, usedAt: new Date().toISOString(),
    });
  },
};

// ─── Progress Tracking ────────────────────────────────────────────
export const progressService = {
  async saveProgress({ userId, gameId, subject, score, timeSpent, completedAt }) {
    return databases.createDocument(DB_ID, COLLECTIONS.PROGRESS, ID.unique(), {
      userId, gameId, subject, score, timeSpent,
      completedAt: completedAt || new Date().toISOString(),
    });
  },

  async getUserProgress(userId, { subject = null, limit = 50 } = {}) {
    const filters = [Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(limit)];
    if (subject) filters.push(Query.equal('subject', subject));
    const result = await databases.listDocuments(DB_ID, COLLECTIONS.PROGRESS, filters);
    return result.documents;
  },

  async getProgressStats(userId) {
    const allProgress = await this.getUserProgress(userId, { limit: 500 });
    const totalGames = allProgress.length;
    const avgScore = totalGames > 0
      ? Math.round(allProgress.reduce((acc, p) => acc + (p.score || 0), 0) / totalGames)
      : 0;
    const subjects = [...new Set(allProgress.map(p => p.subject))];
    const totalMinutes = Math.round(allProgress.reduce((acc, p) => acc + (p.timeSpent || 0), 0) / 60);
    return { totalGames, avgScore, subjects: subjects.length, totalMinutes };
  },
};

export { ID, Query };
export default client;
