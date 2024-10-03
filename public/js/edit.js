const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

const bannerImg = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const postBtn = document.querySelector('.post-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImg.addEventListener('change', () => {
    uploadImage(bannerImg, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const form = new FormData();
        form.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: form
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("Please select an image");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

postBtn.addEventListener('click', () => {
    if(articleField.value.length && blogTitleField.value.length){
        const blogTitle = blogTitleField.value.split(" ").join("-");
        const id = Math.random().toString(36).substr(2, 9);
        const docName = `${blogTitle}-${id}`;
        const date = new Date();

        const blogPost = new mongoose.Schema({
            title: String,
            article: String,
            publishedAt: String,
        });

        const BlogPost = mongoose.model('BlogPost', blogPost);

        const newBlogPost = new BlogPost({
            title: blogTitleField.value,
            article: articleField.value,
            postedAt: `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`,
        });

        newBlogPost.save((err) => {
        if (err) {
            console.error(err);
        } else {
            location.href = `post.html#${docName}`;
        }
    });
  }
});