import { CBadge, CDataTable, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment'
import { ApiService } from 'src/services/api.service';
import { GlobalVariables}  from 'src/constants/globalVariables.constant'

export default function Transaction() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [columnFilterValue, setColumnFilterValue] = useState({});
    const [tableFilterValue, setTableFilterValue] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [colorIdx, setcolorIdx] = useState(null)
    const [colorIdxWallet, setcolorIdxWallet] = useState(null)
    const {networks} = GlobalVariables


    const getPathName = async(id, trx) => {
        let network = await networks(id)
        window.open(`${network}/${trx}`, "_blank") || window.location.replace(`${network}/${trx}`);
    }

    // onChange Column Filter Value

    const onChangeColumnValue = (e) => {
        if (e.walletAddress){
            setColumnFilterValue(e)
        }
        else {
            setColumnFilterValue({})  
        }
    }

    // getdata function - get the data from api

    const getData = async () => {
        const { getTransaction } = ApiService
        setLoading(true)
        let data = { page: page, limit: itemsPerPage }
        if (columnFilterValue.walletAddress) { data.walletAddress = columnFilterValue.walletAddress }
        if (startDate && endDate) { data.startDate = startDate; data.endDate = endDate }
        if (tableFilterValue) { data.filters = { search: tableFilterValue } }
        let resp = await getTransaction(data)
        if (resp  && resp.status === "200") {
            setItems(resp.data.data)
            let pages = Math.ceil(resp.data.count / itemsPerPage)
            setPages(pages)
        }
        setLoading(false)
    }

    const getBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return 'success'
            case 'PROCESSING': return 'warning'
            case 'FAILED': return 'danger'
            default: return 'primary'
        }
    }

    const copyTrx = (idx) => {
        setcolorIdx(idx)
        setcolorIdxWallet(null)
    }

    const copywalletAddress = (idx) => {
        setcolorIdxWallet(idx)
        setcolorIdx(null)
    }

    const fields = [{ key: 'walletAddress',  _style: { width: '14%' } },
                    { key: 'transactionHash',  filter: false },
                    { key: 'transactionType',  label: 'Type', filter: false },
                    { key: 'nft',  filter: false },
                    { key: 'token',  filter: false },
                    { key: 'username',  filter: false },
                    { key: 'status',  filter: false },
                    { key: 'createdAt',  filter: false },
                    ]
    
    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
        getData()
        //eslint-disable-next-line
    }, [page ,itemsPerPage, columnFilterValue, endDate, tableFilterValue])

    return (

        <Container className="Transaction_page" >
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>Transaction Details</b></h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
            <div className="container mt-2">
                <div className="row">
                    <span className="mt-2" style={{marginLeft :"10px"}}>FROM : </span>
                    <div className="col col-3">
                        <input value={startDate} className="form-control" onChange={(e) => setStartDate(e.target.value)} type="date" /> {" "}
                    </div>
                    <span className="mt-2">TO : </span>
                    <div className="col col-3">
                        <input value={endDate} className="form-control" onChange={(e) => setEndDate(e.target.value)} type="date" />
                    </div>
                </div>
            </div>
                <Col>
                    <CDataTable
                        items={items}
                        fields={fields}
                        loading={loading}
                        hover
                        cleaner
                        columnFilter={{ external: true }}
                        columnFilterValue={columnFilterValue}
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
                                        <CBadge color={getBadge(item.status || null)}>
                                            {item.status}
                                        </CBadge>
                                    </td>
                                ),
                            'createdAt':
                                (item) => (<td> {moment(item.createdAt || null).format('ll')} </td>),
                            'username':
                                (item) => (<td> {item.user && item.user.username !== null ? item.user.username : "unnamed"} </td>
                                ),
                            'nft':
                                (item) => (<td> {item.nft && item.nft.name !== null ? item.nft.name : "unknown "} </td>
                                ),
                            'walletAddress':
                                (item, idx) => (<td> 
                                        {item.walletAddress.substring(1, 7)}...{item.walletAddress.slice(-6)}
                                    <CopyToClipboard text={item.walletAddress} >
                                        <span>{" "}
                                        <i className={`fad fa-copy ${colorIdxWallet === idx ? 'i_copy' : ''}`} onClick={() => copywalletAddress(idx)} style={{ color: colorIdxWallet === idx ? '#6ad3ab' : 'orange', cursor: "pointer" }}>
                                            </i>
                                        </span>
                                    </CopyToClipboard>
                                </td>
                                ),
                            'transactionHash':
                                (item, idx) => (<td> 
                                    <span style={{color :"#004ca2", cursor :"pointer"}} onClick={() => getPathName(item.networkId, item.transactionHash)}>{item.transactionHash.substring(1, 7)}...{item.transactionHash.slice(-6)}</span>
                                    <CopyToClipboard text={item.transactionHash} >
                                        <span>{" "}
                                            <i className={`fad fa-copy ${colorIdx === idx ? 'i_copy' : ''}`} onClick={() => copyTrx(idx)} style={{ color: colorIdx === idx ? '#6ad3ab' : 'orange', cursor: "pointer" }}/>
                                        </span>
                                    </CopyToClipboard>
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

