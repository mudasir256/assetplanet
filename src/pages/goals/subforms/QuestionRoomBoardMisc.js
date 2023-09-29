import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionRoomBoardMisc';
class QuestionRoomBoardMisc extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Are you getting Financial Assistance?',
      fields: [
        {
          id: 'isFinancialAssistance',
          title: '',
          value: data['value'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        isFinancialAssistance: '',
      },
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
  }


  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        isFinancialAssistance: value,
      },
    });

    let formData = QuestionRoomBoardMisc.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    if (value == 'Yes') {
      this.props.cbGoSubForm('AssistanceReceivedSubForm');
    } else {
      this.props.cbGoSubForm('QuestionAssignAssetSubForm');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Do you anticipate Room, Board and/or Other Costs?
              </h2>
            </Col>
            <Col
              span={12}
              className='d-flex align-items-center justify-content-end'
            >
              <Button
                className='pl-4 pr-4 mr-5'
                type='primary'
                size={'large'}
                onClick={
                  () => {
                    this.props.changeFormState();
                  }
                  //   this.handleFormInputChange('isFinancialAssistance', 'Yes')
                }
              >
                Yes
              </Button>
            </Col>
            <Col span={12}>
              <Button
                className='pl-4 pr-4'
                type='primary'
                size={'large'}
                onClick={() => {
                  this.props.goNextForm('FundingSourcesForm')
                  // this.moveToNextForm();
                  // this.props.dynamicFormsMoveNext('RoomBoardMiscSubForm');
                }}
                // onClick={() =>
                //   this.handleFormInputChange('isFinancialAssistance', 'No')
                // }
              >
                No
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(QuestionRoomBoardMisc);
