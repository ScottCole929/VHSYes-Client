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
        <div className="bg-background-pattern bg-repeat min-h-screen w-full font-vhs text-center">
        <section className="list-header text-center inline-block bg-blue-900 py-2 px-4 mx-auto my-20 rounded-lg border-4 border-gray-500">
            <h3 className="text-6xl underline">My Profile Information</h3>
            <div className="text-4xl">
                <div className="my-6"><strong>First Name:</strong> {userProfileInfo.firstName}</div>
                <div className="my-6"><strong>Last Name:</strong> {userProfileInfo.lastName}</div>
                <div className="my-6"><strong>Email:</strong> {userProfileInfo.email}</div>
                <div className="my-6"><strong>Personal Bio:</strong> {userProfileInfo.bio}</div>
                <div className="my-6"><strong>City:</strong> {userProfileInfo.city}</div>
                <div className="my-6"><strong>State:</strong> {userProfileInfo.state}</div>
            </div>
        </section>
        </div>
    )
}