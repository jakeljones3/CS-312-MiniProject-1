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
app.get('/edit-post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index, 10); 
    const post = posts[postIndex];
    res.render('edit-post', { post: post, index: postIndex });
});
app.get('/delete-post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index, 10); 
    posts.splice(postIndex, 1);
    res.redirect('/');
});
app.post("/update-post/:index", (req, res) => {
    const postIndex = parseInt(req.params.index, 10); 
    const { name, title, content } = req.body;

    if (postIndex >= 0 && postIndex < posts.length) {
        posts[postIndex] = {
            name: name,
            title: title,
            content: content,
            time: new Date().toLocaleString() 
        };
    }
    res.redirect('/');
});
