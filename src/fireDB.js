import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBB03WJgMhRfJZuOMg_E_u5-b18qoPT6iY",
    authDomain: "store-9ef25.firebaseapp.com",
    projectId: "store-9ef25",
    storageBucket: "store-9ef25.appspot.com",
    messagingSenderId: "611903430293",
    appId: "1:611903430293:web:06e8a175b1a02ec29f859c"
  };
  
  const fireDb =   firebase.initializeApp(firebaseConfig);
  
  export default fireDb;