import React, { useState } from 'react'

import './Register.scss'

import { Button } from 'semantic-ui-react'


export default function Register() {

    const [inputs, setInputs] = useState({
        name: "pig",
        email: "",
        password: ""
    })

    const { name, email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <input type="text" name="name" placeholder="name" className="FormInput"  value={name} onChange={e => onChange(e)} />
                <input type="email" name="email" placeholder="email" className="FormInput" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="FormInput" value={password} onChange={e => onChange(e)} />
                <Button basic color='green' content='Green' className="FormInput" />
            </form>
        </div>
    )
}
