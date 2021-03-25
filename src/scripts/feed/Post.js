import { getLoggedInUser } from "../data/DataManager.js"
import {getLikes} from "../data/DataManager.js"

const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}

export const Post = (postObject) => {
    if (getLoggedInUser().id === postObject.userId){
    return `
      <section class="post">
        <header>
            <h2 class="post__title">Title: ${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
        <button id="like__${postObject.id}">Like</button>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <p>Description: ${postObject.description}</p>
        <p>Timestamp: ${postObject.timestamp}</p>
        <p>User ID: ${postObject.userId}</p>
        <p>User Name: ${postObject.user.name}</p>
      </section>
    `
  } else {
    return `      <section class="post">
    <header>
        <h2 class="post__title">Title: ${postObject.title}</h2>
    </header>
    <img class="post__image" src="${postObject.imageURL}" />
    <button id="like__${postObject.id}">Like</button>
    <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
    <p>Description: ${postObject.description}</p>
    <p>Timestamp: ${postObject.timestamp}</p>
    <p>User ID: ${postObject.userId}</p>
    <p>User Name: ${postObject.user.name}</p>
  </section>`
  }

}
