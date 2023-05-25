import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";



console.log("process env ",import.meta.env)

const firebaseConfig = {

  apiKey: "AIzaSyC6xh2AfoQYpXkxbO1QVodFdwwDVyqq9Ow",

  authDomain: "peeppips.firebaseapp.com",

  databaseURL: "https://peeppips-default-rtdb.firebaseio.com",

  projectId: "peeppips",

  storageBucket: "peeppips.appspot.com",

  messagingSenderId: "416398021385",

  appId: "1:416398021385:web:55a8ca37215e528db4b9d8",

  measurementId: "G-ZXYJ33GGTD"

};

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(res.user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length > 0) {
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   authProvider: "google",
      //   email: user.email,
      // });
      return({ firstName: user.displayName, email: user.email })

    }
    else{
      return({error:"User doesn't exists"})
    }
    
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      // If err is an instance of Error, handle the error
      // alert(err.message);
      return { error: err.message };
    } else {
      // Handle the case when err is of type unknown
      return { error: 'An unknown error occurred.' };
    }
  }
};

const registerWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(res.user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   authProvider: "google",
      //   email: user.email,
      // });
      // const dispatch = useDispatch()
      // dispatch(login({firstName:user.displayName,email:user.email}))
      return({ firstName: user.displayName, email: user.email })
    }
    else{
      return({ firstName: user.displayName, email: user.email,profile_pic:user.photoURL })
    }
  } catch (err) {
    console.error(err);
    
    if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
      alert(err.message);
      return { error: err.message };
    } else {
      return { error: 'An unknown error occurred.' };
    }
  }
  
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);


export {
  auth,
  db,
  app,
  signInWithGoogle,
  registerWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage
};