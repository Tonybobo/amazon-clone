import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyA3QaRFYbRs4qmjjrANXQU-saWM6TwH-no",
    authDomain: "clone-a04c2.firebaseapp.com",
    projectId: "clone-a04c2",
    storageBucket: "clone-a04c2.appspot.com",
    messagingSenderId: "16595804788",
    appId: "1:16595804788:web:ba74675199be915a19e721",
    measurementId: "G-N2JJM7B9ZP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db= firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};