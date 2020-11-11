import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from 'axios';
import SessionContext from '../contexts/SessionContext'

export default () => {
    const { isLoggedIn } = useContext(SessionContext)
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [profileImg, setProfileImg] = useState(null)
    // new code below
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [old_password, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    // to get user's profile image
    useEffect(() => {
        axios.get("https://homefoods1.herokuapp.com/api/v1/users/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response)
                setUser({
                    ...response.data,
                    profileImage: response.data.image_path
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [id, user.image_path])

    if (!isLoggedIn || (id === "me" && !localStorage.getItem("token"))) {
        return <Redirect to="/" />
    }
// just keep the comment, so we cna refer later lol
// this part is to update profile image picture
    const uploadImages = (e) => {
        e.preventDefault();
        const fileInput = e.target
        const formData = new FormData()
        formData.append("image", profileImg)
        axios.post("https://homefoods1.herokuapp.com/api/v1/images/", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((uploadImg) => {
                    fileInput.value = null
                    const userCopy = { ...user }
                    setUser({})
                    setUser(userCopy)
                    console.log(uploadImg)
            })
    }
    
    
// this part to update profile details (this part is not working properly)
// its tell me the token is incorrect
    const updateInfo = (e) => {
        e.preventDefault();

        axios.post(`https://homefoods1.herokuapp.com/api/v1/users/${id}`, {
                username,
                email,
                old_password,
                password
            },
            {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }, 
                 
        })
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.token)
            const userCopy = { ...user }
            setUser({})
            setUser(userCopy)
        })
    }

    const handleFileChange = (e) => {
        setProfileImg(e.target.files[0])
    }

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleOldPassword = e => {
        setOldPassword(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div>
            {
                user.id ?
                    <>
                        <div>
                            <img src={user.profileImage} width="200" />
                            <p>{user.username}</p>
                        </div>
                        <div>
                            <form onSubmit={uploadImages}>
                                <input type="file" onChange={handleFileChange}/>
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={updateInfo}>
                                <input value={username} placeholder={user.username} type="text" onChange={handleUsername} />
                                <input value={email} placeholder={user.email} type="email" onChange={handleEmail} />
                                <input value={old_password} placeholder="Old password" type="password" onChange={handleOldPassword} />
                                <input value={password} placeholder="New password" type="password" onChange={handlePassword} />
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </> :
                    null
            }
        </div>
    )

}