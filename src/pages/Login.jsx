import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmitLogin = (evento) => {
        evento.preventDefault();

        const credentials = {
            email,
            password
        }

        const result = actions.login(credentials);
        if (result) {
            setEmail("");
            setPassword("");
            setError(null);
            navigate('/');
        } else {
            setPassword("");
            setError({ msg: 'El usuario y contraseña no coinciden' });
        }

    }

    useEffect(() => {
        if (store.user !== null) navigate('/');
    }, [store.user])

    return (
        <div className="d-flex w-50 mx-auto my-5 shadow flex-column">
            {!!error && (
                <div className='alert alert-danger m-2' role='alert'>
                    {error?.msg}
                </div>
            )}
            <form onSubmit={handleSubmitLogin} className="w-100 p-3">
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder='john.doe@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder='********' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary btn-sm gap-2">Login</button>
                </div>
            </form>
            <small>{process.env.DBUSER}</small>
        </div>
    )
}

export default Login