import { useEffect, useState } from "react";
import { getUserInfo } from "../services/userService";

export const MyProfile = () => {
    const [userProfileInfo, setUserProfileInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        city: '', 
        state: '',
        bio: ''
    })

    // const unitedStates = [
    //     "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    //     "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    //     "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    //     "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    //     "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    //     "New Hampshire", "New Jersey", "New Mexico", "New York",
    //     "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    //     "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    //     "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    //     "West Virginia", "Wisconsin", "Wyoming"
    // ]


    useEffect(() => {
        getUserInfo().then(content => {

            let splitName = content.user.full_name.split(' ')
            let firstName = splitName[0] || ''
            let lastName = splitName.length > 1 ? splitName.slice(1).join('') : ''

            setUserProfileInfo({
                email: content.user.email || '',
                firstName,
                lastName,
                bio: content.bio || '',
                state: content.state || '',
                city: content.city || ''
            })
        })
        }, [])



 
    return (
        <section>
            <h3>My Profile Information</h3>
            <div>
                <div><strong>First Name:</strong> {userProfileInfo.firstName}</div>
                <div><strong>Last Name:</strong> {userProfileInfo.lastName}</div>
                <div><strong>Email:</strong> {userProfileInfo.email}</div>
                <div><strong>Personal Bio:</strong> {userProfileInfo.bio}</div>
                <div><strong>City:</strong> {userProfileInfo.city}</div>
                <div><strong>State:</strong> {userProfileInfo.state}</div>
            </div>
        </section>
    )
}


