"use client"
import * as React from 'react'
import { useState, useEffect } from 'react'

export default function SingleBlog({ blog }) {

    return (
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