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
        <div className="font-vhs text-xl bg-background-pattern bg-repeat min-h-screen w-full text-center">
             <h2 className="text-5xl bg-blue-900 inline-block p-3 my-10 rounded-lg border-4 py-5 px-10 border-gray-500 text-center underline">Write A Review</h2>
             <div className="movie-container flex flex-col items-center font-vhs text-2xl">
            <div className="movie-card bg-blue-900 rounded-lg shadow-md px-20 py-16 my-10 mb-10 w3/4 flex flex-col items-center border-4 border-gray-500">
            <form onSubmit={submitNewReview}>
                <div className="mb-10">
                <label>
                    Review Name:
                    <input
                        type="text"
                        value={reviewName}
                        onChange={(event) => setReviewName(event.target.value)}
                        className="w-full p-1 mt-1"
                    />
                </label>
                </div>
                <div className="mb-10">
                <label>
                    Your Review:
                    <textarea
                        value={reviewBody}
                        onChange={(event) => setReviewBody(event.target.value)}
                        className="w-full h-60 p-1 mt-1"
                    />
                </label>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" >
                    Save This Review
                </button>
            </form>
            </div>
            </div>
        </div>
    )
    }