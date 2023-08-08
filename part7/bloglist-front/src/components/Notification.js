import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (!notification.payload) {
        return null
    }

    const style = {
        color: notification.payload.style === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return <div style={style}>{notification.payload.message}</div>
}

export default Notification
