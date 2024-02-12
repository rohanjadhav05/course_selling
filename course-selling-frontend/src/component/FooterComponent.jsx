import React from 'react'
import '../css/Footer.css'

const FooterComponent = () => {
  return (
    <div className='footer' style={{position : 'fixed', bottom : 0, width : '100%'}}>
        <p className='centered-test'>© 2024 Atharva Classes. All rights reserved.</p>
    </div>
  )
}

export default FooterComponent