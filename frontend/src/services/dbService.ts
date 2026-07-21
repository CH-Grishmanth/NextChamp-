import { db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  sport?: string;
  skills?: string[];
  avatar_url?: string;
  updatedAt?: any;
}

export interface ChatMessage {
  sender: 'user' | 'gemini';
  message: string;
  timestamp: any;
}

export interface AnalysisSession {
  id?: string;
  userId: string;
  videoUrl: string;
  videoName?: string;
  drillCategory: string;
  score: number;
  geminiSuggestion: string; // The primary suggestion text from the Gemini AI Coach
  mistakes?: string[];
  suggestions?: string[];
  messages?: ChatMessage[];
  createdAt: any;
  metrics?: Array<{ label: string; score: number; maxScore: number }>;
  badge?: { title: string; description: string; icon: string };
}

/**
 * Save or update user profile parameters in Firestore.
 */
export async function saveUserProfile(uid: string, profileData: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, {
    ...profileData,
    updatedAt: new Date()
  }, { merge: true });
}

/**
 * Fetch user profile from Firestore.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: uid, ...docSnap.data() } as UserProfile;
  }
  return null;
}

/**
 * Save a new video analysis session containing score, video metadata, and initial suggestions.
 * Returns the generated session ID.
 */
export async function saveAnalysisSession(sessionData: Omit<AnalysisSession, 'id'>): Promise<string> {
  const colRef = collection(db, 'analysis_sessions');
  const docRef = await addDoc(colRef, {
    ...sessionData,
    createdAt: new Date()
  });
  return docRef.id;
}

/**
 * Retrieve the full history of analysis sessions for a specific athlete.
 */
export async function getUserAnalysisHistory(userId: string): Promise<AnalysisSession[]> {
  const colRef = collection(db, 'analysis_sessions');
  // Query without orderBy to avoid needing a Firestore composite index
  const q = query(colRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const sessions: AnalysisSession[] = [];
  querySnapshot.forEach((docSnap) => {
    sessions.push({ id: docSnap.id, ...docSnap.data() } as AnalysisSession);
  });
  
  // Sort in-memory by createdAt descending
  return sessions.sort((a, b) => {
    const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
    const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
}

/**
 * Append a chat message (either from the user or the Gemini AI Coach) to an ongoing analysis session.
 */
export async function addChatMessage(sessionId: string, sender: 'user' | 'gemini', message: string): Promise<void> {
  const docRef = doc(db, 'analysis_sessions', sessionId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const currentMessages = data.messages || [];
    const newMessage: ChatMessage = {
      sender,
      message,
      timestamp: new Date()
    };
    await updateDoc(docRef, {
      messages: [...currentMessages, newMessage]
    });
  }
}

/**
 * Delete a video analysis session from Firestore.
 */
export async function deleteAnalysisSession(sessionId: string): Promise<void> {
  const docRef = doc(db, 'analysis_sessions', sessionId);
  await deleteDoc(docRef);
}
