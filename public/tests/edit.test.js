const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Edit Page', () => {
  it('should render the edit page', async () => {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, '../public/edit.html'), 'utf8'));
    const document = dom.window.document;
    const titleField = document.querySelector('.title');
    const articleField = document.querySelector('.article');
    expect(titleField).not.toBeNull();
    expect(articleField).not.toBeNull();
  });

  it('should upload an image', async () => {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, '../public/edit.html'), 'utf8'));
    const document = dom.window.document;
    const bannerImg = document.querySelector('#banner-upload');
    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    bannerImg.dispatchEvent(new dom.window.Event('change', { target: { files: [file] } }));
    expect(bannerImg.files).toHaveLength(1);
  });

  it('should add an image to the article', async () => {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, '../public/edit.html'), 'utf8'));
    const document = dom.window.document;
    const articleField = document.querySelector('.article');
    const image = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    articleField.dispatchEvent(new dom.window.Event('change', { target: { files: [image] } }));
    expect(articleField.value).toContain('![image](image.jpg)');
  });
});
