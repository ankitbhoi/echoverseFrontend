import { useState } from 'react'
import StepEmail from '../Steps/StepEmail/StepEmail'
import StepOTP from '../Steps/StepOTP/StepOTP'

const Steps = {
    1: StepEmail,
    2: StepOTP,
}

const Authenticate = () => {
    const [step, setStep] = useState(1)
    const Step = Steps[step]
    const onNext = () => {
        setStep(step + 1)
    }

    return <Step onNext={onNext} />
}

export default Authenticate
