import React, { lazy } from 'react'
const WidgetsDropdown = lazy(() => import('src/views/widgets/WidgetsDropdown.js'))

const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown />
    </>
  )
}

export default Dashboard
