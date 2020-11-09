import React, {useState} from 'react'
import axios from 'axios'

export default ({setLogin, setOpen}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
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

    return (
        <>
            <input value={username} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
            <input value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}