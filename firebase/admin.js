const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

import { initializeApp } from 'firebase-admin/app';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-6661a.firebaseio.com",
  })
} catch (e) {}

export const firestore = admin.firestore()