import React,{ useState, useEffect } from 'react';
import { styled }    from '@mui/system';
import { useParams } from "react-router-dom";
import Rating        from '@mui/material/Rating';
import Button        from '@mui/material/Button';
import TextField     from '@mui/material/TextField';
import axios from 'axios'

import SendIcon from '@mui/icons-material/Send';
import GamePreview from './GamePreview';

import Typography from '@mui/material/Typography';

import './Article.css'

const SearchButton = styled(Button)(({ theme }) => ({
    backgroundColor: "darkred",
    '&:hover': {
      backgroundColor: "darkred",
    },
}));

const GamesList = (props) => {
    const [sData, setSearchData] = useState("")
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
                title: 'Counter Strike: Global Offensive',
                description:
                'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
            },
            {
                id: 2,
                title: 'Chess but Blue',
                description:
                'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
            },
            ]

            setData(backupData)
        })
    }, [])
    

    return (    
        <div className = "column">
            <div className = "text-box">
            <TextField 
                    onChange = {(event) => { setSearchData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="Search"
                    Enter a
                    rows={4}
                    defaultValue=""
                />
            </div>
            <div className = "search">
                <SearchButton variant="contained" 
                    /* onClick = {sendCommentData(...)} TODO during back-end */
                    startIcon={<SendIcon />} 
                    sx={{ backgroundColor:"darkred", maxWidth:96}}>
                    Search
                </SearchButton>
                {}
            </div>
            <div className = "game-header">
                <h1>Games</h1>
                <section className = "game-body"> 
                    {data.map((item) => (
                    <GamePreview key={item.title} details={item} />
                    ))}
                </section>
                </div>
        </div>
    )
}  

export default GamesList;