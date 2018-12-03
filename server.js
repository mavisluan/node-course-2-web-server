const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

// let handlebars know we want to add support for partials
hbs.registerPartials(__dirname + '/views/partials')
// use handlebars --- app.set(key, value)
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}` 

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    }) 
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance')
// })

// use express middleware
app.use(express.static( __dirname + '/public'))

// helper function without argument
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

// helper function with argument
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

// Use hbs 
//Route 1. render a static page (Home page)
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to my website",
    })
})

// Route 2. render a static page (About page)
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

// Route 3. send back json with errorMessage property
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to find the result'
    })
})

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project'
    })
})
// bind the app to a port on our machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

