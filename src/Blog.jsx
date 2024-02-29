import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function Blog() {
    const {state} = useLocation();
    const articleData = state.articleData;
    const [commentArray, setCommentArray] = useState([]);
    
    function sendData(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formDataJson = Object.fromEntries(form.entries());
    formDataJson.blogId = articleData._id;
    const jsonData = JSON.stringify(formDataJson);
    try {
        fetch("http://localhost:3000/blogs/comment", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
        })
    
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => alert(error));
        
    }
    catch (error) {
        alert(error);
    }
    }
    function fetchComments(){
        try{
          fetch("http://localhost:3000/blogs/comment", {
            method: "GET",
            mode: "cors"
          })
          .then(response => response.json())
          .then(data => {
            setCommentArray(currentComments => [...currentComments, ...data]);
          })
          .catch(error => alert(error))
        } catch (error) {
          alert(error);
        }
      }

    useEffect(() => {
        fetchComments();
    }, [])

    return(
        <div>
            <h2 id = "blog-title">{articleData.title}</h2>
            <h3 id = "blog-date">Date Posted: {articleData.date}</h3>
            <div id = "blog-content" dangerouslySetInnerHTML={{ __html: articleData.content }}></div>
            <form action="/blogs/comment" onSubmit={sendData}>
                <label htmlFor="">Name:</label>
                <input type="text" name = "author"/>
                <label htmlFor="">Comment:</label>
                <input type="textarea" name = "content"/>
                <button type = "submit">Submit</button>
            </form>
            <div>
                <h2>Comments:</h2>                
                {commentArray.map(comment => {
                    if (comment.linkedPost === articleData._id && comment.status === "visible") {
                        return (
                            <>
                            <h3>{comment.author}</h3>
                            <div id = "comment-content">{comment.content}</div>
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )
}


export default Blog;