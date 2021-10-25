import React from 'react';

// MUI
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './ArticleCloud.css';

const ArticleCard = ({ a_title, a_tags, a_desc }) => 
{
    return (
        <Link to="#" className = "link">
            <Card sx = {{ my: 3, minHeight: 200, justifySelf: "center", maxWidth: 400 }} className = "card">
                <CardContent>
                <Typography variant="h5" color="text.secondary">
                        {a_title}
                    </Typography>
                <Typography variant="body1" color="text.secondary">
                        {a_tags}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {a_desc.substring(0, 150)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
  );
}

//     {/*Tags: {a_tags.map(tag => { return (tag !== "\0") ? tag + ", " : tag})}*/

export default ArticleCard;