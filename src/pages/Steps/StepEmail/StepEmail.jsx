import Email from './Email'
import styles from './StepEmail.module.css'

const StepEmail = ({ onNext }) => {
    return (
        <div className={styles.cardWrapper}>
            <div>
                <div className={styles.buttonWrapper}></div>
                <Email onNext={onNext} />
            </div>
        </div>
    )
}

export default StepEmail
