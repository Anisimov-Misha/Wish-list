import { Link } from 'react-router-dom';
import styles from './errorPage.module.css';

function ErrorPage() {
    return (
    <div className={styles.container}>
        <div className={styles.error_text}>Page is not found :(</div>
        <Link to={'/'}>
            <button className={styles.error_btn}>Go Home!</button>
        </Link>
    </div>
    )
}

export default ErrorPage;