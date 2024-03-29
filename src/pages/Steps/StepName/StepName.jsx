import { useState } from 'react'
import Card from '../../../Components/Shared/Card/Card'
import Button from '../../../Components/Shared/Button/Button'
import InputText from '../../../Components/Shared/InputText/InputText'
import { useDispatch, useSelector } from 'react-redux'
import styles from './StepName.module.css'
import { setName } from '../../../store/activateSlice'
import { toast } from 'react-toastify'

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate)
    const [fullName, setFullName] = useState(name)
    const dispatch = useDispatch()

    const onSubmit = () => {
        if (!fullName) {
            return toast.error('Enter Your Name')
        }
        dispatch(setName(fullName))
        onNext()
    }

    return (
        <Card title={'Enter Your Full Name'} icon="goggle-emoji">
            <InputText
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={20}
            />
            <p className={styles.paragraph}>Use your real names only please.</p>
            <div>
                <Button text="Next" onClick={onSubmit} />
            </div>
        </Card>
    )
}

export default StepName
