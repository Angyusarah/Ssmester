import useFetch from "../customHook/useFetch"
import Loader from "./Loader"
import { Link } from "react-router-dom"
import "./Home.css"
import picture from "../assets/picture.jpeg"

function Home(){
    const {error, repo, isLoading, currentPage, setCurrentPage} = useFetch("https://api.github.com/users/Angyusarah/repos")
    console.log(repo) 

    const totalPosts = repo.length

    const pageSize = 5
    const pages = Math.floor(totalPosts / pageSize)

    const goToPrev = () => {
        const prevPage = Math.max(currentPage - 1, 1)
        setCurrentPage(prevPage)
    }

    const goToNext = () => {
        const nextPage = Math.min(currentPage + 1, pages)
        setCurrentPage(nextPage)
    }

    const start = pageSize * (currentPage - 1)
    const end = pageSize * currentPage
    const postsPerPage = repo.slice(start, end)

    const canGoPrev = currentPage > 1
    const canGoNext = currentPage < pages

    return(
        <div className="main">
            <div className="head">
                <img src={picture} className="image" alt="" />
                <h1>Angyu Sarah</h1>
            </div>

            <h2>List of Repositories</h2>

            {isLoading && <Loader/> } 
            {error && <p>{error}</p>}

            {repo && postsPerPage.map((data) => (
                <div className="dtw" key={data.id}>
                    <Link to={`code/repos/${data.name}`} >
                    <h3 className="titleHead">{data.name}</h3>
                    {/* <p>{data.description}</p>
                    <p>{data.stargazers_count}</p>
                    <p>{data.forks_count}</p>
                    <p>{data.watchers_count}</p> */}
                    <p>{data.visibility}</p>
                    {/* <p>{data.url}</p> */}
                    </Link>
                </div>
            ))}

<div>
                <button disabled={!canGoPrev} onClick={goToPrev}>
                    prev
                </button>
                <p>
                    {currentPage} of {pages}
                </p>
                <button disabled={!canGoNext} onClick={goToNext}>
                    next
                </button>
            </div>
        </div>
    )
}

export default Home;