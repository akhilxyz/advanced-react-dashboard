import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1"> POC &copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.antiersolutions.com/" target="_blank" rel="noopener noreferrer">Antier Solutions</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
