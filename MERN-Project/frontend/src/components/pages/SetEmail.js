import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function SetEmail() {
    const history = useHistory()
    const [email, setEmail] = useState('')

    //NOTE: try to fetch email using useEffect, you'll have to create a API for that

    const onSubmit = async (e) => {
        try {
            e.preventDefault()

            const newEmail = {
                email,
            }

            const res = await axios
                .post('http://localhost:3030/api/save-email/', newEmail)
            console.log(res.data)
            history.push('/')

        } catch (error) {

        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Set Email</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group mb-3'>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        name="email"
                        type='text'
                        className='form-control'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Set Email'
                    />
                </div>
            </form>
        </div>
    )
}
