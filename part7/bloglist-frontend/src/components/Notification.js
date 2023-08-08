import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  console.log('state is ', notification)
  if (notification === undefined) {
    return null
  }
  console.log(notification.type)
  return <div className={notification.className}>{notification.message}</div>

}

export default Notification
