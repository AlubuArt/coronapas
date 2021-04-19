import {firebase_app} from './configs/firebase.config';
import 'firebase/firestore';
import 'firebase/storage';

const storage = firebase_app.storage();
const storageRef = storage.ref();
const db = firebase_app.firestore();
const coll = db.collection('users/');

export const checkIfUserHasPass = (userId) => {
    return false
}

export const sendDataToDatabase = async (user, dob, data) => {
    const ref = coll.doc(user);
    ref.set({
        dateOfBirth: dob,
        name: data.name,
        height: data.height,
        hairColor: data.hair_color,
        skinColor: data.skin_color,
        mass: data.mass,
        eyeColor: data.eye_color,
        gender: data.gender,
        homeworld: data.homeworld

    }, {merge: true})

}


export const uploadPictureToStorage = async (user, picture) => {
    let upload = storageRef.child('userPictures/' + picture.name).put(picture);
    console.log(upload)

    upload.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    },
    (error) => {
        //handle errors
    },
    () => {
    upload.snapshot.ref.getDownloadURL().then((URLToFile) => {
          console.log('file available at', URLToFile);
          addFileToUserProfile(user, URLToFile);
          
      })
        
    })
    
}

const addFileToUserProfile = (user, URLToFile) => {
    const ref = coll.doc(user);
    ref.set({
      picture: URLToFile
  
    }, {merge: true} );
  }

