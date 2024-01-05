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
        <div>
            <h2>Edit Your Review</h2>
            <form onSubmit={handleEditSubmit}>
            <label>
                Review Name:
                <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                />
            </label>
            <label>
                Your Review:
                <textarea
                    value={editComment}
                    onChange={(event) => setEditComment(event.target.value)}
                />
            </label>
            <button>
                Save Your Changes
            </button>
            </form>
    </div>
    )
}