export const selectTape = (tapeId) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    return fetch(`http://localhost:8000/rental`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        body: JSON.stringify({
            movie: tapeId,
            is_selected: true,
            is_active: false
        })
    }).then((res) => res.json());
};

export const getSelectedTape = () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token

    return fetch('http://localhost:8000/rental/tape-selection', {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then((res) => {
        return res.json()
    })
}

export const getPastRentedTapes = () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token
    return fetch('http://localhost:8000/rental/past-tape-rentals', {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then((res) => {
        return res.json()
    })
}

export const deleteSelectedTape = (rentalId) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token
    return fetch(`http://localhost:8000/rental/${rentalId}/remove-selected-tape`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        return res.json()
    })
}