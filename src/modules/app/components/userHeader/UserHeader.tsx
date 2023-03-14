import './UserHeader.scss'

const UserHeader = () => {
  return (
    <div className='userHeader'>
      <img src="src\assets\app-logo.jpg" alt="user icon" className='userHeader-icon' />
      <p className='userHeader-name'>User name</p>
    </div>
  )
}

export default UserHeader