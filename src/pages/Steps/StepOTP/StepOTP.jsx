import { useState } from 'react'
import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import InputText from '../../../Components/Shared/InputText/InputText'
import styles from './StepOTP.module.css'
import { toast } from 'react-toastify'
import { verifyOtp } from '../../../http'
import { setAuth } from '../../../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const StepOTP = () => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const { phone, hash, email } = useSelector((state) => state.auth.otp)

    const onSubmit = async () => {
        if (!otp) {
            return toast.error('Enter Your OTP')
        }
        try {
            const { data } = await verifyOtp({ otp, hash, phone, email })
            console.log(data);
            dispatch(setAuth(data))
        } catch (err) {
            return toast.error(err.response.data.message)
        }
    }

    return (
        <div className="cardWrapper">
            <Card title={'Enter OTP we just sent you'} icon="lock-emoji">
                <InputText
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                />
                <div>
                    <div className={styles.actionButtonWrapper}>
                        <Button text="Send" onClick={onSubmit} />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering OTP, you are agreeing to our Terms of
                        Service and Privacy Policy. Thanks :&#41;
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default StepOTP
