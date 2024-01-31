"use client"
import * as React from 'react'
import { useState, useEffect } from 'react'
import useStoreBlogCount from '@/app/store/blogcount'
import useStoreRandomBlogs from '@/app/store/randomBlogs'
// import updatedStore from '../store'
function Blogs({onBlogClick}) {
    const apiUrl = 'http://localhost:3000/'

    const { blogCountData } = useStoreBlogCount()
    const { randomBlogs, setRandomBlogs } = useStoreRandomBlogs()
    const [blogs, setBlogs] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
        setPageCount(0)
    }


    // setRandomBlogs("ABC")

    useEffect(() => {
        const apiUrlWithParam = `${apiUrl}?page=` + `${pageCount}&searchTerm=` + `${searchTerm}`
        console.log(apiUrlWithParam)

        fetch(apiUrlWithParam, { cache: 'force-cache', method: 'GET', mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            setBlogs(data.blogs)
            // setRandomBlogs(data.blogs)
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        })

        
    }, [pageCount, searchTerm, blogCountData]) 
    
    const paginateClicked = () => {
        setPageCount(pageCount + 1)
    }
    
    return (

        <div className="flex flex-wrap mx-20 mt-10">
            <input
                className="rounded w-full text-gray-700 mr-3 py-1 px-2 mb-5 border border-gray-300"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
            />
        {
            blogs && blogs.map(blog => 
                <div 
                    key={blog.id} 
                    className="max-w-sm rounded overflow-hidden shadow-lg px-2 mt-2"
                    onClick={() => onBlogClick(blog)}
                >
                <img className="w-full" src={blog.image} alt="Sunset in the mountains"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{blog.title}</div>
                  <p className="text-gray-700 text-base">
                    {blog.content}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Published on: {blog.published_at}</span>
                </div>
              </div>
            ) 
        }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={paginateClicked}>
                Next
            </button>
        </div>
        
    )
  }
  
  export default Blogs