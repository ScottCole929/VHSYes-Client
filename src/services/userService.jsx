export const getUserId = () => {
    const userData = localStorage.getItem('userData')

    if (userData) {
        const user = JSON.parse(userData)
        return user.id
    }
}

export const getUserInfo = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/user/profile`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(response => response.json())
}

export const updateProfileData = async (userId, userContent) => {
    const variable = JSON.parse(localStorage.getItem("rare_token"))
    const token = variable.token;
    return fetch(`http://localhost:8000/user/profile/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userContent)
    })
}