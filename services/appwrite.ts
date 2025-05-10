import { Client, Databases, Account, ID } from 'appwrite';

export const DB_ID  = '681f5c110025242db069';
export const COL_USERS = '681f5c1e0032ca0a4287';
export const COL_UPDATES = '681f5c74003c48ffa34d';
const EXPO_PUBLIC_APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const EXPO_PUBLIC_APPWRITE_PROJECT_ID = '681f5b7b00063934a13c';

const client = new Client()
  .setEndpoint(EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const db      = new Databases(client);
export const account = new Account(client);

/** 1️⃣ call once on app launch  */
export async function ensureSession() {
  try {
    await account.get();                     // already logged‑in? fine.
  } catch {
    await account.createAnonymousSession();  // guest user
  }
}

/** 2️⃣ create the “users” doc (ignore if it exists) */
export async function saveUser(phone: string, city: string) {
  const docId = phone.replace(/[^\d]/g, '');      
  const payload = { phone, city };
  try {
    await db.createDocument(DB_ID, COL_USERS, docId, payload);
  } catch (e: any) {
    if (e.code !== 409) throw e; // 409 = doc already exists
  }
}

/** 3️⃣ add a Gold/Silver update row */
export async function addPriceUpdate(
  phone: string,
  city: string,
  metal: 'Gold' | 'Silver',
  price: number
) {
  return db.createDocument(
    DB_ID,
    COL_UPDATES,
    ID.unique(),
    { phone, city, metal, price, updatedAt: new Date().toISOString() }
  );
}
