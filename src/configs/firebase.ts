// Import the functions you need from the SDKs you need
import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs4c3Benfg69xmPcjS7wibIwOuLth_88A",
  authDomain: "test-demo-bad90.firebaseapp.com",
  databaseURL: "https://test-demo-bad90-default-rtdb.firebaseio.com",
  projectId: "test-demo-bad90",
  storageBucket: "test-demo-bad90.appspot.com",
  messagingSenderId: "676047902595",
  appId: "1:676047902595:web:b099c242ee41ed325f08b6",
  measurementId: "G-FSVX35PFK5"
}

// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig)
}

export default Firebase
