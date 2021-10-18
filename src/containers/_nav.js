import React from 'react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <i className="fad fa-tachometer-alt-slowest c-sidebar-nav-icon"></i>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
    to: '/category',
    icon: <i className="fad fa-list-alt c-sidebar-nav-icon"></i>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Collection',
    to: '/collection',
    icon: <i className="fad fa-album-collection c-sidebar-nav-icon"></i>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'NF-Token',
    to: '/nft',
    icon: <i className="fab fa-bitcoin c-sidebar-nav-icon"></i>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sell Nft',
    to: '/sell-nft',
    icon: <i className="far fa-cart-arrow-down c-sidebar-nav-icon"></i>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Transaction',
    to: '/transaction',
    icon: <i className="fad fa-random c-sidebar-nav-icon"></i>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/user',
    icon: <i className="fad fa-users c-sidebar-nav-icon"></i>,
  },
]

export default _nav
