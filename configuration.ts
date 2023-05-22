const configuration = {
  firebase: {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: "AIzaSyDwwjaht7rKNXKuEq8AUrrJkEPxlN9bnuQ",
    authDomain: "hyype-event-5eb43.firebaseapp.com",
    projectId: "hyype-event-5eb43",
    storageBucket: "hyype-event-5eb43.appspot.com",
    messagingSenderId: "78364617394",
    appId: "1:78364617394:web:547d7a1ed900db8d20f7ab",
    measurementId: "G-JB0JFEGBBX",
  },
  // emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  // emulator: process.env.NEXT_PUBLIC_EMULATOR === "true",
  paths: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    appHome: "/dashboard",
  },
};

export default configuration;
