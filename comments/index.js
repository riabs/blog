const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id, content, status: 'pending'});
    commentsByPostId[req.params.id] = comments;


    await axios.post('http://event-bus-srv:4005/events', {
        type: "CommentCreated", 
        data: {
            id, content, postId : req.params.id, status : 'pending'
        }
    }).catch(error => {
        console.log(error.message);
    });;

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    console.log('Received Event', type);

    if(type === 'CommentModerated') {
        const {id, content, postId, status} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id == id;
        });

        comment.status = status;
        
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentUpdated", 
            data: {id, content, postId, status}
        }).catch(error => {
            console.log(error.message);
        });
    }
    
    res.send({});
});


app.listen(4001, () => {
    console.log('listening to port 4001');
});