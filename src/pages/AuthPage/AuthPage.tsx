import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './auth.module.css';

function AuthPage() {

    const [isLogin, setIsLogin] = useState(false);

    function toogleForm() {
        setIsLogin(prev => !prev)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>Wish List</div>
                <div className={styles.subtitle}>Створюй власний список побажань та ділися ним зі своїми друзями </div>
                
                {isLogin ? <LoginForm/> : <RegisterForm/>}

                <div className='toogle-link' onClick={toogleForm}>
                    {isLogin ? 'Не маєш аккаунту? Зареєструватись' : 'Вже маєш аккаут? Увійти'}
                </div>

            </div>
        </div>
    )
}

export default AuthPage;