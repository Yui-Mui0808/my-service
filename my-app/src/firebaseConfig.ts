// Firebaseの設定
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAeBYZhCqYz_le45p0xrwzTcflCC6DNmj4",
    authDomain: "my-service-45924.firebaseapp.com",
    projectId: "my-service-45924",
    storageBucket: "my-service-45924.appspot.com",
    messagingSenderId: "275740727171",
    appId: "1:275740727171:web:809ec2646dd4fdf401cc8b6"
  };

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

export default app;
