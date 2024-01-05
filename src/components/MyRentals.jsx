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
    <div>
        <div>VHS Currently Selected</div>
        {tapeChoice ? (
            <div>
                <h2>{tapeChoice.movie?.title}</h2>
                <img
                src={tapeChoice.movie?.cover_img_url}
                className="movie-img w-10 h-10 object-cover"
                ></img>
                {tapeChoice.is_active ? (
                    <div>You currently have a VHS rented</div>
                ) : (
                <>
                <button onClick={() => {rentTape(tapeChoice.id).then(() => {
                    navigate('/confirmation')
                })
                }}>
                    Rent This Movie
                </button>
                <button onClick={handleSelectionDelete}>
                    Remove Tape from Selection
                </button>
                </>
                )}
            </div>
        ) : (
            <div>No VHS selected yet</div>
        )}
        <div>Your Past VHS Rentals</div>
        {pastRentalTapes.length > 0 ? (
            pastRentalTapes.map(rental => (
                <div key={rental.id}>
                    <img 
                        src={rental.movie?.cover_img_url}
                        className="movie-img h-15 w-15 object-cover"
                    />
                    <div>
                        <h2>{rental.movie?.title}</h2>
                        <p>Date Rented: {rental.date_rented}</p>
                        <button onClick={() => writeReview(rental.movie?.id)}>
                            Write a Review!
                        </button>
                        </div>
                </div>
            ))
        ) : (
            <p>You have no previously rented tapes</p>
        )}
    </div>
    )
}
