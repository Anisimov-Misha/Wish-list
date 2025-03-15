import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.preventDefault();
        if (login.trim().length <= 5 || password.trim().length <= 5 || password !== passwordRepeat) {
            setShowError(true);
            return;
        }
        setShowError(false);

        localStorage.setItem('login', login)
        localStorage.setItem('password', password)
        localStorage.setItem('isAuth', 'true')

        setLogin('');
        setPassword('');
        setPasswordRepeat('');

        navigate('/main');
        window.location.reload();
    }

    return (
        <>
            <form className="auth-form" onSubmit={handleClick}>

                <div className="input-label">* Логін (Не менше 6 символів)</div>
                <input 
                type="text" 
                className='input' 
                placeholder='Наприклад: John19' 
                onChange={(e) => {setLogin(e.target.value)}}
                value={login}
                />

                <div className="input-label">* Пароль</div>
                <input 
                type="password" 
                className='input' 
                placeholder='Мінімум 6 символів' 
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}
                />

                <div className="input-label">* Повторіть пароль</div>
                <input 
                type="password" 
                className='input' 
                placeholder='Мінімум 6 символів'
                onChange={(e) => {setPasswordRepeat(e.target.value)}}
                value={passwordRepeat}
                />

                <div 
                className='password_error'
                style={{display: showError ? 'block' : 'none'}}
                >*Введенні дані не коректні!</div>

                <button type="submit" className='btn-auth'>Зареєструватись</button>
                    
            </form>
        </>
    )
}

export default RegisterForm;