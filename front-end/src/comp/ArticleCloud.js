import React from 'react';

// MUI
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './ArticleCloud.css';

const ArticleCard = ({ a_user, a_name, a_tags }) => 
{
    return (
        <Link to="#" className = "link">
            <Card sx = {{ justifySelf: "center", maxWidth: 400 }} className = "card">
                <CardContent>
                    <Typography variant="h5" component="div" color="text.secondary">{a_name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                    Tags: {a_tags.map(tag => { return (tag !== "\0") ? tag + ", " : tag})}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
  );
}

export default ArticleCard;