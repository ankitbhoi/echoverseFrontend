import { useState, useEffect } from 'react'
import RoomCard from '../../Components/RoomCard/RoomCard'
import styles from './Rooms.module.css'
import AddRoomModal from '../../Components/AddRoomModal/AddRoomModal'
import { getAllRooms } from '../../http'

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms()
            setRooms(data)
            setFilteredRooms(data)
            setSearchTerm('')
        }
        fetchRooms()
    }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setFilteredRooms(
            rooms.filter((room) => {
                return room.topic
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            })
        )
    }

    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice Rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input
                                value={searchTerm}
                                onChange={handleSearch}
                                type="text"
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button
                            className={styles.startRoomButton}
                            onClick={() => setShowModal(true)}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start A Room</span>
                        </button>
                    </div>
                </div>
                <div className={styles.roomList}>
                    {filteredRooms.length > 0
                        ? filteredRooms.map((room) => {
                              return <RoomCard key={room.id} room={room} />
                          })
                        : ''}
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </>
    )
}

export default Rooms
