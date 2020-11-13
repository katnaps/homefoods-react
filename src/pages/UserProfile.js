import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from 'axios';
import SessionContext from '../contexts/SessionContext'

import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';


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
                // console.log(uploadImg)
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
                // console.log(response)
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
// test
    return (
        <div>
            {
                user.id ?
                    <>
                        <Container className="mt-4">
                            <Container className="mt-4 d-flex">
                                <Image src={user.profileImage} width="300" fluid className="rounded d-print-block float-left mt-3 mb-3 mr-3" />
                                <h3 className="mt-auto">
                                    Username: {user.username}
                                </h3>


                            </Container>
                            <Form className="mb-4" onSubmit={uploadImages}>
                                <Form.Group>
                                    <Form.File type="file" onChange={handleFileChange} label="Update User Image Profile" />
                                </Form.Group>
                                <Button variant="primary" type="submit">Upload Image</Button>
                            </Form>

                            
                                <h4>Update User Details:</h4>

                                <Form onSubmit={updateInfo}>
                                    <Form.Row>
                                        <Col>
                                            <Form.Control value={username} placeholder={user.username} type="text" onChange={handleUsername} />
                                        </Col>
                                        <Col>
                                            <Form.Control value={email} placeholder={user.email} type="email" onChange={handleEmail} />
                                        </Col>
                                        <Col>
                                            <Form.Control value={old_password} placeholder="Old password" type="password" onChange={handleOldPassword} />
                                        </Col>
                                        <Col>
                                            <Form.Control value={password} placeholder="New password" type="password" onChange={handlePassword} />
                                        </Col>
                                    </Form.Row>
                                    <Button variant="primary" className="mt-4" type="submit">Update</Button>
                                </Form>
                               
                        </Container>
                    </> :
                    null
            }
        </div>
    )

}


{/* <div>
<form onSubmit={uploadImages}>
<input type="file" onChange={handleFileChange} />
<button type="submit">Upload</button>
</form>
</div> */}


{/* <form onSubmit={updateInfo}>
<input value={username} placeholder={user.username} type="text" onChange={handleUsername} />
<input value={email} placeholder={user.email} type="email" onChange={handleEmail} />
<input value={old_password} placeholder="Old password" type="password" onChange={handleOldPassword} />
<input value={password} placeholder="New password" type="password" onChange={handlePassword} />
<button type="submit">Update</button>
</form> */}
