"use client"
import * as React from 'react'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Alerts from './Alerts'
import { API_BASE_URL } from '@/app/utils/constants'

export default function BlogForm() {

    const apiUrl = API_BASE_URL
    const SUCCESS = 'Your blog has been posted'

    const [blogData, setBlogData] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [successCreation, setSuccessCreation] = useState(false)
   
    const submitForm = () => {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are 0-based, so add 1
        const day = String(currentDate.getDate()).padStart(2, '0')
    
        const formattedDate = `${year}-${month}-${day}`;
        const postData = {
            title: blogTitle,
            content: blogData,
            image: blogImage,
            slug: blogTitle.replace(/\s+/g, '-').toLowerCase(),
            published_at: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        }

        fetch(apiUrl + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(postData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setSuccessCreation(true)
            console.log(data)
        })
        .catch(error => {
            console.error('Fetch error:', error.message)
        })
    }

    const handleTitleChange = (event) => {
        setBlogTitle(event.target.value)
    }

    const handleImageChange = (event) => {
        setBlogImage(event.target.value)
    }

    const handleContentChange = (event) => {
        setBlogData(event.target.value)
    }

    const router = useRouter()
    const cancel = () => {
        router.push('/')
    }
    

    return (
        <form className="w-full max-w-sm mt-10 ml-10">
            {successCreation && <Alerts message={SUCCESS} type={'success'}/>}
            <div className="md:flex md:items-center mb-6 mt-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Blog Title
                </label>
                </div>
                <div className="md:w-2/3">
                <input 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text" 
                    placeholder="Cool Title"
                    onChange={handleTitleChange}
                />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                    Image URL
                </label>
                </div>
                <div className="md:w-2/3">
                <input 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text" 
                    placeholder="https://....."
                    onChange={handleImageChange}
                />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                    Blog Content
                </label>
                </div>
                <div className="md:w-2/3">
                <textarea 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text" 
                    placeholder="Your blog content here..."
                    onChange={handleContentChange}
                />
                </div>
            </div>
            
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded" type="button" onClick={submitForm}>
                        Create
                    </button>
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded" type="button" onClick={cancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}