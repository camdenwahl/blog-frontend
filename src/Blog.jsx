import { useParams } from "react-router-dom";



function Blog() {
    const {name} = useParams();

    function handleSingleArticle(){
        try {
            fetch("http://localhost:3000/blogs", {
                method: "GET",
                mode: "cors"
            })
            .then(response => response.json())
            .then(data => {
                data.filter(dataP => {
                    console.log(dataP.title);
                })
            })

        } catch (error) {
            alert(error);
        }
    }

    return(
        <div>
            <h1 onClick={handleSingleArticle}>Sup brah</h1>
            {name === "yeah"}
        </div>
    )
}


export default Blog;