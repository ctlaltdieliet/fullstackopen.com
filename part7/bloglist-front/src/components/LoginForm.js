import { useState } from 'react'
import {Form} from 'react-bootstrap/Form'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }

    return (
        <div className="container">
            <h2>Log in to application</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                    />
                </Form.Group>

                <button id="login-button" type="submit">
                    Login2
                </button>
            </Form>
        </div>
    )
}

export default LoginForm
