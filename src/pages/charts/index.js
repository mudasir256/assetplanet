import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import PageTitle from '../../components/layout/PageTitle';

class ClientInfo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };

        const barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
        };

        const pieData = {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };

        return (
            <React.Fragment>                
                <div className="pageWrapper">
                    <PageTitle title="Charts" />
                    <Row gutter={[40, 16]}>
                        <Col span={12}>
                            <Doughnut data={data} />
                        </Col>
                        <Col span={12}>
                            <Pie data={pieData} />
                        </Col>
                        <Col span={24}>
                            <Bar
                                data={barData}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(ClientInfo);