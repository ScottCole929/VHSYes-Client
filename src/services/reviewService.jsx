export const getMovieReviewsById = async (id) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;
    return fetch(`http://localhost:8000/review/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        }).then((res) => res.json());
      };


  export const createReview = async (reviewBody) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(reviewBody),
    })
  }

  export const getUserReviews = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/review/my-reviews`, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    }).then(res => res.json())
  }

  export const editUserReview = async (reviewId, reviewBody) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/review/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(reviewBody)
    })
  }

  export const deleteUserReview = async (reviewId) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  }