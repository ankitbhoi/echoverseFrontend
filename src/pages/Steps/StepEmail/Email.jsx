import { useState } from 'react'
import Card from '../../../Components/Shared/Card/Card'
import InputText from '../../../Components/Shared/InputText/InputText'
import styles from './StepEmail.module.css'
import Button from '../../../Components/Shared/Button/Button'
import { toast } from 'react-toastify'
import { sendOtp } from '../../../http'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../store/authSlice'

const Email = ({ onNext }) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const onSubmit = async () => {
        if (!email) {
            return toast.error('Email is required')
        }
        try {
            const { data } = await sendOtp({ email: email })
            dispatch(setOtp({ email: data.email, hash: data.hash }))
            onNext()
        } catch (err) {
            return toast.error(err.response.data.message)
        }
    }
    return (
        <Card title={'Enter Your Email'} icon="mail-white">
            <InputText
                className={styles.emailInput}
                fullwidth="true"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrapper}>
                    <Button text="Next" onClick={onSubmit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your email, you are agreeing to our Terms of
                    Service and Privacy Policy. Thanks :&#41;
                </p>
            </div>
        </Card>
    )
}

export default Email
