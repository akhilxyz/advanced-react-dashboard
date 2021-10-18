import React, { useEffect, useState } from 'react'
import { Container, Row, Col} from "reactstrap";
import { ApiService } from 'src/services/api.service';

const ModalForm = React.lazy(() => import('./modal'));
const Table = React.lazy(() => import('./table'));

export default function Category() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // getdata function - get the data from api

    const getData = async () => {
        const { getCategory } = ApiService
        setLoading(true)
        let resp = await getCategory()
        if (resp && resp.status === "200") {
            setItems(resp.data)
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
        // eslint-disable-next-line
    }, [])

    return (
        <Container className="category_page">
            <div>
                <Row>
                    <Col>
                        <div className="d-flex bg-header border">
                            <div className="p-2 flex-grow-1">
                                <h5><b>Category Details</b></h5>
                            </div>
                            <div className="p-2">
                                <ModalForm
                                    items={items}
                                    updateState={updateData}
                                    buttonLabel="Add Item"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col >
                    <Table
                        loading={loading}
                        items={items}
                        updateState={updateData}
                    />
                </Col>
            </Row>
        </Container>
    )
}

