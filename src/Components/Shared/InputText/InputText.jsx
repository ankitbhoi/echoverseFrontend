import styles from './InputText.module.css'

const InputText = ({ fullwidth, ...rest }) => {
    return (
        <div>
            <input
                className={styles.input}
                style={{
                    width: fullwidth === 'true' ? '100%' : 'inherit',
                }}
                type="text"
                {...rest}
            />
        </div>
    )
}
export default InputText
