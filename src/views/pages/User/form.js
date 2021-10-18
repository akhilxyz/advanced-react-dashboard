import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ApiService } from 'src/services/api.service';
import { Spinner } from 'src/views/base';

export default function AddEditForm(props) {
    const [walletAddress, setwalletAddress] = useState('')
    const [loading , setLoading] = useState(false)
    const [status, setStatus] = useState('ACTIVE')
    const [id, setId] = useState('')

    // Edit item in from

    const submitFormEdit = async(e) => {
        e.preventDefault()
            const {updateUser} = ApiService
            setLoading(true)
            const data = {id : id , status: status}
            let resp = await updateUser(data)
            if(resp && resp.status === "200"){  
                props.updateState()
            }
            setLoading(false)
            props.toggle()
    }

    // useEffect
    
    useEffect(() => {
            setwalletAddress(props.item.walletAddress); 
            setStatus(props.item.status);
            setId(props.item._id);
    }, [props.item])

    return (
        <Form onSubmit={props.item ? submitFormEdit : null}>
        { loading ? <Spinner /> : null }
        <FormGroup>
          <Label for="name">Wallet Address</Label>
          <Input type="text" disabled value={walletAddress === null ? '' : walletAddress} />
        </FormGroup>
        <FormGroup>
          <Label for="active">Status</Label>
          <Input type="select" name="select" disabled={props.item ? false : true} value={status} onChange={(e)=> setStatus(e.target.value)}>
            <option value={'ACTIVE'}>Active</option>
            <option value={'INACTIVE'}>Inactive</option>
          </Input>
        </FormGroup>
        <Button color="info" disabled={loading}>Submit</Button>
        </Form>
    )
}
