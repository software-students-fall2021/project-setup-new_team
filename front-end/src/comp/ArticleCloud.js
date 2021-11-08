import React from 'react';

// MUI
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './ArticleCloud.css';

const ArticleCard = ({ article_name, article_poster, article_text }) => 
{
    return (
        <Link to={`./articles/${article_name}`} className = "link">
            <Card sx = {{ my: 3, minHeight: 200, justifySelf: "center", maxWidth: 400 }} className = "card">
                <CardContent>
                <Typography variant="h5" color="text.secondary">
                        {article_name}
                    </Typography>
                <Typography variant="body1" color="text.secondary">
                        {article_poster}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {article_text}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
  );
}

//     {/*Tags: {a_tags.map(tag => { return (tag !== "\0") ? tag + ", " : tag})}*/

export default ArticleCard;