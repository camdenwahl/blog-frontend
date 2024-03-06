import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [articleList, setArticleList] = useState([
      ])
    const [articleData, setArticleData] = useState("");
    
    
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

      function extractFirstParagraphSimple(htmlContent) {
        const endIndex = htmlContent.indexOf("</p>");
        if (endIndex !== -1) {
          // Add 4 to include the length of "</p>" itself
          return htmlContent.substring(0, endIndex + 4);
        }
        return htmlContent; // Return the full content if no paragraph tag is found
      }

      function handleSingleArticle(event){
        try {
            fetch("http://localhost:3000/blogs", {
                method: "GET",
                mode: "cors"
            })
            .then(response => response.json())
            .then(data => {
              const article = data.find(dataP => dataP.title === event.target.name);
              setArticleData(article); 
            })

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
        {articleList.map((article) => {
          const date = new Date(article.date);
          const newDate = date.toDateString();
          const previewContent = extractFirstParagraphSimple(article.content); // Extract content up to the first </p>
          if (article.status === "visible"){
            const link = `/blogs/${article.title}`
          return (
            <div key = {article._id} className = "blog-blurb">
                <Link to={{pathname: `${link}`}} state = {{articleData: article}} onClick ={handleSingleArticle} id = "article-title" name = {article.title}>{article.title}</Link>
                <div id = "preview-content" dangerouslySetInnerHTML={{ __html: previewContent }}></div>
                <h4>{newDate}</h4>
            </div>
          )
          }
        
        }
        )}
        </section>
        </>
    )
}


export default Home;