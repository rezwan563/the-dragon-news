// import React from 'react';

import { useLoaderData,  } from "react-router-dom";
import NewsCard from "../NewsCard/NewsCard";

const Category = () => {
    // const {id} = useParams();
    const categoryNews = useLoaderData();
    return (
        <div>
            <h3>Category is here: {categoryNews.length}</h3>
            {
                categoryNews.map(news => <NewsCard
                key={news._id}
                news={news}
                ></NewsCard>)
            }
        </div>
    );
};

export default Category;