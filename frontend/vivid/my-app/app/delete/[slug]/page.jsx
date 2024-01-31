"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import useStore from '../../../app/store'
import useStoreBlogCount from '../../store/blogcount'
import Alerts from '../../components/Alerts'
import { API_BASE_URL } from '@/app/utils/constants'

export default function SingleDelete() {

    const { data } = useStore()
    const {blogCountData, setBlogCountData} = useStoreBlogCount()
    const BLOG_DELETION_CONFIRMATION = ' Are you sure you want to delete the blog? Click delete again to remove blog'
    const SUCCESS_REMOVAL_MESSAGE = ' The blog has been removed'

    const [warning, setWarning] = useState(false)
    const [info, setInfo] = useState(false)

    const deletionWarning = () => {
        setWarning(true)
    }
    
    const router = useRouter()
    const cancel = () => {
        router.push('/')
    }
    const deleteBlog = () => {
        setWarning(false)
        setInfo(true)
        setBlogCountData(true)
        const postData = {
            id: data[0].id,
            title: data[0].title,
            content: data[0].content,
            image: data[0].image,
            slug: data[0].slug.replace(/\s+/g, '-').toLowerCase(),
            //published_at: data[0].published_at,
            updated_at: new Date(),
            deleted_at: new Date()
        }

        const apiUrl = API_BASE_URL

        fetch(apiUrl + 'delete', {
            method: 'PATCH',
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
            console.log(data)
        })
        .catch(error => {
            console.error('Fetch error:', error.message)
        })
    }

    return (
        <main>    
            <div className="max-w-screen-md mx-auto">
            {
                warning && <Alerts message={BLOG_DELETION_CONFIRMATION} type={'failed'} />
            }
            {
                info && <Alerts message={SUCCESS_REMOVAL_MESSAGE} type={'success'}/>
            }
            {   
                data &&
                <div>
                    <p className="text-2xl font-bold mb-4">{data[0].title}</p>
                    <img className="w-70 mx-auto mb-4" src={data[0].image} alt={data[0].title} />
                    <p className="text-gray-700">{data[0].content}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={warning ? deleteBlog : deletionWarning}>
                        Delete Blog
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={cancel}>
                        Cancel
                    </button>
                </div>
            }
        
        </div>
        </main>
    )
}