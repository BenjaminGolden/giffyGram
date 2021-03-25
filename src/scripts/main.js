import { getPosts, getLoggedInUser, createPost, deletePost, updatePost, getSinglePost, postLike } from "./data/DataManager.js"
import { usePostCollection, logoutUser, loginUser, registerUser, setLoggedInUser, getPostsFromCurrentUser } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"


 const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {//when i get allPosts I can create the list
          postElement.innerHTML = PostList(allPosts.reverse());//reverses post array display
      })
  }
  
  const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}


const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout"){
    console.log("Bye!!")
	}
})

//event listener tied to my posts button
//need to call the getPostsFromCurrentUser function and save the result in a variable
applicationElement.addEventListener("click", event => {
  if(event.target.id === "myPosts"){
      console.log('show my posts');
      const userId = getLoggedInUser().id;
    let myPosts = []
    getPostsFromCurrentUser(userId)
      .then(myPostData => {
      myPosts = myPostData
      console.log(myPosts)
      const myPostElement = document.querySelector(".postList");
      myPostElement.innerHTML = PostList(myPosts)
    })

  }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "giffygram"){
        console.log("clicked on main")
    }
})

applicationElement.addEventListener("click", event => {
    if(event.target.id === "directMessageIcon"){
        console.log("pen'd ya!")
    }
} );

applicationElement.addEventListener("click", event => {
    if(event.target.id === "PB&Jtime"){
        console.log("peanut butter jelly time!")
    }
})

applicationElement.addEventListener("change", event => {
    if(event.target.id === "yearSelection"){
        const yearAsNumber = parseInt(event.target.value)
        console.log(`user wants to see posts since ${yearAsNumber}`)
        showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}

applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))

	}
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
  })
  
  applicationElement.addEventListener("click", event => {
    event.preventDefault();//means don't refresh the page
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      console.log(getLoggedInUser().id)
      const postObject = {
          title: title,
          imageURL: url,
          description: description,
          userId: getLoggedInUser().id,
          timestamp: Date.now()
      }
    // be sure to import from the DataManager
        createPost(postObject)
        .then(response => {
            console.log("what is the new post", response);
            showPostList();
        })
    }
  })

  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        console.log("split", event.target.id)
      const postId = event.target.id.split("__")[1];
      console.log(postId);
      console.log(typeof postId)
      deletePost(postId)
        .then(response => {
          showPostList();
        })
    }
  })

  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
      const postId = event.target.id.split("__")[1];
      getSinglePost(postId)//get single post gets latest data from database.
        .then(response => {
          showEdit(response);
        })
    }
  })
  //only allow authors to edit their own posts. 
  //Refactor the Post to only display the edit and delete buttons if the post belongs to the logged in user. 
  const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
  }

  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
      const postId = event.target.id.split("__")[1];
      //collect all the details into an object
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      const timestamp = document.querySelector("input[name='postTime']").value
      
      const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser().id,
        timestamp: parseInt(timestamp),
        id: parseInt(postId)
      }

      showPostEntry();//the object(postObject) has been collected at this point so we can get rid of the form before the updatePost runs. 

      updatePost(postObject)
        .then(response => {
          showPostList();
        })
    }
  })

  applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
      logoutUser();
      console.log(getLoggedInUser());
    }
  })


  const checkForUser = () => {
  	if (sessionStorage.getItem("user")){
		  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    	startGiffyGram();
  	}else {
   		showLoginRegister();
  	}
}

const showLoginRegister = () => {
  	showNavBar();
  	const entryElement = document.querySelector(".entryForm");
  	//template strings can be used here too
  	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}


applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
    sessionStorage.clear();
    checkForUser();
  }
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("like")) {
	  const likeObject = {
		 postId: event.target.id.split("__")[1],
		 userId: getLoggedInUser().id
	  }
	  postLike(likeObject)
		.then(response => {
		  showPostList();
		})
	}
  })



const showFooter = () => {
    const footerElement = document.querySelector('footer');
    footerElement.innerHTML = Footer();
}

const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
  }

const startGiffyGram = () => {
 showNavBar();
 showFooter();   
 showPostList();
 showPostEntry();
}

checkForUser();
