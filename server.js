const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Monogodb connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User ', userSchema);

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String
});

const Blog = mongoose.model('Blog', blogSchema);

let right_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(right_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(right_path, "home.html"));
})

const secretKey = process.env.SECRET_KEY;

// Create a login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          res.status(401).json({ error: 'Invalid email or password' });
        } else if (!match) {
          res.status(401).json({ error: 'Invalid email or password' });
        } else {
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
          res.json({ token });
        }
      });
    }
  });
});

// Create a signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      const user = new User({ name, email, password: hash });
      user.save((err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to create user' });
        } else {
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
          res.json({ token });
        }
      });
    }
  });
});

// Create a logout route
app.post('/logout', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

// Add authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(right_path, "edit.html"));
})

app.get('/profile', (req, res) => {
  const userId = req.query.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving user data' });
    } else {
      res.render('profile', { user });
    }
  });
});

app.post('/upload',(req, res) => {
    let file = req.files.image;
    let date = new Date();
    let name_image = date.getDate() + date.getTime() + file.name;
    let path = 'public/uploads/' + name_image;

    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            const blog = new Blog({
                title: 'New Blog Post',
                content: 'This is a new blog post',
                image: `uploads/${name_image}`
        });
        blog.save((err, blog) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Failed to save blog post' });
            } else {
              res.json({ message: 'Blog post saved successfully' });
            }
          });    
        }
    });
});

app.get("/:blog", (req, res) => {
  if (req.user) {
    const blogId = req.params.blog;
    Blog.findById(blogId, (err, blog) => {
      if (err) {
        console.error(err);
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.sendFile(path.join(right_path, "post.html"), { blog });
      }
    });
  } else {
    res.redirect('/login');
  }
  
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log("Server is running on port 3000");
})