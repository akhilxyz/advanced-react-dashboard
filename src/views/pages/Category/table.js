import React, { useState } from 'react'
import {Button } from 'reactstrap';
import { CDataTable  } from "@coreui/react";
import { ModalContext } from 'src/views/Modal/Context';
import { ApiService } from 'src/services/api.service';

const DeleteModal = React.lazy(() => import('src/views/Modal/Modal'));
const ModalForm = React.lazy(() => import('./modal'));


export default function DataTable(props) {
    const items = props.items || [];
    const loading = props.loading
    const [showModal, updateShowModal] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const toggleModal = (id) => {updateShowModal(state => !state); setDeletedId(id)};

    // header fields of data table

    const fields = [{ key: 'name', _style: { width: '40%' } },
                    { key: 'status', _style: { width: '20%' } },
                    { key: 'show_actions', label: '', _style: { width: '1%' }, sorter: false, filter: false }
                    ]

    // delete items function for delete a item from the data

    const deleteItem = async () => {
        const { deleteCategory } = ApiService
        let resp = await deleteCategory(deletedId)
        if (resp && resp.status === "200") {
            props.updateState()
        }
        toggleModal()
    }

    // delete items function for delete a item from the data
    
    return (
        <>
            <CDataTable
                items={items}
                fields={fields}
                hover
                cleaner
                tableFilter
                loading={loading}
                itemsPerPageSelect
                itemsPerPage={10}
                // eslint-disable-next-line
                hover
                sorter
                pagination
                scopedSlots={{
                    'status':
                        (item) => (
                            <td>
                                {item.status === 'ACTIVE' ?
                                    <span className="badge badge-success">Active</span> 
                                    :
                                    <span className="badge badge-danger">InActive</span>
                                }
                            </td>
                        ),
                    'show_actions':
                        (item) => {
                            return (
                                <td className="py-2">
                                    <div style={{ width: "110px", float: "right" }}>
                                        <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
                                        {' '}
                                        <Button size="sm" color="danger" onClick={() => toggleModal(item._id)}>
                                            <i className="fad fa-trash-alt"></i>
                                        </Button>
                                    </div>
                                </td>
                        )
                    },
                }}
            />
            <ModalContext.Provider value={{ showModal, toggleModal , deleteItem}}>
            <div>
                <DeleteModal canShow={showModal} updateModalState={toggleModal} deleteItem={deleteItem}/>
            </div>
            </ModalContext.Provider>
        </>
    )
}

