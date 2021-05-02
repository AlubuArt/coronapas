import {firebase_app} from './configs/firebase.config';
import 'firebase/firestore';
import 'firebase/storage';

const storage = firebase_app.storage();
const storageRef = storage.ref();
const db = firebase_app.firestore();
const coll = db.collection('users/');



export const checkIfUserHasPass = async (user) => {
    let result = false;
    let ref = coll.doc(user);
    await ref.get().then((doc) => {
        if(doc.data().picture) {
            result = true;
        }
    })
    return result  
}

export const sendDataToDatabase = async (user, dob, data, status) => {
    let ref = coll.doc(user);
    ref.set({
        dateOfBirth: dob,
        name: data.name,
        height: data.height,
        hairColor: data.hair_color,
        skinColor: data.skin_color,
        mass: data.mass,
        eyeColor: data.eye_color,
        gender: data.gender,
        homeworld: data.homeworld,
        coronaStatus: status

    }, {merge: true})

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

export const uploadPictureToStorage = async (user, picture) => {
    let upload = storageRef.child('userPictures/' + picture.name).put(picture);
    
    upload.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    },
    (error) => {
        //handle errors
    },
    () => {
    upload.snapshot.ref.getDownloadURL().then((URLToFile) => {
          
          addFileToUserProfile(user, URLToFile);
          
      })
        
    })
    

    return
    
}



const addFileToUserProfile = (user, URLToFile) => {
    let ref = coll.doc(user);
    ref.set({
      picture: URLToFile
  
    }, {merge: true} );
  }

