export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}



const loggedInUser = {
    id: 1,
    name: "Bryan",
    email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
    return loggedInUser;
}

let postCollection = [];//current state of post in our app. it should only be modified by using getPosts, 
//which goes to the database and gets post data. 

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];//...(spread operator) for every single item in the array, make a new array and return the data.   
}

export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse//postCollection should = what we get back from the database (parsedResponse)
      return parsedResponse;//return the data to who called it
    })
}

// export const getPosts = () => {
//     return fetch("http://localhost:8088/posts")
//     .then(response => response.json()) //if all we want is to get the data we don't need the parsedResponse. 
//     // .then(parsedResponse => {
//     //     // do something with response here
//     //     return parsedResponse;
// }