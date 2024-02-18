import { useState, useEffect } from "react";

function Home() {
    const [articleList, setArticleList] = useState([
      ])
    
    
      function handleArticleDisplay(){
        try{
          fetch("http://localhost:3000/blogs", {
            method: "GET",
            mode: "cors"
          })
          .then(response => response.json())
          .then(data => {
            setArticleList(currentArticles => [...currentArticles, ...data]);
          })
          .catch(error => alert(error))
        } catch (error) {
          alert(error);
        }
      }
    
      useEffect(() => {
        handleArticleDisplay();
      }, [])

    return(
        <>
        <section id = "content-bar">
        {articleList.map((article) => (
            <div key = {article._id} className = "blog-blurb">
                <h3>{article.title}</h3>
                <h4>{article.date}</h4>
                <a href={article.title}>Read this blog.</a>
            </div>
        ))}
        </section>
        </>
    )
}


export default Home;