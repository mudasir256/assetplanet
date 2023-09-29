import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import PageTitle from 'components/layout/PageTitle';
import { Pie } from 'react-chartjs-2';

const formID = 'SummaryPagePrivateEducation';
class SummaryPagePrivateEducation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const investmentsData = {
      labels: [
        'Friends and Family    $5,000',
        'Contribution / Saving $4,500',
        'Fedral Student Loan   $1,200',
        'Private Student Loan    $500',
        'Scholarships              $1,300',
        'Grants                      $2,000',
        'Personal Loan           $5,000',
        'HELOC                  $15,000',
        'Work Study              $4,500',
      ],
      datasets: [
        {
          data: [5000, 4500, 1200, 500, 1300, 2000, 5000, 15000, 4500],
          backgroundColor: [
            '#3364FF',
            '#FF8A33',
            '#87998F',
            '#FBF83A',
            '#3AFBF5',
            '#66FB3A',
            '#3A4CFB',
            '#40360C',
            '#816E23',
          ],
          // hoverBackgroundColor: ['blue', ''],
        },
      ],
    };

    return (
      <React.Fragment>
        <PageTitle title='Summary Page' />
        <Row
          type='flex'
          justify='center'
          gutter={[20, 0]}
          style={{ margin: '30px 0 40px' }}
        >
          <Col span={7}>
            <PageTitle title='Education Saving Planner' level={4} />
            <Pie data={investmentsData} height={700} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect()(SummaryPagePrivateEducation);
