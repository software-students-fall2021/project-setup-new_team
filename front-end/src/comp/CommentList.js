
import React from 'react';
import Stack from '@mui/material/Stack';

import CommentCard from './CommentCard';

const CommentList = ({ comment_data }) => 
{
    return (
        <Stack spacing={1}> 
            {comment_data.slice(0, 10).map((comment, key) => (
                <CommentCard key={key} username = {comment.username} 
                                       rating   = {comment.rating} 
                                       comment  = {comment.comment} />
            ))}
        </Stack>
    );
}

export default CommentList;