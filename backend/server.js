const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
app.use(express.json());
require('dotenv').config(); // Load environment variables from .env

const Blog = require('./model/model')
const constants = require('./util/constants')
const { Op } = require('sequelize');
// // Import the PostgresDB class from db.js
// const PostgresDB = require('./db');

// // Create an instance of the PostgresDB class
// const postgresDB = new PostgresDB();

// // Initialize the database connection
// postgresDB.initialiseConnection();

app.get('/', (req, res) => {
    const page = req.query.page; // Access route parameter
    const searchTerm = req.query.searchTerm; // Access query parameter
    const id = req.query.id
    console.log(req.query)
    console.log("AACC")
    const findBlogs = (whereClause) => {

        whereClause = {
            ...whereClause,
            deleted_at: null
        }

        if (id) {
            whereClause.id = {
              [Op.not]: id,
            }
        }

        return Blog.findAll({
            limit: constants.MAX_BLOGS_PER_SEARCH,
            offset: page*6 || 0,
            raw: true,
            where: whereClause,
            order: [['published_at', 'DESC']]
        })
        .then(blogs => {
            console.log('All Blogs:', blogs);
            res.json({ 'status': 200, 'blogs': blogs })
        })
        .catch(error => {
            console.error('Error fetching blogs:', error)
            res.json({ 'status': 500, 'error': error })
        })
    }
    
    if (searchTerm) {
        console.log("AAAAA!")
        console.log(searchTerm)
        findBlogs({
            title: {
                [Op.like]: `%${searchTerm}%`
            }
        })
    } else {
        findBlogs()
    } 
})

app.get('/blog/:slug', (req, res) => {
    console.log("SINGLE BLOG!!!!")
    const blogSlug = req.params.slug; // Access route parameter
    const searchTerm = req.query.search; // Access query parameter

    console.log(req.params)
    const findBlog = () => {
        return Blog.findAll({
            raw: true,
            where: {slug: blogSlug}
        })
        .then(blog => {
            console.log('Blog:', blog);
            res.json({ 'status': 200, 'blogs': blog })
        })
        .catch(error => {
            console.error('Error fetching blog:', error)
            res.json({ 'status': 500, 'error': error })
        })
    }
    findBlog()
    // Use the parameters as needed
    // res.send(`Blog Slug: ${blogSlug}, Search Term: ${searchTerm}`);
})

app.post('/create', (req, res) => {

    console.log("I'm in CREATE")
    console.log(req.body)
    const { title, content, image, slug, published_at, created_at, updated_at } = req.body
    console.log(content)
    Blog.create({
        title: title,
        content: content,
        image: image,
        slug: slug,
        published_at : published_at,
        created_at: created_at,
        updated_at: updated_at
    })
    .then(newBlog => {
        console.log('New Blog:', newBlog)
        res.json({'status': 200, 'result': 'New blog created'})
    })
    .catch(error => {
        console.error('Error creating blog:', error)
        res.json({ 'status': 500, 'error': error , 'result':'failed to create new blog'})
        
    })
})

app.patch('/delete', (req, res) => {
    console.log("DELETE!!!")
    const blogIdToDelete = req.body.id
    const blogDeletedDate = req.body.deleted_at
    const blogUpdatedDate = req.body.updated_at
    console.log(req.body)
    Blog.update({'updated_at': blogUpdatedDate,'deleted_at': blogDeletedDate}, {
        where: { id: blogIdToDelete }
    })
    console.log("DONE")
    // Blog.destroy({
    //     where: {
    //         id: blogIdToDelete
    //     }
    // })
    // .then(numDeletedRows => {
    //     if (numDeletedRows > 0) {
    //         console.log(`Successfully deleted ${numDeletedRows} blog(s) with ID ${blogIdToDelete}`)
    //     } else {
    //         console.log(`No blog found with ID ${blogIdToDelete}`)
    //     }
    // })
    // .catch(error => {
    //     console.error('Error deleting blog:', error)
    // })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
