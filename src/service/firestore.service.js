import {firebase_app} from './configs/firebase.config';
import 'firebase/firestore';
import 'firebase/storage';

const storage = firebase_app.storage();
const storageRef = storage.ref('userPictures/');
const db = firebase_app.firestore();
const coll = db.collection('users/');



export const checkIfUserHasPass = async (user) => {
    let result = false;
    let ref = coll.doc(user);
    await ref.get().then((doc) => {
        if(doc.data().picture) {
            result = true;
        } else {
            result = false;
        }
    })
    return result  
}

export const sendDataToDatabase = async (user, picture,data, dob, status) => {
    let ref = coll.doc(user);
    await ref.set({
        dateOfBirth: dob,
        name: data.name,
        height: data.height,
        hairColor: data.hair_color,
        skinColor: data.skin_color,
        mass: data.mass,
        eyeColor: data.eye_color,
        gender: data.gender,
        homeworld: data.homeworld,
        coronaStatus: status,
        picture: picture,


    }, {merge: true})

    return true

}

export const getUserDataFromDatabase = async (user) => {

    let data;
    let ref = coll.doc(user);
    await ref.get().then((doc) => {
        data = doc.data();
        return 
    })
    
    return data;

}

export const uploadPictureToStorage = async (picture) => {
    
    let upload =  storageRef.child(picture.name);
    await upload.put(picture)
    let url = await upload.getDownloadURL()
    return url;
}


/* 
const addFileToUserProfile = (user, URLToFile) => {
    let ref = coll.doc(user);
    ref.set({
      picture: URLToFile
  
    }, {merge: true} );
  }
 */
