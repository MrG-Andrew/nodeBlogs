const express = require('express')
const Blog = require('../models/blog');

const router = express.Router()

router.get('/blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1 }).then(result=>res.render('index', {title:'All Blogs', blogs: result}))
})

router.post('/blogs', (req, res)=>{
    const blogs = new Blog(req.body)
    blogs.save()
        .then(result=>{
        res.redirect('/blogs')
        }).catch(err=>console.log(err))
})

router.get('/blogs/:id', (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
        res.render('details', {blog:result, title:'Blog details'})
        }).catch(err=>console.log(err))
})

router.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result=>res.json({redirect: '/blogs'}))
        .catch(err=>{console.log(err);})
})

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

module.exports= router;