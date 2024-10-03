const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const postsCollection = db.collection('posts');

    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // create a new post
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const post = { title, content };
      createPost(post);
    });

    // create a new post
    function createPost(post) {
      postsCollection.insertOne(post, function(err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log('Post created successfully!');
          createPostElement(result.insertedId, post.title, post.content);
        }
      });
    }

    // create a post element
    function createPostElement(postId, title, content) {
      const postElement = document.createElement('li');
      postElement.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <button class="edit-post">Edit</button>
        <button class="delete-post">Delete</button>
      `;
      postElement.dataset.postId = postId;
      postList.appendChild(postElement);
    }

    // edit a post
    postList.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-post')) {
        const postId = e.target.parentNode.dataset.postId;
        const title = e.target.parentNode.querySelector('h3').textContent;
        const content = e.target.parentNode.querySelector('p').textContent;
        editPost(postId, title, content);
      }
    });

    // edit a post
    function editPost(postId, title, content) {
      postsCollection.updateOne({ _id: ObjectId(postId) }, { $set: { title, content } }, function(err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log('Post updated successfully!');
        }
      });
    }

    // delete a post
    postList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-post')) {
        const postId = e.target.parentNode.dataset.postId;
        deletePost(postId);
      }
    });

    // delete a post
    function deletePost(postId) {
      postsCollection.deleteOne({ _id: ObjectId(postId) }, function(err, result) {
        if (err ) {
          console.error(err);
        } else {
          console.log('Post deleted successfully!');
        }
      });
    }
  }

  // ...

// display posts
function displayPosts() {
    postsCollection.find().toArray(function(err, posts) {
      if (err) {
        console.error(err);
      } else {
        console.log('Posts retrieved successfully!');
        const postList = document.getElementById('post-list');
        postList.innerHTML = '';
        posts.forEach(function(post) {
          const postElement = document.createElement('li');
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="edit-post">Edit</button>
            <button class="delete-post">Delete</button>
          `;
          postElement.dataset.postId = post._id;
          postList.appendChild(postElement);
        });
      }
    });
  }
  // create a new post
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const post = { title, content };
    createPost(post);
    displayPosts();
  });
});

function displayPosts() {
  postsCollection.find().toArray(function(err, posts) {
    if (err) {
      console.error(err);
    } else {
      console.log('Posts retrieved successfully!');
      const postList = document.getElementById('post-list');
      postList.innerHTML = '';
      posts.forEach(function(post) {
        const postElement = document.createElement('li');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button class="edit-post">Edit</button>
          <button class="delete-post">Delete</button>
        `;
        postElement.dataset.postId = post._id;
        postList.appendChild(postElement);
      });
    }
  });
}

displayPosts();