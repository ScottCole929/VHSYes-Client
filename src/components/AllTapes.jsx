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
        <div className="bg-background-pattern bg-repeat min-h-screen w-full">
        <div className="text-center">
            <div className="list-header text-center inline-block bg-blue-900 py-2 px-4 mx-auto my-10 rounded-lg border-4 border-gray-500">
        <h1 className="font-vhs font-semibold text-9xl text-center mb-9 shadow-lg">V-H-YES!</h1>
        <h4 className="font-vhs text-4xl text-center">Select your physical media artifact below!</h4>
        </div>
        <div className="movie-container flex flex-col items-center font-vhs text-2xl">
        {allTapes.map((film) => {
            return (
                <div key={film.id} className="movie-card bg-blue-900 rounded-lg shadow-md p-4 my-20 w3/4 flex flex-col items-center border-4 border-gray-500">
                <img
                src={film.cover_img_url}
                alt={film.title}
                className="w-112 h-96 object-cover rounded-md my-6"
                onClick={() => {
                    navigate(`/movie/${film.id}`)
                }}
                ></img>
            <div className="tape-name text-center">{film.title}</div>
            <div className="tape-name text-center">{film.release_year}</div>
            <div className="tape-name text-center">Starring: {film.starring}</div>
            <div className="tape-name text-center">Director: {film.director}</div>
            <div className="tape-name text-center">Genre: {film.genre_data.map(genre => genre.label).join(', ')}</div>
            <div className="tape-name text-center">A {film.production_studio} Film</div>
                <div className="flex justify-around mt-8">
                    <button onClick={() => handleTapeSelection(film.id)} className="select-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-8">
                        Select This Tape
                    </button>
                    <button onClick={() => seeAllReviews(film.id)} className="all-reviews-btn  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                        See Reviews For This Film
                    </button>
                    </div>
        </div>
        )
    })}       
        </div>
    </div>
    </div>
    )
}