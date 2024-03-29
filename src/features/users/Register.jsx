import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import { setUser } from './userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const dispatch = useDispatch()
 
    var canReg = Boolean(username) && Boolean(password)

    const validate = async() => {
        $('#submitBtn').text('Registering ⏳')
        await axios.post('/.netlify/functions/createUser',
            {name:username, password:password}
        )
        .then(response =>{
            //console.log("response", response.data.success._id)
            dispatch(
                setUser({
                    name: username,
                    userId: response.data.success._id,
                })
            )
            navigate("/notes")
        })
        .catch(err => {
            $('#submitBtn').text('Register')
            console.log("err: ", err)
            if(err.response.data.message == 'A user with that username already exits'){
                //console.log("A user with that username already exits",)
                $('#notification').text('A user with that username already exits!')
            }

        })
    }

    return (
        <>
        <div className='h-screen w-screen bg-blue-0 flex justify-center items-center'>
            <div className='sm:w-[350px] sm:h-[400px] w-full h-full sm:bg-white py-[20px] px-[10px] bg-blue-0 rounded-[20px] flex flex-col justify-between items-center'>
                <h1 className='text-3xl font-bold text-slate-600 font-mono'>Register</h1>
                <div className='min-w-full'>
                    <input id='username' onChange={onUsernameChanged} type="text" className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-5' placeholder='Username'/>
                    <input id='password' onChange={onPasswordChanged} type="text" className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' placeholder='Password'/>
                </div>

                <div id="notification" className='text-red-500'></div>
                
                <button id='submitBtn' onClick={validate} disabled={!canReg} className='bg-blue-600 py-2 px-5 w-full text-white font-bold text-[16px] hover:bg-blue-800 disabled:opacity-80 disabled:pointer-events-none'>Register</button>
                <div>Already registered? <a href="/login" className='text-blue-500 hover:text-blue-800'>log in here</a></div>
            </div>
        </div>
        </>
    )
}

export default Register