import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
    // CDropdownMenu,
    // CDropdownItem,
  CDropdownToggle
} from '@coreui/react';
import ChartLineSimple from '../charts/ChartLineSimple';
import ChartBarSimple from '../charts/ChartBarSimple';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from 'src/constants/env.constant';
import { ApiService } from 'src/services/api.service';
import { Spinner } from 'reactstrap';

const WidgetsDropdown = () => {
  // render
  const [collection, setCollection] = useState(0)
  const [transactions, setTransactions] = useState(0)
  const [nft, setNft] = useState(0)
  const [category, setCategory] = useState(0)
  const [loading, setloading] = useState(false)


  const getData = async() => {
    const { getCollection , getTransaction , getNft , getCategory} = ApiService;
        let data = {page: 1, limit: 10}
        setloading(true)
        let respColl = await getCollection(data);
        let respTrans = await getTransaction(data)
        let respNft = await getNft(data)
        let respCat = await getCategory()
        if (respColl  && respColl.status === "200") {
          setCollection(respColl.data.count);
        }
        if (respTrans  && respTrans.status === "200") {
          setTransactions(respTrans.data.count);
        }
        if (respNft  && respNft.status === "200") {
          setNft(respNft.data.count);
        }
        if (respCat  && respCat.status === "200") {
          setCategory(respCat.data.length);
        }
        setloading(false)
      }

  useEffect(() => {
    getData();
  }, [])


  return (
    <CRow>
      <CCol sm="6" lg="3">
      <Link to={{pathname  : `${HOME_ROUTE}/transaction`}} >
        <CWidgetDropdown
          color="gradient-primary"
          header={ loading ? <Spinner size="sm"  color="light" /> : transactions}
          text="Transactions"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Transactions"
              labels="months"
            />
          }
        >
          <CDropdown>
          <i className="fas fa-comments-alt-dollar"></i>
          {/* <CIcon name="cil-settings"/> */}
            {/* <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle> */}
            {/* <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu> */}
          </CDropdown>
        </CWidgetDropdown>
        </Link>
      </CCol>

      <CCol sm="6" lg="3">
      <Link to={{pathname  : `${HOME_ROUTE}/nft`}} >
        <CWidgetDropdown
          color="gradient-info"
          header={ loading ? <Spinner size="sm" color="light" /> :  nft}
          text="Non-fungible Token"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="nft"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              {/* <CIcon name="cil-location-pin"/> */}
              <i className="far fa-coin"></i>
            </CDropdownToggle>
          </CDropdown>
        </CWidgetDropdown>
      </Link>
      </CCol>

      <CCol sm="6" lg="3">
      <Link to={{pathname  : `${HOME_ROUTE}/collection`}} >
        <CWidgetDropdown
          color="gradient-warning"
          header={loading ? <Spinner size="sm" color="light" /> :  collection}
          text="Collections"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Collections"
              labels="months"
            />
          }
        >
          <CDropdown>
          <i className="fad fa-cabinet-filing"></i>
          </CDropdown>
        </CWidgetDropdown>
      </Link>
      </CCol>

      <CCol sm="6" lg="3" className="csr">
        <Link to={{pathname  : `${HOME_ROUTE}/category`}} >
        <CWidgetDropdown
          color="gradient-danger"
          header={  loading ? <Spinner size="sm" color="light" /> :  category}
          text="Category"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Category"
              labels="months"
            />
          }
        >
          <CDropdown>
          <i className="far fa-album-collection"></i>
          </CDropdown>
        </CWidgetDropdown>
        </Link>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
