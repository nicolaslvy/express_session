const express = require('express');
// const cors = require('cors')
const path = require('path')
const { Server } = require('http');
const app = express()
const PORT =  process.env.PORT || 3500;

app.use((req,res,next)=>{
    console.log(`${req.method}, 
                  ${req.path}  `)
    next()              
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new-page', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page', (req, res)=>{
    res.redirect("/new-page");
})

app.get('/*', (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})



app.listen(PORT,()=> console.log(`server runnig on port ${PORT}`))