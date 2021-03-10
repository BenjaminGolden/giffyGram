import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"
import { usePostCollection } from "./data/DataManager.js"

 const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {//when i get allPosts I can create the list
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
