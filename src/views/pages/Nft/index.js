import { CBadge, CDataTable, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import moment from 'moment'
import { ApiService } from 'src/services/api.service';
import { HOME_ROUTE } from 'src/constants/env.constant';

export default function NFT(props) {
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [tableFilterValue, setTableFilterValue] = useState("");
    const [sorterValue, setSorterValue] = useState();

    // getdata function - get the data from api

    const getData = async () => {
        const { getNft } = ApiService
        setLoading(true)
        let data = { page: page, limit: itemsPerPage }
        if (tableFilterValue) { data.filters = { search: tableFilterValue } }
        let resp = await getNft(data);
        if (resp && resp.status === "200") {
            setItems(resp.data.data); 
            let pages = Math.ceil(resp.data.count / itemsPerPage)
            setPages(pages)
        }
        setLoading(false);
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

    const fields = [{ key: 'name', sorter: false, filter: false  },
    { key: 'nftAddress', sorter: false, filter: false },
    { key: 'creator', sorter: false, filter: false },
    { key: 'owner', sorter: false, filter: false },
    { key: 'externalLink', sorter: false, filter: false },
    { key: 'createdAt', sorter: false, filter: false },
    { key: 'status', sorter: false, filter: false },
    ]

    // on row Click function

    const handleRowClick = (items) => {
        props.history.push(`${HOME_ROUTE}/nft/${items._id}`)
    }

    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
       const fetch = getData()
       return fetch
        //eslint-disable-next-line
    }, [page, itemsPerPage,  tableFilterValue])

    return (

        <Container className="Transaction_page" >
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>Nft Details</b></h5>
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
                        onRowClick={(item) => handleRowClick(item)}
                        sorterValue={sorterValue}
                        onSorterValueChange={setSorterValue}
                        itemsPerPageSelect={{ external: true }}
                        itemsPerPage={itemsPerPage}
                        onPaginationChange={setItemsPerPage}
                        scopedSlots={{
                            'name':
                                (item) => (<td><span style={{ letterSpacing :"0.1em" }}>{item.name} </span> </td>),
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
                            'creator':
                                (item) => (<td> {item.creator.username || "unnamed"} 
                                </td>
                                ),
                            'owner':
                                (item) => (<td> {item.owner.username || "unnamed"} 
                                         </td>
                                ),
                            'externalLink':
                            (item) => (<td> {item.externalLink || "NA"} 
                                        </td>
                                ),
                            'nftAddress':
                                (item) => (<td> <span style={{color : "#004ca2"}}> {item.nftAddress.substring(1, 7)}...{item.nftAddress.slice(-6)} </span>
                                </td>
                                ),
                        }
                        }
                    />
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

