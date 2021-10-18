import { CBadge, CDataTable, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tooltip, Button } from "reactstrap";
import moment from 'moment'
import { ApiService } from 'src/services/api.service';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from 'src/constants/env.constant';
import { ModalContext } from '../../Modal/Context';

const DeleteModal = React.lazy(() => import('../../Modal/Modal'));

export default function SellNFT() {
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [tableFilterValue, setTableFilterValue] = useState("");
    const [sorterValue, setSorterValue] = useState();
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [showModal, updateShowModal] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const toggleModal = (id) => {updateShowModal(state => !state); setDeletedId(id)};

    const toggle = () => setTooltipOpen(!tooltipOpen);
    // getdata function - get the data from api

    const getData = async () => {
        const { getSellNft } = ApiService
        setLoading(true)
        let data = { page: page, limit: itemsPerPage }
        if (tableFilterValue) { data.filters = { search: tableFilterValue } }
        let resp = await getSellNft(data);
        if (resp && resp.status === "200") {
            setItems(resp.data.data);
            let pages = Math.ceil(resp.data.count / itemsPerPage)
            setPages(pages)
        }
        setLoading(false);
    }

    // delete items function for delete a item from the data

    const deleteItem = async () => {
        const { deleteSellNft } = ApiService
        let resp = await deleteSellNft(deletedId)
        if (resp && resp.status === "200") {
            getData()
        }
        toggleModal()
    }

    // get Badge from status

    const getBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return 'success'
            case 'PROCESSING': return 'warning'
            case 'FAILED': return 'danger'
            default: return 'primary'
        }
    }

    // table header fields

    const fields = [{ key: 'name', sorter: false, filter: false },
    { key: 'nftAddress', sorter: false, filter: false },
    { key: 'owner', sorter: false, filter: false },
    { key: 'reservePrice', sorter: false, filter: false },
    { key: 'reservedPrice', sorter: false, filter: false },
    { key: 'sellType', sorter: false, filter: false },
    { key: 'createdAt', sorter: false, filter: false },
    { key: 'status', sorter: false, filter: false },
    { key: 'transactionStatus', label: "Transaction", sorter: false, filter: false },
    { key: 'show_actions',  filter: false },

    ]


    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
        const fetch = getData()
        return fetch
        //eslint-disable-next-line
    }, [page, itemsPerPage, tableFilterValue])

    return (

        <Container className="Transaction_page" >
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>Sell Nft Details</b></h5>
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
                        tableFilter={{ external: true }}
                        tableFilterValue={tableFilterValue}
                        onTableFilterChange={setTableFilterValue}
                        sorter
                        clickableRows
                        sorterValue={sorterValue}
                        onSorterValueChange={setSorterValue}
                        itemsPerPageSelect={{ external: true }}
                        itemsPerPage={itemsPerPage}
                        onPaginationChange={setItemsPerPage}
                        scopedSlots={{
                            'transactionStatus':
                                (item) => (<td><span >
                                    <CBadge color={getBadge(item.transactionStatus)}>
                                        {item.transactionStatus || "NA"}
                                    </CBadge>
                                </span> </td>),

                            'reservedPrice':
                                (item) => (<td><span >{item.reservedPrice || "NA"} </span> </td>),
                            'name':
                                (item) => (<td><span style={{ letterSpacing: "0.1em" }}>{item.nft ? item.nft.name : "unnamed"} </span> </td>),
                            'status':
                                (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status}
                                        </CBadge>
                                    </td>
                                ),
                            'createdAt':
                                (item) => (<td> {moment(item.createdAt).format('ll')} </td>),
                            'owner':
                                (item) => (<td>
                                    <span id="TooltipOwner">
                                        {item.owner && item.owner.username ? item.owner.username : "unnamed"}
                                        <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipOwner" toggle={toggle}>
                                            {item.owner && item.owner.walletAddress ? item.owner.walletAddress : "NA"}
                                        </Tooltip>
                                    </span>
                                </td>
                                ),
                            'nftAddress':
                                (item) => (<td>
                                    <Link to={{ pathname: `${HOME_ROUTE}/nft/${item.nft._id}` }}>
                                        <span style={{ color: "#004ca2" }}> {item.nftAddress.substring(1, 7)}...{item.nftAddress.slice(-6)} </span>
                                    </Link>
                                </td>
                                ),
                            'show_actions':
                            (item) => {
                                return (<td className="py-2">
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

