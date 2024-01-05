import { useState } from "react"
import { createReview } from "../services/reviewService"
import { useNavigate, useParams } from "react-router-dom"

export const LeaveReview = () => {
    const [reviewName, setReviewName] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const { tapeId } = useParams()

    const navigate = useNavigate()

    const submitNewReview = async (event) => {
        event.preventDefault()

        console.log("Submitting review for movie Id:", tapeId)

        const reviewContent = {
                title: reviewName,
                comment: reviewBody,
                movie: tapeId
        }

        try {
            const response = await createReview(reviewContent)
            console.log("Response from createReview:", response)
            console.log("Response status:", response.status)

                if (response.ok) {
                navigate('/myreviews')
            } else {
                console.error('Review has not been submitted')
            }
        } catch (error) {
            console.error('Error submitting this review:', error)
        } 
    }

    return (
        <div>
            <form onSubmit={submitNewReview}>
                <label>
                    Review Name:
                    <input
                        type="text"
                        value={reviewName}
                        onChange={(event) => setReviewName(event.target.value)}
                    />
                </label>
                <label>
                    Your Review:
                    <textarea
                        value={reviewBody}
                        onChange={(event) => setReviewBody(event.target.value)}
                    />
                </label>
                <button>
                    Save This Review
                </button>
            </form>
        </div>
    )
    }