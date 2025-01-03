import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { config } from '../../config/config';

// Initialize Firebase
const app = initializeApp(config.firebase);
export const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Future log: User signed in with Google
      return result.user;
    } catch (error) {
      // Future log: Google sign-in failed
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      // Future log: User signed out
    } catch (error) {
      // Future log: Sign out failed
      throw error;
    }
  },

  // Get current user's token
  async getToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
      return await user.getIdToken();
    } catch (error) {
      // Future log: Token fetch failed
      return null;
    }
  },

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}; 