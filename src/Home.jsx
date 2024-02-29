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

      function handleSingleArticle(event){
        try {
            fetch("http://localhost:3000/blogs", {
                method: "GET",
                mode: "cors"
            })
            .then(response => response.json())
            .then(data => {
              const article = data.find(dataP => dataP.title === event.target.name);
              setArticleData(article); // Assuming you want to store the whole article object
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
          if (article.status === "visible"){
            const link = `/blogs/${article.title}`
          return (
            <div key = {article._id} className = "blog-blurb">
                <h3>{article.title}</h3>
                <h4>{article.date}</h4>
                <Link to={{pathname: `${link}`}} state = {{articleData: article}} onClick ={handleSingleArticle} name = {article.title}>Read this blog.</Link>
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