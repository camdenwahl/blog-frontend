import { useLocation } from "react-router-dom";


function Blog() {
    const {state} = useLocation();
    const articleData = state.articleData;
    function handleSingleArticle(){
        console.log(state.articleData);
    }

    return(
        <div>
            <h2>{articleData.title}</h2>
            <h3>Date Posted: {articleData.date}</h3>
            <p>{articleData.content}</p>
        </div>
    )
}


export default Blog;