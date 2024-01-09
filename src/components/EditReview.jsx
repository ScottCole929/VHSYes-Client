import { useEffect, useState } from "react"
import { getMovieReviewsById, editUserReview } from "../services/reviewService"
import { useNavigate, useParams } from "react-router-dom"

export const EditUserReview = () => {
    const [editTitle, setEditTitle] = useState('')
    const [editComment, setEditComment] = useState('')
    const { reviewId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getMovieReviewsById(reviewId).then(reviewInfo => {
            setEditTitle(reviewInfo.title)
            setEditComment(reviewInfo.comment)
        })
    }, [reviewId])


    const handleEditSubmit = async (event) => {
        event.preventDefault()
        const changedReview = {
            title: editTitle,
            comment: editComment
        }
        await editUserReview(reviewId, changedReview)
        navigate('/myreviews')
    }


    return (
        <div className="font-vhs text-xl bg-background-pattern bg-repeat min-h-screen w-full text-center">
            <h2 className="text-5xl bg-blue-900 inline-block p-3 my-10 rounded-lg border-4 py-5 px-10 border-gray-500 text-center underline">Edit Your Review</h2>
            <div className="movie-container flex flex-col items-center font-vhs text-2xl">
                <div className="movie-card bg-blue-900 rounded-lg shadow-md px-20 py-16 my-10 mb-10 w3/4 flex flex-col items-center border-4 border-gray-500">
            <form onSubmit={handleEditSubmit}>
            <div className="mb-10">
            <label>
                Review Name:
                <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    className="w-full p-1 mt-1"
                />
            </label>
            </div>
            <div className="mb-10">
            <label>
                Your Review:
                <textarea
                    value={editComment}
                    onChange={(event) => setEditComment(event.target.value)}
                    className="w-full h-60 p-1 mt-1"
                />
            </label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Save Your Changes
            </button>
            </form>
    </div>
    </div>
    </div>
    )
}