import { getPosts, getLoggedInUser, createPost } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"
import { usePostCollection } from "./data/DataManager.js"
import { PostEntry } from "./feed/PostEntry.js"

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
		console.log("Bye 'Felicia")
	}
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "giffygram  "){
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
		console.log("the id is", event.target.id.split("--")[1])
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

startGiffyGram();
