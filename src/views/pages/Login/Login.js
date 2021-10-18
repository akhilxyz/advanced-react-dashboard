import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner
  
} from '@coreui/react'

import { FormFeedback } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { ApiService } from 'src/services/api.service'
import { HOME_ROUTE } from 'src/constants/env.constant'

const Login = ({history}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)

  const onFormSubmit = async() => {
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (! re.test(email) ) return setIsValidEmail(true);
    if(!walletAddress) return setIsValidAddress(true)
    else{
      setLoading(true) ;
      const { login } = ApiService ;
      let resp = await login({email : email, walletAddress : walletAddress});
      if (resp && resp.status === "200") {
          dispatch({type: 'login', payload : {address: walletAddress , jwtToken : resp.token} })
          history.push(`${HOME_ROUTE}/dashboard`)
      }
      setLoading(false)
    }
  }


  return (
    // eslint-disable-next-line
    <div className="c-app c-default-layout flex-row align-items-center" style={{ backgroundImage: 'url('+`/images/login_background.jpg`+ ')'}}>
      <CContainer>
        <CRow className="justify-content-center" style={{background : "none"}}>
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                        <i className="fas fa-envelope"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" invalid={isValidEmail} value={email} onChange={(e) => {setEmail(e.target.value); setIsValidEmail(false)}} placeholder="email" autoComplete="email" />
                      <FormFeedback>Please Provide Valid Email</FormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-lock"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" invalid={isValidAddress} placeholder="Wallet Address" value={walletAddress} onChange={(e) => {setWalletAddress(e.target.value); setIsValidAddress(false)}} autoComplete="walletAddress" />
                      <FormFeedback>Please Provide Valid Address</FormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={onFormSubmit} color="primary" disabled={loading} className="px-4">
                          {
                            loading ?
                            <>
                            <CSpinner component="span" size="sm" aria-hidden="true"/>
                              {" "}Loading...
                            </>
                            :
                            "Login"
                          }
                        </CButton>
                      </CCol> 
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>NOTE</h2>
                    <p>
                    Admin login is used for POC admin accounts only. 
                    Regular accounts cannot be used to sign in to admin dashboard</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
