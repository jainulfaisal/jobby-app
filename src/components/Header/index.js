import './index.css'
import {IoHomeSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link">
              <IoHomeSharp className="home-logo" />
              <p className="nav-text">Home</p>
            </Link>
          </li>

          <li>
            <Link to="/jobs" className="nav-link">
              <BsBriefcaseFill className="briefcase-logo" />
              <p className="nav-text">Jobs</p>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-button-sm"
              onClick={onClickLogout}
            >
              <FiLogOut className="logout-logo" />
            </button>
            <button
              type="button"
              className="logout-button-lg"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
