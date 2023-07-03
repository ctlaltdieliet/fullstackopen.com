import { useSelector } from 'react-redux'

const Notification = () => {
console.log("jaa")
  const notification = useSelector(state => state.notifications)
  console.log("notification=",notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification){
  return (
    <div style={style}>

      {notification}
    </div>
  )
  }
  else return(<div></div>)
}

export default Notification