import { CDataTable, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from "reactstrap";
import { ApiService } from 'src/services/api.service';
import { ModalContext } from '../../Modal/Context';

const DeleteModal = React.lazy(() => import('../../Modal/Modal'));
const ModalForm = React.lazy(() => import('./modal'));

export default function Collection() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [columnFilterValue, setColumnFilterValue] = useState({});
    const [tableFilterValue, setTableFilterValue] = useState("");
    const [showModal, updateShowModal] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const toggleModal = (id) => {updateShowModal(state => !state); setDeletedId(id)};

      // onChange Column Filter Value

    const onChangeColumnValue = (e) => {
        if (e.walletAddress){
            setColumnFilterValue(e)
        }
    }


    // table header fields

    const fields = [
        { key: 'name', filter: false },
        { key: 'user', filter: false },
        { key: 'logo',  filter: false },
        { key: 'banner',  filter: false },
        { key: 'description',  filter: false,},
        { key: 'blockChain', label:"BlockChain" , filter: false,},
        { key: 'paymentToken', label:"Token",  filter: false, },
        { key: 'payoutWalletAddress',  filter: false },
        { key: 'royality',  filter: false },
        { key: 'status',  filter: false, _style: { width: '14%' } },
        { key: 'show_actions',  filter: false, _style: { width: '14%' } },
    ]

    // getdata function - get the data from api

    const getData = async () => {
        const { getCollection } = ApiService
        setLoading(true)
        let data = { page: page, limit: itemsPerPage }
        if (tableFilterValue) { data.filters = { search: tableFilterValue } }
        let resp = await getCollection(data)
        if (resp  && resp.status === "200") {
            setItems(resp.data.data)
            let pages = Math.ceil(resp.data.count / itemsPerPage)
            setPages(pages)
        }
        setLoading(false)
    }

    // delete items function for delete a item from the data

    const deleteItem = async () => {
        const { deleteCollection } = ApiService
        let resp = await deleteCollection(deletedId)
        if (resp && resp.status === "200") {
            getData()
        }
        toggleModal()
    }

    // update data function - update the data if CRUD operation will performed

    const updateData = () => {
        getData()
    }

    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
        getData(); // getData
        //eslint-disable-next-line
    }, [page, itemsPerPage, columnFilterValue, tableFilterValue])

    return (
        <Container className="collection_page" >
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>Collection Details</b></h5>
                            </div>
                            <div className="p-2 flex-grow-1">
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col>
                    <CDataTable
                        items={items}
                        fields={fields}
                        loading={loading}
                        hover
                        cleaner
                        // columnFilter={{ external: true }}
                        // columnFilterValue={columnFilterValue}
                        onColumnFilterChange={(e) => onChangeColumnValue(e)}
                        tableFilter={{ external: true }}
                        tableFilterValue={tableFilterValue}
                        onTableFilterChange={setTableFilterValue}
                        itemsPerPageSelect={{ external: true }}
                        itemsPerPage={itemsPerPage}
                        onPaginationChange={setItemsPerPage}
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
                            'username':
                                (item) => (<td> {item.username || "unnamed"} </td>),
                            'user':
                                (item) => (<td> {item.user.username || "unnamed"} </td>),
                            'email':
                                (item) => (<td> {item.email || "NA"} </td>
                            ),
                            'payoutWalletAddress':
                                (item) => (<td> {item.payoutWalletAddress.substring(1, 7)}...{item.payoutWalletAddress.slice(-7)} </td>
                            ),
                            'logo':
                                (item) => (<td> {
                                    item.logo ?
                                    <img alt="logo" style={{width :"50px", height :"50px"}} src={item.logo}/>
                                    :
                                    null
                                    }
                                    </td>
                            ),  
                            'banner':
                                (item) => (<td> {
                                    item.banner ?
                                    <img alt="banner" style={{width :"50px", height :"50px"}} src={item.banner}/>
                                    :
                                    null
                                    }
                                    </td>
                            ),   
                            'show_actions':
                                (item) => {
                                    return (<td className="py-2">
                                        <ModalForm buttonLabel="Edit" item={item} updateState={updateData} />
                                        {' '}
                                        <Button size="sm" color="danger" onClick={() => toggleModal(item._id)}>
                                            <i className="fad fa-trash-alt"></i>
                                        </Button>
                                    </td>
                                    )
                                },
                        }
                        }
                    />
                    <ModalContext.Provider value={{ showModal, toggleModal , deleteItem}}>
                        <div>
                            <DeleteModal canShow={showModal} updateModalState={toggleModal} deleteItem={deleteItem}/>
                        </div>
                        </ModalContext.Provider>
                    <CPagination
                        pages={pages}
                        activePage={page}
                        onActivePageChange={setPage}
                        className={pages < 2 ? "d-none" : ""}
                    />
                </Col>
            </Row>
        </Container>
    )
}

