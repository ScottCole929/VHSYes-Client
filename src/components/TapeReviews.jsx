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
        <div className="font-vhs bg-background-pattern bg-repeat min-h-screen w-full text-center">
            <div className="text-5xl bg-blue-900 inline-block p-3 my-10 rounded-lg border-4 py-5 px-10 border-gray-500 text-center">
            {currentTape && <div>Reviews for {currentTape.title}</div>}
            {writtenReviews.map(content => (
                <div key={content.id} className="individual-review  bg-blue-900 rounded-lg text-4xl shadow-md px-20 py-16 my-10 mb-10 w3/4 flex flex-col items-center border-4 border-gray-500">
                    <div>{content.title}</div>
                    <div>By: {content.user_info?.user_full_name || 'Unknown User'}</div>
                    <div>{content.comment}</div>
                    <div>Review Date: {content.date_reviewed || 'Unknown Date'}</div>
                </div>
            ))}
        </div>
        </div>
    )
}