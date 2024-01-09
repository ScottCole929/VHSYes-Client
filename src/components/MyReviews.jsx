import { useState } from "react"
import { useEffect } from "react"
import { deleteUserReview, getUserReviews } from "../services/reviewService"
import { useNavigate } from "react-router-dom"

export const MyReviews = () => {
    const [userWrittenReviews, setUserWrittenReviews] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getUserReviews().then(data => {
            setUserWrittenReviews(data)
        })
    }, [])

    const handleReviewEdit = (reviewId) => {
        navigate(`/edit-review/${reviewId}`)
    }

    const handleReviewDelete = async (reviewId) => {
        try {
            const response = await deleteUserReview(reviewId)
            if (response.ok) {
            const reviewRefresh = userWrittenReviews.filter(review => review.id !== reviewId)
            setUserWrittenReviews(reviewRefresh)
            } else {
                console.error('Error: Review could not be deleted')
            }
        } catch (error) {
            console.error('Could not delete this review:', error)
        }
    }

return (
    <div className="font-vhs bg-background-pattern bg-repeat min-h-screen w-full text-center">
        <h2 className="text-5xl bg-blue-900 inline-block p-3 my-10 rounded-lg border-4 py-5 px-10 border-gray-500 text-center underline">My Reviews</h2>
        <div className="movie-container flex flex-col items-center font-vhs text-2xl">
            {userWrittenReviews.length > 0 ? (
                userWrittenReviews.map(content => (
                    <div key={content.id} className="movie-card bg-blue-900 rounded-lg shadow-md px-20 py-16 my-10 mb-10 w3/4 flex flex-col items-center border-4 border-gray-500">
                        <img
                            src={content.movie.cover_img_url}
                            alt={content.movie.title}
                            className="w-112 h-96 object-cover rounded-md my-6"
                        />
                        <div>
                            <h3>Review Name: {content.title}</h3>
                            <p> {content.comment} </p>
                        </div>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded transition duration-300 ease-in-out mr-8" onClick={() => handleReviewEdit(content.id)}>Edit Your Review</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded transition duration-300 ease-in-out" onClick={() => handleReviewDelete(content.id)}>Delete Your Review</button>
                        </div>
                    </div>
                ))
                ) : (
                    <div className="bg-blue-900 rounded p-2 my-2 rounded shadow-lg">
                    <p>There are no reviews to show currently</p>
                    </div>
                )}
        </div>
    </div>
    )
}
