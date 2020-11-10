import React, {useState} from 'react'
import axios from 'axios'

export default ({setLogin, setOpen}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        axios.post("https://homefoods1.herokuapp.com/api/v1/login/", {
            username,
            password
        })
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.token)
            setOpen(false)
            setLogin(response.data.token)

        })
    }

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <>
            <input value={username} placeholder="Username" type="text" onChange={handleUsername} />
            <input value={password} placeholder="Password" type="password" onChange={handlePassword} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}