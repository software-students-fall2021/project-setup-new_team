import React from 'react';
import Stack from '@mui/material/Stack';
import ArticleCard from '../comp/ArticleCloud'

const ArticlesList= (props) => {
    return (
        <Stack spacing={2}> 
            {props.a_data.slice(0, 10).map((article, key) => (
                <ArticleCard key={key} article_name = {article.article_name} 
                                       article_poster = {article.article_poster} 
                                       article_text = {article.article_text} />
            ))}
        </Stack>
    );
}

export default ArticlesList;