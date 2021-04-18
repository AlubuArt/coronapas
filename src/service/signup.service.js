import {firebase_app} from './configs/firebase.config';
import 'firebase/firestore';

const db = firebase_app.firestore()
const coll = db.collection('users/')

export const makeNewUser = async (email, pass) => {


    const userObj = await firebase_app.auth().createUserWithEmailAndPassword(email, pass);
    const user = userObj.user;
    const userID = user.uid;
    coll.doc(userID).set({
        email: email,
        userID: userID
    })

    localStorage.setItem('userID', userID);


    
}