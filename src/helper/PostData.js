// import axios from "axios";

// export const postData = async (path, data) => {
  
//   const token = localStorage.getItem("token");
//   console.log("token", token);
//   const response = await axios.post(`${path}`, data, {
//     headers: {
//       token,
//     },
//   });
//   return response?.data;
// };


// const [loggedIn, setLoggedIn] = useState(false)
// const onFinish = (values) => {
//     postData("/api/auth/login", values)
//       .then((data) => {
//         localStorage.setItem("token", data.key);
//         setLoggedIn(true);
//         history.push("/");
//       })
//       .catch((err) => {
//         toast(err?.message || "An error occured");
//       });
//   };
