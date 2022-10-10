import { useState, useEffect } from "react";
import Form from "../Form/Form";
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var dateTime = date;

     useEffect(() => {
        localStorage.clear()
    }, [])

    return (
        <main>
            <h1 className="register">Register account</h1>
            <Form fetch={(event) => {
                event.preventDefault();
                const email = document.getElementById('email') as HTMLInputElement
                const password = document.getElementById('password') as HTMLInputElement

                fetch(`http://localhost:8079/v1/users/${email.value}`)
                .then(res => res.json())
                .then(res => {
                    if(res.length === 0) {
                        fetch('http://localhost:8079/v1/users/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value,
                        regTime: dateTime,
                        admin: 0
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.err) {
                            setMessage(res.err);
                        } else {
                            setMessage('User created!')
                            setTimeout((): void => {
                                navigate('/login')
                            }, 2000)
                        }
                    })
                    .catch(error => console.log(error));
                    } else {
                        setMessage('This Email already exists')
                    }
                })
                .catch(error => console.log(error))

            }}>
                <label>Email:</label>
                <input type="email" name="email" id="email" required minLength={4} maxLength={30} />
                <label>Pasword:</label>
                <input type="password" name="password" id="password" required minLength={3} maxLength={18} />
                <div>
                    <button type="submit">Register</button>
                </div>

            </Form>

            {message.length > 1 && <div className="message">{message}</div>}
        </main>
    )
}

export default Register;