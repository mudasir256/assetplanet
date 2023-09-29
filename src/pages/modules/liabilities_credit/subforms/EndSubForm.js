import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";
import FETCH from "../../../../utils/fetch";
import { useHistory } from "react-router-dom";

import { Button } from 'antd';

const formID = 'EndSubForm';
class EndSubForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            liabilities_credit: [],
          };
      
        this.goList = this.goList.bind(this);
    }

    goList() {
        // let data = {
        //     clientModules: [this.props.CompletedSteps],
        // };
        // let selectedCollectionName = this.props.selectedCollection;

        // console.log("payload to api", this.props.CompletedSteps);
        // console.log("selectedCollectionName", selectedCollectionName);
        // try {
        //     (async () => {

        //         let datares = await FETCH.post({
        //             url: `/client-module?module=${selectedCollectionName}`,
        //             body: data,
        //         });
        //         console.log("datares on api hit", datares);

        //     })()
        // } catch (error) {
        //     console.log(error)
        //     this.setState({
        //         loading: false,
        //     });
        // }
        try {
            (async () => {
              this.setState({
                loading: true,
              });
              let datares = await FETCH.post({
                url: "client-module/list",
                id: `?module=Liabilities and Credit&page=1&limit=100`,
                body: {},
              });
              this.setState({
                loading: false,
              });
              // console.log("Account Asset and libalities...",data.records)
              if (datares && datares.records) {
                this.setState({
                  liabilities_credit:
                    datares.records.map(item => {
                      return {
                        ...item,
                        LiabilityName: item['Nickname of Liabilities'],
                        InitialLoan: item['Initial Loan Amount'],
                        MonthlyPayment: item['Monthly Payment'],
                        MaturityDate: item['Maturity Date']
                      }
                    })
                })
              }
      
            })()
          } catch (error) {
            console.log(error)
            this.setState({
              loading: false,
            });
          }
        //   this.props.history.push("/liabilities_credit");
        window.location.href = "liabilities_credit";
    }
    componentDidMount() {
        console.log("end to post data", this.props.CompletedSteps)
    }
    render() {

        return (
            <React.Fragment>
                <div className="info-form-block d-flex align-items-center justify-content-center">
                    <h2>Your Data has been Saved!</h2>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Button className="pl-4 pr-4" size="large" type="primary" onClick={() => {
                        this.goList(); console.log("Onclick", this.props.CompletedSteps);

                        let data = {
                            clientModules: [this.props.CompletedSteps],
                        };
                        let selectedCollectionName = this.props.selectedCollection;
                
                        console.log("payload to api", this.props.CompletedSteps);
                        console.log("selectedCollectionName", selectedCollectionName);
                        try {
                            (async () => {
                
                                let datares = await FETCH.post({
                                    url: `client-module?module=${selectedCollectionName}`,
                                    body: data,
                                });
                                console.log("datares on api hit", datares);
                
                            })()
                        } catch (error) {
                            console.log(error)
                            this.setState({
                                loading: false,
                            });
                        }


                    }}>OK</Button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.rootReducer.loginUser.loginUserData,
    CompletedSteps: state.rootReducer.loginUser.CompletedSteps,
    selectedCollection: state.rootReducer.loginUser.selectedCollection,

});
const mapDispatchToProps = { postStepsFields, postCompletedSteps };

export default connect(mapStateToProps, mapDispatchToProps)(EndSubForm);