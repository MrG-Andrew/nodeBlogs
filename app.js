const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();
// connect to mongodb
const dbURL = 'mongodb+srv://andrew:andrew1234@ninjanode.tqqdgmz.mongodb.net/NinjaNode?retryWrites=true&w=majority'

mongoose.connect(dbURL)
          .then(result => {app.listen(3001); console.log('connected to db');})
            .catch(err => console.log(err))

            
// register view engine
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/blogs',blogRoutes)

app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
