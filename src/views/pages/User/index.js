import { CDataTable, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import { ApiService } from 'src/services/api.service';

const ModalForm = React.lazy(() => import('./modal'));


export default function User(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [columnFilterValue, setColumnFilterValue] = useState({});
    const [tableFilterValue, setTableFilterValue] = useState("");
    const [sorterValue, setSorterValue] = useState();

    // onChange Column Filter Value

    const onChangeColumnValue = (e) => {
        if (e.walletAddress){
            setColumnFilterValue(e)
        }
        else {
            setColumnFilterValue({})  
        }
    }

    // table header fields

    const fields = [
        { key: 'username', filter: false },
        { key: 'walletAddress', sorter: false, },
        { key: 'email', sorter: false, filter: false, },
        { key: 'Collection', sorter: false, filter: false },
        { key: 'status', sorter: false, filter: false },
        { key: 'show_actions', sorter: false, filter: false, _style: { width: '14%' } },
    ]

    // getdata function - get the data from api

    const getData = async () => {
        const { getUser } = ApiService
        setLoading(true)
        let data = { page: page, limit: itemsPerPage }
        if (columnFilterValue.walletAddress) { data.filters = { walletAddress: columnFilterValue.walletAddress } }
        if (tableFilterValue) { data.filters = { search: tableFilterValue } }
        let resp = await getUser(data)
        if (resp  && resp.status === "200") {
            setItems(resp.data.users)
            let pages = Math.ceil(resp.data.count / itemsPerPage)
            setPages(pages)
        }
        setLoading(false)
    }


    // update data function - update the data if CRUD operation will performed

    const updateData = () => {
        getData();
    }

    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
        getData()
        //eslint-disable-next-line
    }, [page, itemsPerPage, columnFilterValue, tableFilterValue])

    return (
        <Container className="user_page">
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>User Details</b></h5>
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
                        columnFilter={{ external: true }}
                        columnFilterValue={columnFilterValue}
                        onColumnFilterChange={(e) => onChangeColumnValue(e)}
                        tableFilter={{ external: true }}
                        tableFilterValue={tableFilterValue}
                        onTableFilterChange={setTableFilterValue}
                        sorter
                        sorterValue={sorterValue}
                        onSorterValueChange={setSorterValue}
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
                            'email':
                                (item) => (<td> {item.email || "NA"} </td>
                                ),  
                            'show_actions':
                                (item) => {
                                    return (<td className="py-2">
                                        <ModalForm buttonLabel="Edit" item={item} updateState={updateData} />
                                    </td>
                                    )
                                },
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

