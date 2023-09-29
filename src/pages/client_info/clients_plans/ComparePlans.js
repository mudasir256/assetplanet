import React, {useEffect, useState} from 'react';
import { Row, Col} from 'antd';
import 'antd/dist/antd.css';
import ComparePlansSubForm from './subforms/ComparePlansSubForm.js';
import ComparePlansResults from './ComparePlansResults.js'
import { StyledComparePlans } from "../../../components/new-styled-components/ComparePlansStyling.js"

const ClientInformationTable = () =>  {
  const [state, setState] = React.useState({
    loading: true,
  })



  const fetchData = () => {
    fetch(`http://localhost:3100/mockData/allClients.json`, {
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
      .then((res) => res.json())
      .then(results => {
        console.log(results)
        setState({...state, loading: false});
      });
  };

  useEffect(() => {
    // fetchData();
    setState({...state, loading: false});
  }, []);


  useEffect(() => {
    // return ()
  }, [])


  return (
    <>
      <StyledComparePlans>
        <Row>
          <Col>
            <Row type="flex" justify="center">
              <Col span={23}>
                <ComparePlansSubForm />
                <ComparePlansResults />
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledComparePlans>
    </>
  )
}


export default ClientInformationTable;