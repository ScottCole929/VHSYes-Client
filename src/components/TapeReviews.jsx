import { useEffect, useState } from "react";
import { getMovieReviewsById } from "../services/reviewService";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/tapeService";

export const TapeReviews = () => {
    const [currentTape, setCurrentTape] = useState(null)
    const [writtenReviews, setWrittenReviews] = useState([])
    const { tapeId } = useParams()

    useEffect(() => {
        getMovieReviewsById(tapeId)
            .then(reviewInfo => {setWrittenReviews([reviewInfo])
            })
            
        getMovieById(tapeId)
            .then(movieInfo => setCurrentTape(movieInfo))
            
        }, [tapeId])



    return (
        <div>
            {currentTape && <div>Reviews for {currentTape.title}</div>}
            {writtenReviews.map(content => (
                <div key={content.id} className="individual-review">
                    <div>{content.title}</div>
                    <div>By: {content.user_info?.user_full_name || 'Unknown User'}</div>
                    <div>{content.comment}</div>
                    <div>Review Date: {content.date_reviewed || 'Unknown Date'}</div>
                </div>
            ))}
        </div>
    )
}