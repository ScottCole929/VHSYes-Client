import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSelectedTape, getPastRentedTapes, deleteSelectedTape } from "../services/rentalService"

export const MyRentals = () => {
    const [tapeChoice, setTapeChoice] = useState(null)
    const [pastRentalTapes, setPastRentalTapes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSelectedTape().then(selected => {
            setTapeChoice(selected)
        })

        getPastRentedTapes().then(rented => {
            setPastRentalTapes(rented)
        })
    }, [])

    const handleSelectionDelete = () => {
        deleteSelectedTape(tapeChoice.id).then(() => {
            setTapeChoice(null)
            alert("Tape has been removed from your selection.")
        })
    }

    const writeReview = (movieId) => {
        navigate(`/reviewform/${movieId}`)
    }


    const rentTape = (rentalId) => {
        const variable = JSON.parse(localStorage.getItem("rare_token"))
        const token = variable.token
        return fetch(`http://localhost:8000/rent-tape/${rentalId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        }).then((res) => {
            return res.json()
        }).then((rental) => {
            let pastTapeRentals = JSON.parse(localStorage.getItem('pastTapeRentals'))
            if (!pastTapeRentals) {
                pastTapeRentals = [];
            }
            pastTapeRentals.push(rental)
            localStorage.setItem('pastTapeRentals', JSON.stringify(pastTapeRentals))
    
            setPastRentalTapes(pastTapeRentals)
        })
    }

return (
    <div className="font-vhs text-xl bg-background-pattern bg-repeat min-h-screen w-full text-center">
        <h3 className="text-5xl bg-blue-900 inline-block p-3 my-10 rounded-lg border-4 py-5 px-10 border-gray-500 text-center underline">VHS Currently Selected</h3>
        <div className="movie-container flex flex-col items-center font-vhs text-2xl">
        {tapeChoice ? (
            <div className="movie-card bg-blue-900 rounded-lg shadow-md px-20 py-16 my-10 mb-10 w3/4 flex flex-col items-center border-4 border-gray-500">
                <h2>{tapeChoice.movie?.title}</h2>
                <img
                src={tapeChoice.movie?.cover_img_url}
                className="w-112 h-96 object-cover rounded-md my-6"
                ></img>
                {tapeChoice.is_active ? (
                    <div>You currently have a VHS rented</div>
                ) : (
                <>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded transition duration-300 ease-in-out" onClick={() => {rentTape(tapeChoice.id).then(() => {
                    navigate('/confirmation')
                })
                }}>
                    Rent This Movie
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={handleSelectionDelete}>
                    Remove Tape from Selection
                </button>
                </>
                )}
            </div>
        ) : (
            <div className="bg-blue-900 p-2 my-2 rounded shadow-lg">
            <div>No VHS selected yet</div>
            </div>
        )}
        <h3 className="text-5xl bg-blue-900 inline-block p-3 rounded-lg border-4 py-5 px-10 my-10 border-gray-500 text-center underline">Your Past VHS Rentals</h3>
        <div className="movie-container flex flex-col items-center font-vhs text-2xl">
        {pastRentalTapes.length > 0 ? (
            pastRentalTapes.map(rental => (
                <div key={rental.id} className="movie-card bg-blue-900 rounded-lg shadow-md px-20 py-16 my-10 mx-10 w3/4 flex flex-col items-center border-4 border-gray-500">
                    <img 
                        src={rental.movie?.cover_img_url}
                        className="w-112 h-96 object-cover rounded-md my-6"
                    />
                    <div>
                        <h2>{rental.movie?.title}</h2>
                        <p>Date Rented: {rental.date_rented}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-5 py-2 px-4 rounded transition duration-300 ease-in-out" onClick={() => writeReview(rental.movie?.id)}>
                            Write a Review!
                        </button>
                        </div>
                </div>
            ))
        ) : (
            <div className="bg-blue-900 rounded p-2 my-2 rounded shadow-lg">
            <p>You have no previously rented tapes</p>
            </div>
        )}
    </div>
    </div>
    </div>
    )
}
