import { useState } from "react";
import { useNavigate } from "react-router-dom";

import s from './loginForm.module.css';

function LoginForm() {

    const navigate = useNavigate();
    
    const loginStorage = localStorage.getItem('login') || ''
    const passwordStorage = localStorage.getItem('password') || ''
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const [showError, setShowError] = useState(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        if (login.length <= 5 || password.length <= 5) {
            setShowError(true);
            return;
        }
        setShowError(false);

        if (login !== loginStorage || password !== passwordStorage) {
            setShowError(true);
            return;
        }
        setShowError(false);

        localStorage.setItem('isAuth', 'true')

        setLogin('');
        setPassword('');

        navigate('/main')
        window.location.reload();
    }
    
    return(
        <>
            <form className="auth-form" onSubmit={handleClick}>

                <div className="input-label">Логін</div>
                <input 
                type="text" 
                className='input'
                placeholder='John19'
                onChange={(e) => {setLogin(e.target.value)}}
                />

                <div className="input-label">Пароль</div>
                <input 
                type="password" 
                className='input'
                placeholder='Мінімум 6 символів'
                onChange={(e) => {setPassword(e.target.value)}}
                />

                <div 
                className={s.password_error}
                style={{display: showError ? 'block' : 'none'}}
                >*Введенні дані не коректні!</div>

                <button className='btn-auth' type="submit">Увійти</button>
                    
            </form>
        </>
    )
}

export default LoginForm;