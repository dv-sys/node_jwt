const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req,res)=>{
    res.json({
        message: "Hey!, Welcome to this Api service..!",
    })
})

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                message: "Posts Created",
                authData
            })
        }
    })
    
})

app.post('/api/login', (req,res) => {
    const user = {
        id: 1,
        username: 'Dv',
        email: 'dv@gmail.com'
    }
    jwt.sign({user:user},'secretkey',(err,token) => {
        res.json({
            token,
        })
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }
    else{
        res.sendStatus("403")
    }
}

app.listen(8000,(req,res)=>{
    console.log("server started on port 8000");
})