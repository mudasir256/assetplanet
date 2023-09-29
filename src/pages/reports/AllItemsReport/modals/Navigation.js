import React from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button } from 'antd';
import './style.css';

const Navigation = () => {
  return (
    <Row className="all-items-navigation">
      <Button type="primary"><Link to="/asset_item_report">Asset Items Report</Link></Button>
      <Button type="primary"><Link to="/income_and_taxes">Income and Taxes</Link></Button>
      <Button type="primary"><Link to="/insurance_payout">Insurance Payout</Link></Button>
      <Button type="primary"><Link to="/budget_and_goals">Budget and Goals</Link></Button>
      <Button type="primary"><Link to="/liabilities_items_report">Liabilities</Link></Button>
    </Row>
  );
}

export default Navigation;
