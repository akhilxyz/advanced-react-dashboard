import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <i className="c-sidebar-brand-full fas fa-clou"></i>
        <span className="c-sidebar-brand-full">
          <div className="container">
            <div className="row" style={{background : "none"}}>
              <div className="col" style={{ padding: 0 }}>
                <img src={"/avatars/logo.png"} style={{ width: "35px" }} alt="logo" />
              </div>
              <div className="col" >
                <h3><b>POC</b></h3>
              </div>
            </div>
          </div>
        </span>
        <span className="c-sidebar-brand-minimized ">
          <img src={"/avatars/logo.png"} style={{width :"35px"}} alt="logo" /> </span>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
