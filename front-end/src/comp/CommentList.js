
import React from 'react';
import Stack from '@mui/material/Stack';

import CommentCard from './CommentCard';

// taken directly from: https://javascript.info/task/shuffle
// all credits go to them for this function. I do not claim to own any of it.
// -DC @ 8:07PM October 25th, 2021

// impose a pseudo-random comment section for the time being
// until back-end is established

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

const CommentList = ({ comment_data }) => 
{
    return (
        <Stack spacing={2}> 
            {shuffle(comment_data)}
            {comment_data.slice(0, 10).map((comment, key) => (
                <CommentCard key={key} username = {comment.username} 
                                       rating = {comment.rating} 
                                       text = {comment.comment} />
            ))}
        </Stack>
    );
}

export default CommentList;