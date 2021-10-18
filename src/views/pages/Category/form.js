import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { ApiService } from 'src/services/api.service';
import {Spinner} from 'src/views/base';

export default function AddEditForm(props) {
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('ACTIVE')
    const [isValid, setIsValid] = useState(false)
    const [id, setId] = useState('')
    const [loading , setLoading] = useState(false)

    // on add item

    const submitFormAdd = async(e) => {
        e.preventDefault()
        if (category.trim() === "") setIsValid(true);
        else{
            const {addCategory} = ApiService
            setLoading(true)
            let resp = await addCategory({name : category})
            if(resp && resp.status === "200"){  
                props.updateState()
            }
            setLoading(false)
            props.toggle()
        }
    }

    // on Edit item

    const submitFormEdit = async(e) => {
        e.preventDefault()
        if (category.trim() === "") setIsValid(true);
        else{
            const {updateCategory} = ApiService
            setLoading(true)
            const data = {id : id , name : category, status: status}
            let resp = await updateCategory(data)
            if(resp && resp.status === "200"){  
                props.updateState()
            }
            setLoading(false)
            props.toggle()
        }
    }


    useEffect(() => {
        if(props.item){
            setCategory(props.item.name); 
            setId(props.item._id);
            setStatus(props.item.status);
        }
    }, [props.item])

    // JSX

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
        { loading ? <Spinner /> : null }
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" invalid={isValid} name="name" id="name" onChange={(e) => {setCategory(e.target.value); setIsValid(false)}} value={category === null ? '' : category} />
          <FormFeedback>Please provide category name</FormFeedback>
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
