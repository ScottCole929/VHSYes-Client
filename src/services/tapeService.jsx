export const getMovies = () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token
    return fetch('http://localhost:8000/movie', {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then((res) => {
        return res.json()
    })
}

export const getMovieById = (id) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token
    return fetch(`http://localhost:8000/movie/${id}`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then((res) => res.json())
    }
