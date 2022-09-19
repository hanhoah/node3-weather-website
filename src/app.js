const log = (text)=>{console.log(text)}

const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express()

console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
log(viewsPath)

// setup Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Mein Titel', 
        name: 'Louis Nguyen'
    })
})

app.get('/about', (req, res)=>{
    log('opening about page')
    res.render('about', {
        title: 'Meine About Page', 
        name: "Han Hoa Huynh"
    })
})

app.get('/help', (req, res)=>{
    log('opening help page')
    res.render('help', {
        title: 'This is the help Page', 
        name: 'Kiet Huynh', 
        message: 'Call 2200-849.500 vor immediate help'

    })


})

app.get('/weather', (req, res)=>{
    // missing adress
    if(!req.query.address){
        res.send({error: 'address is missing!'})
        return
    }
    // If address is given
    res.send({
        location: req.query.address, 
        forecast: 'Very sunny, a little bit rain in the evening.'

    })
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Error', 
        name: 'Hanniboy', 
        pagetype: 'Help article',
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error: "you must provide a search term."
        })
    }else {
        res.send({
            products: [],
        })
    }
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Error', 
        name: 'Hanniboy', 
        pagetype: 'Page',
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running!')

})


