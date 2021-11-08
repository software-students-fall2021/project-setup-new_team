import React from 'react';

// MUI
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CommentCard = ({ username, rating, comment }) => 
{
    return (
        <Card sx = {{ my: 3, minHeight: 120, justifySelf: "center", maxWidth: 400 }} className = "card">
            <CardContent>
            <Rating name="read-only" value={rating} readOnly sx ={{ paddingBottom: .5}}/>
            <Typography variant="h5" color="text.secondary">
                    { username }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { comment }
                </Typography>
            </CardContent>
        </Card>
  );
}


export default CommentCard;