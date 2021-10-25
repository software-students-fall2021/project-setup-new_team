import React from 'react';
import ArticleCard from '../comp/ArticleCloud'
import Stack from '@mui/material/Stack';

const ArticlesList= (props) => {
    return (
        <Stack spacing={2}> 
            {props.a_data.slice(0, 10).map((article, key) => (
                    <ArticleCard key={key} a_title = {article.title} 
                        a_tags = {article.username} 
                        a_desc = {article.lorem} />
            ))}
        </Stack>
    );
}

export default ArticlesList;