import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col, CustomInput } from "reactstrap";
import { ApiService } from 'src/services/api.service';
import {Spinner} from 'src/views/base';

export default function AddEditForm(props) {
    const [loading , setLoading] = useState(false);
    const [userState, setUserState] = useState({
        id :"" ,name: "", logo :useRef() , description :"", externalLink :"", banner : useRef(), featuredBanner:useRef(), royality:"",
        payoutWalletAddress:"", collaborators :"", blockChain :"", displayTheme : "", paymentToken :"", sensitiveContent:"true",
        status :"ACTIVE"
      })
    
    const [userStateError, setUserErrorState] = useState({
        name: false, description :false, externalLink :false, royality:false,
        payoutWalletAddress:false, collaborators :false, blockChain :false, displayTheme : false, paymentToken :false, 
      })

    // ~ on add item ~

    const handleChange = (e)=>{
        const value = e.target.value;
        setUserState({
         ...userState,
         [e.target.name]: value
        });
     }


    const handleFileChange = (e) => {
        const file = e.target.files[0]; // accesing file
        setUserState({
            ...userState,
            [e.target.name]: file // storing file
        });
    }
    // ~ on Edit item ~

    const submitFormEdit = async(e) => {
        e.preventDefault() ;
        if (!userState.name) return setUserErrorState({name : true});
        else if (!userState.description) return setUserErrorState({description : true});
        else if (!userState.externalLink) return setUserErrorState({externalLink : true});
        else if (!userState.royality) return setUserErrorState({royality : true});
        else if (!userState.payoutWalletAddress) return setUserErrorState({payoutWalletAddress : true});
        else if (!userState.collaborators) return setUserErrorState({collaborators : true});
        else if (!userState.blockChain) return setUserErrorState({blockChain : true});
        else if (!userState.displayTheme) return setUserErrorState({displayTheme : true});
        else if (!userState.paymentToken) return setUserErrorState({paymentToken : true});
        else{ const {updateCollection} = ApiService
              setLoading(true)
              let resp = await updateCollection(userState)
              if(resp && resp.status === "200")props.updateState()
            setLoading(false)
            props.toggle()
        }
    }

    useEffect(() => {
      if(props.item){
          const { _id , name, description , externalLink , royality ,
          payoutWalletAddress , collaborators , blockChain , displayTheme , paymentToken , sensitiveContent ,
          status} = props.item

          setUserState({id : _id, name, description , externalLink , royality ,
              payoutWalletAddress , collaborators , blockChain , displayTheme , paymentToken , sensitiveContent ,
              status})
      }
    }, [props.item])


    return (
        <Form onSubmit={props.item ? submitFormEdit : null}>
        { loading ? <Spinner /> : null }
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" invalid={userStateError.name}  value={userState.name} onChange={handleChange}  placeholder="name" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="logo">Logo</Label>
            <CustomInput type="file" id="logo" name="logo" invalid={userStateError.logo}  accept='image/*' label="choose file" ref={userState.logo} onChange={handleFileChange} />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" invalid={userStateError.description} value={userState.description} onChange={handleChange}  id="description" placeholder="description" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="externalLink">External Link</Label>
            <Input type="text" name="externalLink" invalid={userStateError.externalLink} value={userState.externalLink} onChange={handleChange}  id="externalLink" placeholder="externalLink" />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="banner">Banner</Label>
            <CustomInput type="file" id="banner" name="banner" label="choose file" ref={userState.banner} onChange={handleFileChange} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="featuredBanner">Featured Banner</Label>
            <CustomInput type="file" id="featuredBanner" name="featuredBanner" label="choose file" ref={userState.featuredBanner} onChange={handleFileChange} />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="royality">Royality</Label>
            <Input type="text" name="royality" invalid={userStateError.royality} value={userState.royality} onChange={handleChange}  placeholder="royality" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="payoutWalletAddress">Wallet Address</Label>
            <Input type="text" name="payoutWalletAddress" invalid={userStateError.payoutWalletAddress} value={userState.payoutWalletAddress}  onChange={handleChange} placeholder="payout WalletAddress" />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="displayTheme">Display Theme</Label>
            <Input type="text" name="displayTheme" invalid={userStateError.displayTheme} value={userState.displayTheme} onChange={handleChange}  placeholder="display theme" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="paymentToken">Payment Token</Label>
            <Input type="text" name="paymentToken" invalid={userStateError.paymentToken} value={userState.paymentToken} onChange={handleChange}  placeholder="Payment Token" />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="sensitiveContent">Sensitive Content</Label>
            <Input type="select" name="sensitiveContent" value={userState.sensitiveContent} onChange={handleChange} >
            <option value={'true'}>True</option>
            <option value={'false'}>False</option>
            </Input>
          </FormGroup>
        </Col>
        
        <Col md={6}>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input type="select" name="select" value={userState.status} onChange={handleChange}  >
            <option value={'ACTIVE'}>Active</option>
            <option value={'INACTIVE'}>Inactive</option>
          </Input>
          </FormGroup>
        </Col>
      </Row>
      <Button color="info" disabled={loading}>Submit</Button>
      </Form>
    )
}
