import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (
  userName,
  email,
  password,
  confirmPassword
) => {
  console.log(password, confirmPassword, "//////");
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update displayName (username) after account creation
  await updateProfile(userCredential.user, { displayName: userName });
  await signOut(auth);
  return userCredential;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const sendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
