import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import './SignupForm.css'
import { useModal } from "../../context/Modal";



function SignupFormModal() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
    
           try { dispatch(sessionActions.signup({
                username, password, 
                firstName,
                lastName, email
                }))
                closeModal();
            } catch (res) {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
        } 
        return setErrors({
            confirmPassword: "Confirm Password field must be the same the Password field"
        })
    }
    

    return (
        <>
        <h1>Sign Up!</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  
                required />
            </label>
            {errors.username && <p>{errors.username}</p>}
            <label>
                Password
                <input type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            {errors.password && <p>{errors.password}</p>}
            <label>
                Confirm Password
                <input type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required/>
            </label>
            {errors.comfirmPassword && <p>{errors.conirmPassword}</p>}
            <label>
                First Name
                <input type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            <label>
                Last Name
                <input type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} required />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
            <label>
                Email
                <input type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </label>
            {errors.email && <p>{errors.email}</p>}
            <button type='submit'>Sign Up</button>
        </form>
        </>
    )
}

export default SignupFormModal;