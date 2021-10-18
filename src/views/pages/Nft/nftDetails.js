import { CBadge } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from "reactstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { HOME_ROUTE } from 'src/constants/env.constant';
import { ApiService } from 'src/services/api.service';
import { GlobalVariables } from 'src/constants/globalVariables.constant';

export default function NftDetails(props) {
    const [items, setItems] = useState({});
    const { id } = useParams();
    const { networks } = GlobalVariables
    const [colorIdxWallet, setcolorIdxWallet] = useState(null);
    const [colorOwner, setcolorOwner] = useState(null)



    const copyOwner = (idx) => {
        setcolorOwner(idx);
        setcolorIdxWallet(null);
    }

    const copywalletAddress = (idx) => {
        setcolorIdxWallet(idx);
        setcolorOwner(null);
    }

    // getdata - get the data from api

    const getPathName = async (id, trx) => {
        let network = await networks(id)
        window.open(`${network}/${trx}`, "_blank") || window.location.replace(`${network}/${trx}`);
    }

    const getData = async () => {
        const { getNftDetails } = ApiService
        let paramid = await id;
        let resp = await getNftDetails(paramid)
        if (resp && resp.status === "200") {
            setItems(resp.data)
        }
        else {
            window.location.assign(`${HOME_ROUTE}/nft`)
        }
    }

    // get badge function

    const getBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return 'success'
            case 'PROCESSING': return 'warning'
            case 'FAILED': return 'danger'
            default: return 'primary'
        }
    }

    // useEffect function -  is invoked immediately after a component is mounted (inserted into the tree).

    useEffect(() => {
        getData()
        //eslint-disable-next-line
    }, [])

    return (
        <Container >
            <Row>
                <Col>
                    <div className="d-flex bg-header border">
                        <div className="p-2 flex-grow-1">
                            <h5><b>Nft Details</b></h5>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Table bordered style={{ margin: "0 16px 0px 16px" }}>
                    <thead>
                        <tr >
                            <th>Name</th>
                            <th>{items.name || "NA"}</th>
                        </tr>

                        <tr>
                            <th>Nft Address</th>
                            <th>{items.nftAddress || "NA"}</th>
                        </tr>

                        <tr>
                            <th>Transaction Hash</th>
                            <th>
                                {items.transactionHash ?
                                    <span style={{ color: "#004ca2", cursor: "pointer" }} onClick={() => getPathName(items.networkId, items.transactionHash)}>{items.transactionHash}
                                    </span>
                                    : 'NA'}
                            </th>
                        </tr>

                        <tr>
                            <th>Creator</th>
                            <th>{items.creator && items.creator.username !== null ? items.creator.username : "Unnamed"}{" "}
                                <span style={{ color: "#1676ff" }}>
                                    {items.creator && items.creator.walletAddress ? items.creator.walletAddress : "Unnamed"}
                                    <CopyToClipboard text={items.creator && items.creator.walletAddress ? items.creator.walletAddress : ""} >
                                        <span onClick={() => copywalletAddress(items.creator.walletAddress)}>{" "}
                                            <i className={`fad fa-copy ${items.creator && items.creator.walletAddress === colorIdxWallet ? 'i_copy' : ''}`} style={{ color: items.creator && items.creator.walletAddress === colorIdxWallet ? '#6ad3ab' : 'orange', cursor: "pointer" }}></i></span>
                                    </CopyToClipboard>
                                </span>
                            </th>
                        </tr>

                        <tr>
                            <th>Owner</th>
                            <th>{items.owner && items.owner.username !== null ? items.owner.username : "Unnamed"} {" "}
                                <span style={{ color: "#1676ff" }}>
                                    {items.owner && items.owner.walletAddress ? items.owner.walletAddress : "Unnamed"}
                                    <CopyToClipboard text={items.owner && items.owner.walletAddress ? items.owner.walletAddress : ""} >
                                        <span onClick={() => copyOwner(items.owner.walletAddress)}>{" "}
                                            <i className={`fad fa-copy ${items.owner && items.owner.walletAddress === colorOwner ? 'i_copy' : ''}`} style={{ color: items.owner && items.owner.walletAddress === colorOwner ? '#6ad3ab' : 'orange', cursor: "pointer" }}></i>
                                        </span>
                                    </CopyToClipboard>
                                </span>
                            </th>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <th>{items.description || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>File Type</th>
                            <th>{items.fileType || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>External Link</th>
                            <th>{items.externalLink || "NA"}</th>
                        </tr>

                        <tr>
                            <th>Created At</th>
                            <th>{moment(items.createdAt).format('ll') || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>Supply</th>
                            <th>{items.supply || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>Royality</th>
                            <th>{items.royality || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>Network Id</th>
                            <th>{items.networkId || 'NA'}</th>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <th>
                                <CBadge color={getBadge(items.status)}>
                                    {items.status || 'unknown'}
                                </CBadge>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Row>
        </Container >
    )
}

