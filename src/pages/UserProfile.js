import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from 'axios';
import SessionContext from '../contexts/SessionContext.js'

export default () => {
    const { isLoggedIn } = useContext(SessionContext)
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [profileImg, setProfileImg] = useState(null)

    useEffect(() => {
        axios.get("https://homefoods1.herokuapp.com/api/v1/users/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                // console.log(response)
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

    const handleFileChange = (e) => {
        setProfileImg(e.target.files[0])
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
                    </> :
                    null
            }
        </div>
    )

}