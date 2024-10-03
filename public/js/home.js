const blogSec = document.querySelector('.blogs-sec');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSec.innerHTML += `
    <div class="blog-card>
        <img src="${data.bannerImg}" class="blog-img" atl="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-view">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn light">read</a>
    </div>
    `;
}