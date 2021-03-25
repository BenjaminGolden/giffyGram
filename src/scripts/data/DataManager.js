export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}



let loggedInUser = {}

export const setLoggedInUser = (userObj) => {
  console.log(userObj);
  loggedInUser = userObj;
}

export const getLoggedInUser = () => {
    return {...loggedInUser};

}

export const logoutUser = () => {
  loggedInUser = {}
}

export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => response.json())
  .then(parsedUser => {
    //is there a user?
    console.log("parsedUser", parsedUser) //data is returned as an array
    if (parsedUser.length > 0){
      setLoggedInUser(parsedUser[0]);
      return getLoggedInUser();
    }else {
      //no user
      return false;
    }
  })
}

export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}

let postCollection = [];//current state of post in our app. it should only be modified by using getPosts, 
//which goes to the database and gets post data. 

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];//...(spread operator) for every single item in the array, make a new array and return the data.   
}

// export const getPosts = () => {
//   return fetch("http://localhost:8088/posts")
//     .then(response => response.json())
//     .then(parsedResponse => {
//       postCollection = parsedResponse//postCollection should = what we get back from the database (parsedResponse)
//       return parsedResponse;//return the data to who called it
//     })
// }

export const getPosts = () => {
  // const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse
      return parsedResponse;
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

export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }

  })
      .then(response => response.json())
      .then(getPosts)
}

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

export const getPostsFromCurrentUser = (userId) => {
  return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user`)
    .then(response => response.json())
    
}

export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
      .then(getPosts)
}

export const getLikes = (postId) => {
  return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
    .then(response => response.json())
}

export const postLike = likeObject => {
  return fetch(`http://localhost:8088/userLikes/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(likeObject)
  })
      .then(response => response.json())
      .then(getPosts)
}