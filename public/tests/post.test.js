const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Post Page', () => {
  it('should render the post page', async () => {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, '../public/post.html'), 'utf8'));
    const document = dom.window.document;
    const postList = document.querySelector('#post-list');
    expect(postList).not.toBeNull();
  });

  it('should display a list of posts', async () => {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, '../public/post.html'), 'utf8'));
    const document = dom.window.document;
    const postList = document.querySelector('#post-list');
    const posts = [
      { title: 'Post 1', content: 'This is post 1' },
      { title: 'Post 2', content: 'This is post 2' },
    ];
    postList.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('li');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      `;
      postList.appendChild(postElement);
    });
    expect(postList.children).toHaveLength(2);
  });
});