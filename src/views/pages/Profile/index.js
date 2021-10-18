import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {
    const address =  useSelector(state => state.persist.address);
    return (
        <div>
            <div className="cover">
                <img className="w-100 cover_img" alt="banner" src={'images/cover.png'} />
            </div>
            <div style={{textAlign :"center", marginTop : "30px"}}>
                <h4>Wallet</h4>  {address}
            </div>
        </div>
    )
}

export default Profile
