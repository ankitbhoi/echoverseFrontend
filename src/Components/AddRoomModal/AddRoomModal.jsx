import styles from './AddRoomModal.module.css'
import InputText from '../Shared/InputText/InputText'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createRoom as create } from '../../http'

const AddRoomModal = ({ onClose }) => {
    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')
    const navigate = useNavigate()

    const createRoom = async () => {
        if (!topic) {
            return toast.error('Please enter a topic')
        }
        try {
            const { data } = await create({ topic, roomType })
            navigate(`/room/${data.id}`)
        } catch (err) {
            return toast.error(err.response.data.message)
        }
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter the topic</h3>
                    <InputText
                        fullwidth="true"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <h2 className={styles.subHeading}>Room Types</h2>
                    <div className={styles.roomTypes}>
                        <div
                            onClick={() => setRoomType('open')}
                            className={`${styles.typeBox} ${
                                roomType === 'open' ? styles.active : ''
                            }`}
                        >
                            <img src="/images/globe.png" alt="globe" />
                            <span>Open</span>
                        </div>
                        <div
                            onClick={() => setRoomType('social')}
                            className={`${styles.typeBox} ${
                                roomType === 'social' ? styles.active : ''
                            }`}
                        >
                            <img src="/images/social.png" alt="social" />
                            <span>Social</span>
                        </div>
                        <div
                            onClick={() => setRoomType('private')}
                            className={`${styles.typeBox} ${
                                roomType === 'private' ? styles.active : ''
                            }`}
                        >
                            <img src="/images/lock.png" alt="lock" />
                            <span>Private</span>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h2>Start a room</h2>
                    <button
                        className={styles.footerButton}
                        onClick={createRoom}
                    >
                        <img src="/images/celebration.png" alt="celebration" />
                        <span>Let's Go...</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal
