const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/events', async (req, res) => {

    console.log('Received Event', req.body.type);
    if(req.body.type === 'CommentCreated') {

        const {id, content, postId, status} = req.body.data;
        //status = 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated", 
            data: {id, content, postId, status: 'approved'}
        }).catch((error)=> {
            console.log(error.message);
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('listening to port 4003');
});