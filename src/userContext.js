import React, {useState} from "react";


export const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [userID, setUserID] = useState('');
  

  const setUser = (userID) => {
    setUserID(userID)
  }
  

  return (
    <UserContext.Provider value={{userID, setUser}}>
    {children}
    </UserContext.Provider>
  )
}


export default UserProvider;