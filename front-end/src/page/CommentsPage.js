import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography';

import './Article.css'
import CommentPreview from './CommentPreview';

const CommentsPage = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios('https://my.api.mockaroo.com/animals.json?num=10&key=d9ddfc40')
        .then((response) => {
            // extract the data from the server response
            setData(response.data)
        })
        .catch((err) => {
            console.log(`Sorry, buster.  No more requests allowed today!`)
            console.error(err)
            const backupData = [
            {
                id: 1,
                title: 'User1',
                description:
                'This game sucks',
            },
            {
                id: 2,
                title: 'User2',
                description:
                'This game is amazing',
            },
            ]
    
            setData(backupData)
        })
    }, [])
    
    return (
        <section className="comment-header">
                <h2>Comments:</h2>
                <div className="comment-body">
                    {data.map((item) => (
                    <CommentPreview key={item.id} details={item} />
                    ))}
                </div>
            </section>
    )
}


export default CommentsPage;