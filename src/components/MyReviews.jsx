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
    <div>
        <h2>My Reviews</h2>
        <div>
            {userWrittenReviews.length > 0 ? (
                userWrittenReviews.map(content => (
                    <div key={content.id} className="past-review-block">
                        <img
                            src={content.movie.cover_img_url}
                            alt={content.movie.title}
                            className="movie-img"
                        />
                        <div>
                            <h3>{content.title}</h3>
                            <p>{content.comment}</p>
                        </div>
                        <div>
                            <button onClick={() => handleReviewEdit(content.id)}>Edit Your Review</button>
                            <button onClick={() => handleReviewDelete(content.id)}>Delete Your Review</button>
                        </div>
                    </div>
                ))
                ) : (
                    <p>There are no reviews to show currently.</p>
                )}
        </div>
    </div>
    )
}
