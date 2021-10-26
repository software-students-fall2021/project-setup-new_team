import React from 'react';

// MUI
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CommentCard = ({ username, rating, text }) => 
{
    return (
        <Card sx = {{ my: 3, minHeight: 160, justifySelf: "center", maxWidth: 400 }} className = "card">
            <CardContent>
            <Rating name="read-only" value={rating / 20} readOnly sx ={{ paddingBottom: .5}}/>
            <Typography variant="h5" color="text.secondary">
                    { username }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { text.substring(0, 150) }
                </Typography>
            </CardContent>
        </Card>
  );
}


export default CommentCard;