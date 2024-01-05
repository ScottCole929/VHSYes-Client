import { useState, useEffect } from "react"
import { getMovies } from "../services/tapeService"
import { selectTape } from "../services/rentalService"
import { useNavigate } from "react-router-dom"

export const AllTapes = () => {
    const [allTapes, setAllTapes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMovies().then((tapesArray) => {
            setAllTapes(tapesArray)
        })
    }, [])

    const handleTapeSelection = (filmId) => {

        selectTape(filmId).then(() => {
            navigate(`/myrentals`)
        }).catch(error => {
            console.error("Error selecting tape:", error)
        })
    }


    const seeAllReviews = (filmId) => {
        navigate(`/review/${filmId}`)
    }

    return (
        <div>
            <div className="list-header">
        <h1 className="font-vhs">V-H-YES!</h1>
        <h4>Select your physical media artifact below!</h4>
        </div>
        <div className="movie-container">
        {allTapes.map((film) => {
            return (
                <div key={film.id} className="movie-card">
                <img
                src={film.cover_img_url}
                alt={film.title}
                className="movie-img w-10 h-10 object-cover"
                onClick={() => {
                    navigate(`/movie/${film.id}`)
                }}
                ></img>
            <div className="tape-name">{film.title}</div>
            <div className="tape-name">{film.release_year}</div>
            <div className="tape-name">Starring: {film.starring}</div>
            <div className="tape-name">Director: {film.director}</div>
            <div className="tape-name">Genre: {film.genre_data.map(genre => genre.label).join(', ')}</div>
            <div className="tape-name">A {film.production_studio} Film</div>
                <div>
                    <button onClick={() => handleTapeSelection(film.id)} className="select-btn">
                        Select This Tape
                    </button>
                    <button onClick={() => seeAllReviews(film.id)} className="all-reviews-btn">
                        See Reviews For This Film
                    </button>
                    </div>
        </div>
        )
    })}       
        </div>
    </div>
    )
}