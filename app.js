import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(port, () => {
    console.log("Server running on port 3000");
});
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let posts = [];
app.get('/', (req, res) => {
    res.render('index', { posts: posts})
});
app.post("/create-post", (req, res) => {
    const name = req.body.name;
    const title = req.body.title;
    const content = req.body.content;
    console.log(req.body)
    const post = {
        name: name,
        title: title,
        content: content,
        time: new Date().toLocaleString()
    }
    posts.push(post);
    res.redirect('/')
});
app.get('/edit-post', (req, res) => {
    const postIndex = req.params.index;
    const post = posts[postIndex];
    res.render('edit-post', { post: post, index: postIndex });
});
app.get('/delete-post', (req, res) => {
    const postIndex = req.params.index;
    posts.splice(postIndex, 1);
    res.redirect('/');
});
app.post('/edit-post/', (req, res) => {
    const postIndex = parseInt(req.params.index, 10);
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    if (isNaN(postIndex) || postIndex < 0 || postIndex >= posts.length) {
        return res.status(404).send('Post not found');
    }
    posts[postIndex].title = updatedTitle;
    posts[postIndex].content = updatedContent;
    res.redirect('/');
});
app.post('/update-post', (req, res) => {
    const postIndex = parseInt(req.params.index, 10);
    posts[postIndex].name = req.body.name;
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    posts[postIndex].title = updatedTitle;
    posts[postIndex].content = updatedContent;
    res.redirect('/');
});
app.get ('/', (req, res) => {
    res.render('index')
});

app.get ('/about', (req, res) => {
    res.render('about')
});