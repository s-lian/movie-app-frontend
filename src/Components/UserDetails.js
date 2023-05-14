// import API_URL from "../API";

// export default function UserDetails(email, password, contact) {

//     const pathname = window.location.pathname;
//     const url = `${API_URL + pathname}`;


//     if ((email !== "" || null) || (password !== "" || null)) {

//         return fetch(url, {
//             method: "POST",
//             headers: {
//                 "accept": "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: email, password: password })
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(res.statusText); // Throw an error if response status is not ok
//                 }
//                 return res.json();
//             })
//             .then((res) => {
//                 if (res.error !== true) {  // user login success

//                     localStorage.setItem("bearer_token", res.bearerToken.token)
//                     localStorage.setItem("refresh_token", res.refreshToken.token)
//                     localStorage.setItem("User contact", JSON.stringify(contact.email))
//                 } else {
//                     throw new Error(res.message)
//                 }
//             })
//             .catch(error => console.log(error))

//     } else alert("No email or password provided.\n Please try again")





// }
