export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <div><button id="edit--${postObject.id}">Edit</button></div>
        <p>${postObject.description}</p>
        <p>${postObject.timestamp}</p>
        <p>${postObject.userId}</p>
      </section>
    `
  }

