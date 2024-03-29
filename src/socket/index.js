import { io } from 'socket.io-client'

export default () => {
    const options = {
        'force new connections': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    }

    return io(process.env.REACT_APP_SOCKET_SERVER_URL, options)
}
