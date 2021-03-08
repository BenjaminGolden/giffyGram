import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"

 const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts);
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

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
  
      console.log(`User wants to see posts since ${yearAsNumber}`)
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

applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

const showFooter = () => {
    const footerElement = document.querySelector('footer');
    footerElement.innerHTML = Footer();
}

const startGiffyGram = () => {
 showNavBar();
 showFooter();   
 showPostList();
}

startGiffyGram();
