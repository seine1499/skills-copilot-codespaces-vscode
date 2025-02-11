// Create web server
// 1. Import express
// 2. Create an express server
// 3. Create a route for GET /comments
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Listen on port 3000

// 1. Import express
const express = require('express');
const bodyParser = require('body-parser');

// 2. Create an express server
const app = express();

app.use(bodyParser.json());

let comments = [
    {id: 1, author: 'John', content: 'Content 1'},
    {id: 2, author: 'Mary', content: 'Content 2'},
    {id: 3, author: 'Jane', content: 'Content 3'},
];

// 3. Create a route for GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 4. Create a route for POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.status(201).json(comment);
});

// 5. Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    if (index >= 0) {
        comments[index] = comment;
        res.json(comment);
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// 6. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    if (index >= 0) {
        comments.splice(index, 1);
        res.json({id: parseInt(id)});
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// 7. Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});