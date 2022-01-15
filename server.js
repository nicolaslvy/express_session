const express = require('express');
const { Server } = require('http');
const app = express()
const path = require('path')
const PORT =  process.env.PORT || 3500;

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.htmlñ'));
})

app.listen(PORT,()=> console.log(`server runnig on port ${PORT}`))