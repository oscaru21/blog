const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id
    res.send(commentsByPostId[postId] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const postId = req.params.id
    const {content} = req.body

    const comments = commentsByPostId[req.params.id] || []

    if(content.length !== 0){
        comments.push({id, content, status: 'pending'})
    
        commentsByPostId[req.params.id] = comments
    
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentCreated',
            data: {
                id, content, postId, status: 'pending'
            }
        })
    }


    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Received event ' + req.body.type)

    const { type, data } = req.body

    if(type === 'CommentModerated'){
        const {id, postId, status, content} = data

        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => comment.id === id)

        comment.status = status

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status
            }
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on port 4001');
})