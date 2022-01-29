const express = require('express');
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')
const { Server } = require('http');
const app = express()
const PORT = process.env.PORT || 3500;

app.use(logger)

// || !origin

const whitelist = ['https://www.google.com', 'http://127.0.0.1', 'http://localhost:3500/']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cors(corsOptions))

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})


app.get('/new-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page', (req, res) => {
    res.redirect("/new-page");
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: "404 not found" })
    }
    else{
        res.type('txt').send("404 not found")
    }

})


app.use(errorHandler)




app.listen(PORT, () => console.log(`server runnig on port ${PORT}`))