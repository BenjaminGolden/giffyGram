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
    return {...loggedInUser};

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

export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {//fetch takes two arguments.
      method: "POST",//these are the details we want to return from the fetch. we are posting and not using the default of get.
      headers: {//this is of the type of json, so that when this call comes in from the database it konws what to do with it. 
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)// is the object that we are sending to the database. 
                                    //adding "" marks around everything so it can be read by the database
  })
      .then(response => response.json())
}

// export const getPosts = () => {
//     return fetch("http://localhost:8088/posts")
//     .then(response => response.json()) //if all we want is to get the data we don't need the parsedResponse. 
//     // .then(parsedResponse => {
//     //     // do something with response here
//     //     return parsedResponse;
// }