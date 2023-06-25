import './UserHeader.scss'
import logo from '../../../../../assets/app-logo.jpg'; 

const UserHeader = () => {

  return (
    <div className='userHeader'>
      <img src={logo} alt="user icon" className='userHeader-icon' />
      <p className='userHeader-name'>text</p>
    </div>
  )
}

export default UserHeader