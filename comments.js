// Create web server application using express.js
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', './views');

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        res.render('comments', {
            comments: comments
        });
    });
});

// Get new comment
app.get('/comments/new', (req, res) => {
    res.render('new_comment');
});

// Post new comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            console.log('New comment has been saved!');
        });
        res.redirect('/comments');
    });
});

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));