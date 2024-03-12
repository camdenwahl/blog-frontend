import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import hljs from 'highlight.js';
import Quill from "quill";
import 'highlight.js/styles/night-owl.css';


function Blog() {
    const {state} = useLocation();
    const articleData = state.articleData;
    const date = new Date(articleData.date);
    const formattedDate = date.toDateString();
    const [commentArray, setCommentArray] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState("");


    
    
    function sendData(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formDataJson = Object.fromEntries(form.entries());
    formDataJson.blogId = articleData._id;
    const jsonData = JSON.stringify(formDataJson);


    try {
        fetch("https://express-rest.fly.dev/blogs/comment", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
        })
    
        .then(response => response.text())
        .then(data => {
            setSubmissionStatus("Comment has been sent for review. Thank you for your feedback!")
        })
        .catch(error => {
            setSubmissionStatus("Comment is too short or an error has occurred.")
        });
        
    }
    catch (error) {
        setSubmissionStatus("Comment is too short or an error has occurred.")
    }
    }
    function fetchComments(){
        try{
          fetch("https://express-rest.fly.dev/blogs/comment", {
            method: "GET",
            mode: "cors"
          })
          .then(response => response.json())
          .then(data => {
            data.forEach(comment => {
                const linkedPost = comment.linkedPost
                if (linkedPost === articleData._id) {
                    setCommentArray(currentComments => [...currentComments, comment]);
                }
            })
          })
          .catch(error => alert(error))
        } catch (error) {
          alert(error);
        }
      }

      useEffect(() => {
        fetchComments();
        const articlesContent = document.getElementById('blog-content');
        if (articlesContent) {
            const preTags = articlesContent.querySelectorAll('pre');
            preTags.forEach(pre => {
                if (!pre.querySelector('code')) {
                    const innerContent = pre.innerHTML;
                    const codeElement = document.createElement('code');
                    codeElement.innerHTML = innerContent;
                    pre.innerHTML = '';
                    pre.appendChild(codeElement);
                    hljs.highlightElement(codeElement);
                }
            });
        }
    }, [articleData.content]); 
    
    
    return(
        <div id = "container-flex">
            <h2 id = "blog-title">{articleData.title}</h2>
            <h3 id = "blog-date">Date Posted: {formattedDate}</h3>
            <div id = "blog-content" dangerouslySetInnerHTML={{ __html: articleData.content }}></div>
            <div id = "comment-div">
            <form action="/blogs/comment" onSubmit={sendData}>
            <p>{submissionStatus}</p>   
                            <label htmlFor="">Name:</label>
                            <input type="text" name = "author"/>
                            <label htmlFor="">Comment:</label>
                            <textarea id = "comment-box" name="content" cols="30" rows="10" ></textarea>
                            <button type = "submit">Submit</button>
                        </form>
                        <div id = "comment-list">
                            <h2>Comments:</h2>                
                            {commentArray.map(comment => {
                                console.log(comment.linkedPost);
                                if (comment.linkedPost === articleData._id && comment.status === "visible") {
                                    return (
                                        <>
                                        <div id = "comment-content">
                                        <h3>{comment.author}</h3>
                                            {comment.content}
                                        </div>
                                        </>
                                    )
                                }
                            })}
                 </div>
            </div>
        </div>
    )
}


export default Blog;