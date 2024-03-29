import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Shared/Button/Button'
import Card from '../../Components/Shared/Card/Card'

const Home = () => {
    const navigate = useNavigate()

    const StartReg = () => {
        navigate('/authenticate')
    }

    return (
        <div className="cardWrapper">
            <Card title="Welcome to EchoVerse 🗣" icon="logo">
                <p className={styles.text}>
                    We’re working hard to get VoiceClub ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    <Button text="Register or SignIn" onClick={StartReg} />
                </div>
            </Card>
        </div>
    )
}

export default Home
