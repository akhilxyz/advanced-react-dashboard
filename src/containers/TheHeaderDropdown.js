import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { HOME_ROUTE } from 'src/constants/env.constant'

const TheHeaderDropdown = () => {
  const dispatch = useDispatch() ;

  // login
  const logout = () => {
    dispatch({type: 'logout', payload: ""});
  }

  const profile = () => {
    window.location.assign(`${HOME_ROUTE}/profile`)
  }
  
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/user.svg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
          <CDropdownItem onClick={profile}>
          <i className="fad fa-user mfe-2"></i> Profile
          </CDropdownItem>
        <CDropdownItem>
          <i className="far fa-cog mfe-2"></i>
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem  onClick={logout}>
          <i className="fas fa-lock-alt mfe-2"></i>
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
