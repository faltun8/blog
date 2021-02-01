import { createContext, useState, useEffect } from "react";
// import { fetchData } from '../helper/FetchData'
import axios from "axios";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const catchToken = localStorage.getItem("token");

  // var config = {
  //   method: "get",
  //   url: "https://blog-backend-django.herokuapp.com/dj-rest-auth/user/",
  //   headers: {
  //     Authorization: "Token a11bfcd8ebbb5224251e641e5039e852a566cc69",
  //   },
  // };
  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  async function getData(token) {
    await axios
      .get("https://blog-backend-django.herokuapp.com/dj-rest-auth/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (catchToken != null) {
      getData(catchToken);
    } 
    
  }, [catchToken]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
