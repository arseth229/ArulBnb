import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';
import { useModal } from '../../context/Modal';


function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        console.log({credential, password})
        try {
            await dispatch(sessionActions.login({credential, password}))
            closeModal();
        }
        catch (res) {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors);
        }
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                </label>
                <label>
                Password
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default LoginFormModal;