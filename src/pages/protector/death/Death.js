import React, { Component } from 'react';
import { Button } from 'antd';
import DEATH_API from "../../../apis/death.api";
import BreadCrumb from '../../../components/BreadCrumb';
import Loader from "../../../components/styled-components/loader/loader";

class Death extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeathStatus: null,
      isLoading: false,
    };
    console.log("death ....props", props)
  }
  componentDidMount() {
    try {

      (async () => {
        this.setState({ isLoading: true })
        const data = await DEATH_API.getDeathStatus();
        console.log("data in death status",data);
        if(data){
        this.setState({DeathStatus:data.clientStatus})
        }
        this.setState({ isLoading: false })
      })()
    } catch (error) {
      // this.props.handleLoader()
      console.group(error)
    }
  }

  render() {
    const userRole = JSON.parse(localStorage.getItem("role"))

    return (
      <React.Fragment>
        <div style={{
          marginTop: '40px'
        }}></div>
        {/* <BreadCrumb /> */}
        <div className='top-btns-container'>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/death/create')}
          >
            Add Death
          </Button>

          <div>
            {this.state.DeathStatus==="PARTIAL_DEATH" && userRole !== "trustee" ?
              <Button
                type='primary'
                onClick={async () => {
                  console.log("Api hit....i'm dead");
                  // this.props.history.push('/death/create')
                  try {
                    // this.props.handleLoader()
                    let api_res = await DEATH_API.revertDeath();
                    // this.props.handleLoader()
                    return api_res;
                  } catch (error) {
                    console.log(error);
                    throw new Error(error);
                  }
                }}
              >
                Revert
              </Button>
              : ""
            }
          </div>
          {this.state.DeathStatus==="ALIVE" && userRole==="trustee" ?

            <div>
              <Button
                type='primary'
                onClick={async () => {
                  console.log("Api hit....i'm dead");
                  // this.props.history.push('/death/create')
                  try {
                    // this.props.handleLoader()
                    let api_res = await DEATH_API.confirmDeath();
                    // this.props.handleLoader()
                    return api_res;
                  } catch (error) {
                    console.log(error);
                    throw new Error(error);
                  }
                }}
              >
                I'm Dead
              </Button>
            </div>
            : ""
          }
          <Loader isLoading={this.state.isLoading}></Loader>
        </div>
      </React.Fragment>
    );
  }
}

export default Death;
