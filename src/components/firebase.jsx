import firebaseConf from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCjJkdhady04jbb0Ic2Wsr6_8LPqPnbm4s",
    authDomain: "abhisreview.firebaseapp.com",
    databaseURL: "https://abhisreview.firebaseio.com",
    projectId: "abhisreview",
    storageBucket: "abhisreview.appspot.com",
    messagingSenderId: "398762034494"
};
export const firebase = firebaseConf.initializeApp(config);
export const db = firebase.firestore();