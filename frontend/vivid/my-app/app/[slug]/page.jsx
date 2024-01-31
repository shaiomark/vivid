"use client"
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import useStore from '../../app/store'
import { API_BASE_URL } from '@/app/utils/constants'

// import useStoreRandomBlogs from '../store/randomBlogs'

export default function SingleBlog({ params }) {

    const apiUrl = API_BASE_URL + 'blog/'

    const {data, setData} = useStore()
    // const { randomBlogs } = useStoreRandomBlogs()

    const [blog, setBlog] = useState(null)
    const [randomBlogs, setRandomBlogs] = useState(null)

    useEffect(() => {
        fetch(`${apiUrl}${params.slug}`, { cache: 'force-cache', method: 'GET', mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            setBlog(data.blogs)

            const apiUrlWithParam = `${API_BASE_URL}?id=${data.blogs[0].id}` 
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
                setRandomBlogs(data.blogs)
            })
            .catch(error => {
                console.error('Fetch error:', error.message);
            })
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        })

    }, []) 

    const router = useRouter()
    const edit = () => {
        setData(blog)
        console.log(data)
        router.push(`/delete/${params.slug}`)
    }

    return (
        <div className="max-w-screen-md mx-auto">
            {   
                blog &&
                <div>
                    <p className="text-2xl font-bold mb-4">{blog[0].title}</p>
                    <img className="w-70 mx-auto mb-4" src={blog[0].image} alt={blog[0].title} />
                    <p className="text-gray-700">{blog[0].content}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={edit}>
                        Edit
                    </button>
                </div>
            }

            {randomBlogs && randomBlogs.slice(0, 4).map(blog => 
                <div 
                    key={blog.id} 
                    className="max-w-sm rounded overflow-hidden shadow-lg px-2 mt-2"
                    // onClick={() => onBlogClick(blog)}
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
            )} 
        
        </div>
    )
}