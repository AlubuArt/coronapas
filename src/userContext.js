import React, {useState} from "react";


export const UserContext = React.createContext();


export const UserProvider = ({children}) => {
  const [userID, setUserID] = useState('');
  const [dob, setDob] = useState('');
  const [coronaStatus, setCoronaStatus] = useState('');
  const [starWarsPerson, setStarWarsPerson] = useState('');
  const [pictureURL, setPictureURL] = useState('');
  
  const setUser = (userID) => {
    setUserID(userID)
  }

  

  return (
    <UserContext.Provider value={{userID, setUser, dob, setDob, coronaStatus, setCoronaStatus, starWarsPerson, setStarWarsPerson, pictureURL, setPictureURL}}>
    {children}
    </UserContext.Provider>
  )

}




