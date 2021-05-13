import {firebase_app } from './configs/firebase.config'



export const login = async (email, pass) => {

    
        const loggedInUser = await firebase_app.auth().signInWithEmailAndPassword(email, pass);
        const uid = loggedInUser.user.uid;
        return uid;
    
    
}

export const logout = async () => {
    await firebase_app.auth().signOut();
    return 
}