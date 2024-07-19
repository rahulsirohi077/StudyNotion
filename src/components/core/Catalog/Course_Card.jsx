import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course,Height}) => {
    console.log("instructor",course?.instructor);
    const [avgReviewCount, setAvgReviewCount] = useState();

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>

        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img 
                        src={course?.thumbnail} 
                        alt='course ka thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-x-3'>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span>{course?.ratingAndReview?.length} Ratings</span>
                    </div>
                    <p>{course?.price}</p>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default Course_Card