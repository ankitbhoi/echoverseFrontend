import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import { logout } from '../../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { toast } from 'react-toastify'

const Navigation = () => {
    const dispatch = useDispatch()
    const { isAuth, user } = useSelector((state) => state.auth)

    const logOut = async () => {
        try {
            const { data } = await logout()
            dispatch(setAuth(data))
        } catch (err) {
            return toast.error(err.message)
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link className={styles.brandLogo} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span className={styles.logoText}>EchoVerse</span>
            </Link>
            {isAuth && (
                <div className={styles.navbarRight}>
                    <h3 className={styles.userName}>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/spongebob-avatar.jpeg'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button className={styles.logoutButton} onClick={logOut}>
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navigation
