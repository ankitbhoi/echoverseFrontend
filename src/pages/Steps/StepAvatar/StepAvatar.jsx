import { useState, useEffect } from 'react'
import Card from '../../../Components/Shared/Card/Card'
import Button from '../../../Components/Shared/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import styles from './StepAvatar.module.css'
import { setAvatar } from '../../../store/activateSlice'
import { activate } from '../../../http'
import { setAuth } from '../../../store/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Shared/Loader/Loader'

const StepAvatar = () => {
    const { name, avatar } = useSelector((state) => state.activate)
    const [image, setImage] = useState('/images/spongebob-avatar.jpeg')
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(true)
    const dispatch = useDispatch()

    const captureImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            setImage(reader.result)
            dispatch(setAvatar(reader.result))
        }
    }

    const onSubmit = async () => {
        if (avatar === '') {
            return toast.error('Avatar is required')
        }
        try {
            const { data } = await activate({ name, avatar })
            if (data.auth) {
                if (mounted) {
                    dispatch(setAuth(data))
                }
            }
        } catch (err) {
            return toast.error(err)
        }
    }

    useEffect(() => {
        return () => {
            setMounted(false)
        }
    }, [])

    if (loading) return <Loader message="Activation in progress..." />
    return (
        <Card title={`Hello ${name}!`} icon="monkey-emoji">
            <p className={styles.subHeading}>Select your Avatar</p>
            <div className={styles.avatarWrapper}>
                <img src={image} alt="avatar" className={styles.avatarImage} />
            </div>
            <div>
                <input
                    onChange={captureImage}
                    id="avatarInput"
                    type="file"
                    className={styles.avatarInput}
                />
                <label htmlFor="avatarInput" className={styles.avatarLabel}>
                    Choose a different photo
                </label>
            </div>
            <div>
                <Button text="Let's go" onClick={onSubmit} />
            </div>
        </Card>
    )
}

export default StepAvatar
