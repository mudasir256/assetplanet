import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  QL_CLIENT_ADD,
  QL_CLIENT_UPDATE,
  QL_CLIENT_GET,
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import ClientSpouseInformationSubForm from './subforms/ClientSpouseInformationSubForm';
import DependentsSubForm from './subforms/DependentsSubForm';
import ClientInformationSubForm from './subforms/ClientInformationSubForm';
import SpouseInformationSubForm from './subforms/SpouseInformationSubForm';
import TrustInformationSubForm from './subforms/TrustInformationSubForm';
import CorporateInformationSubForm from './subforms/CorporateInformationSubForm';
import CharityInformationSubForm from './subforms/CharityInformationSubForm';
import OthersImpactedSubForm from './subforms/OthersImpactedSubForm';
import ProfessionalContactsSubForm from './subforms/ProfessionalContactsSubForm';
import MyDetailsInformationSubForm from './subforms/MyDetailsInformationSubForm';
import QuestionSpousePartnerHasSubForm from './subforms/QuestionSpousePartnerHasSubForm';
import QuestionDependentSubForm from './subforms/QuestionDependentSubForm';
import QuestionTrustSubForm from './subforms/QuestionTrustSubForm';
import QuestionCorporationSubForm from './subforms/QuestionCorporationSubForm';
import QuestionCharitySubForm from './subforms/QuestionCharitySubForm';
import QuestionFinanciallyOthersSubForm from './subforms/QuestionFinanciallyOthersSubForm';
import EndSubForm from './subforms/EndSubForm';
import { setClientInfoObject } from '../../../redux/slices/clientInfoSlice';
import ClientInfoSideDisplay from './operations/ClientInfoSideDisplay';

var fnMutationClientAdd = null;
var dataMutationClientAdd = null;

var fnMutationClientUpdate = null;
var dataMutationClientUpdate = null;
let prevPos = 0;

function HiddenHook() {
  [fnMutationClientAdd, { dataMutationClientAdd }] = useMutation(QL_CLIENT_ADD);
  [fnMutationClientUpdate, { dataMutationClientUpdate }] = useMutation(
    QL_CLIENT_UPDATE
  );

  return <React.Fragment></React.Fragment>;
}



function convertDB2FormData(data) {
  console.log('readDataaaaaaaaaaaaaaaaa:', data);


  // this.props.dispatch(this.props.handleClientInfoObject(data))
  let formData = [];

  formData.push({
    id: 'ClientSpouseInformationSubForm',
    data: ClientSpouseInformationSubForm.FnCreateFormData({
      clientFirstName: data['client']['firstName'],
      clientLastName: data['client']['lastName'],
      spouseFirstName: data['client']['spouse']['firstName'],
      spouseLastName: data['client']['spouse']['lastName'],
    }),
    visible: true,
  });

  formData.push({
    id: 'DependentsSubForm',
    data: {
      title: 'Include your children and any other dependents',
      data: data['client']['dependents'],
    },
    visible: false,
  });

  formData.push({
    id: 'ClientInformationSubForm',
    data: ClientInformationSubForm.FnCreateFormData({
      clientBirthdate: data['client']['birthdate'],
      clientEstimatedDeathAge: data['client']['estimatedDeathAge'],
      clientPrimaryContactNumber: data['client']['primaryContactNumber'],
      clientSecondaryContactNumber: data['client']['secondaryContactNumber'],
      clientWorkContactNumber: data['client']['workContactNumber'],
      clientEmailAddress: data['client']['emailAddress'],
      clientSecondaryEmailAddress: data['client']['secondaryEmailAddress'],
      clientGender: data['client']['gender'],
      clientInvestmentKnowledge: data['client']['investmentKnowledge'],
      clientRetirementDate: data['client']['retirementDate'],
      clientNotes: data['client']['notes'],

      clientAddressFirstLine: data['client']['address']['firstLine'],
      clientAddressSecondLine: data['client']['secondLine'],
      clientAddressCity: data['client']['address']['city'],
      clientAddressPostalCode: data['client']['address']['postalCode'],
      clientAddressCountry: data['client']['address']['country'],
      clientAddressState: data['client']['address']['state'],
    }),
    visible: true,
  });
  formData.push({
    id: 'SpouseInformationSubForm',
    data: SpouseInformationSubForm.FnCreateFormData({
      spouseBirthdate: data['client']['spouse']['birthdate'],
      spouseEstimatedDeathAge: data['client']['spouse']['estimatedDeathAge'],
      spouseEmailAddress: data['client']['spouse']['emailAddress'],
      spouseSecondaryEmailAddress:
        data['client']['spouse']['secondaryEmailAddress'],
      spouseGender: data['client']['spouse']['gender'],
      spousePrimaryContactNumber:
        data['client']['spouse']['primaryContactNumber'],
      spouseSecondaryContactNumber:
        data['client']['spouse']['secondaryContactNumber'],
      spouseWorkContactNumber: data['client']['spouse']['workContactNumber'],
      spouseInvestmentKnowledge:
        data['client']['spouse']['investmentKnowledge'],
      spouseRetirementDate: data['client']['spouse']['retirementDate'],
    }),
    visible: true,
  });

  formData.push({
    id: 'TrustInformationSubForm',
    data: {
      title: 'Trust Information',
      data: data['client']['trusts'],
    },
    visible: false,
  });

  formData.push({
    id: 'CorporateInformationSubForm',
    data: {
      title: 'Coporate Information',
      data: data['client']['corporates'],
    },
    visible: false,
  });

  formData.push({
    id: 'CharityInformationSubForm',
    data: {
      title: 'Charity Information',
      data: data['client']['charities'],
    },
    visible: false,
  });

  formData.push({
    id: 'OthersImpactedSubForm',
    data: {
      title: 'Others Financially Impacted',
      data: data['client']['financiallyImpacteds'],
    },
    visible: false,
  });

  formData.push({
    id: 'ProfessionalContactsSubForm',
    data: {
      title: 'Professional Contacts',
      data: data['client']['professionalContacts'],
    },
    visible: false,
  });

  return formData;
}

function LoadDBDataHook(props) {
  if (props.dbID != null && props.dbID != '') {
    const { data, loading, error } = useQuery(QL_CLIENT_GET, {
      variables: { id: props.dbID },
    });
    if (data) {
      console.log('call..');
      props.cbLoadDBData(convertDB2FormData(data));
    }
  }

  return <React.Fragment></React.Fragment>;
}

class ClientNew extends Component {
  constructor(props) {
    super(props);

    let dbID = null;
    let dbLoaded = true;

    const { incomeID } = this.props.match.params;

    if (incomeID) {
      dbID = incomeID;
      dbLoaded = false;
    }

    this.state = {
      dataID: dbID,
      curSubFormID: 'ClientInformationSubForm',
      curSubForm: ClientInformationSubForm,
      formVisible: false,
      subFormData: {},
      formData: [
        // {
        //     id: 'assetsInformation',
        //     data: {
        //         title: '',
        //         fields: [
        //             {
        //                 id: '' ,
        //                 title: '',
        //                 value: ''
        //              }
        //         ]
        //     }
        // }
      ],
      formSteps: [
        {
          id: 'ClientInformationSubForm',
          icon: 'icon_ex.png',
          title: 'Client Information',
        },
        // {
        //     id: 'MyDetailsInformationSubForm',
        //     icon: 'icon_ex.png',
        //     title: 'Client Details'
        // },
        {
          id: 'QuestionSpousePartnerHasSubForm',
          icon: 'icon_ex.png',
          title: 'Spouse / Partner Information',
        },
        {
          id: 'QuestionDependentSubForm',
          icon: 'icon_ex.png',
          title: 'Dependents',
        },
        {
          id: 'QuestionTrustSubForm',
          icon: 'icon_ex.png',
          title: 'Trust',
        },
        {
          id: 'QuestionCorporationSubForm',
          icon: 'icon_ex.png',
          title: 'Corporate',
        },
        {
          id: 'QuestionCharitySubForm',
          icon: 'icon_ex.png',
          title: 'Charity',
        },
        {
          id: 'QuestionFinanciallyOthersSubForm',
          icon: 'icon_ex.png',
          title: 'Others Financially Impacted',
        },
      ],
      dbLoaded: dbLoaded,
      dbID: dbID,
      isEndForm: false
    };

    this.goSubForm = this.goSubForm.bind(this);
    this.updateSubForm = this.updateSubForm.bind(this);
    this.getSubFormData = this.getSubFormData.bind(this);
    this.getSubFormField = this.getSubFormField.bind(this);

    this.createQLVariable = this.createQLVariable.bind(this);
    this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

    this.toggleRightSide = this.toggleRightSide.bind(this);

    this.loadDBData = this.loadDBData.bind(this);
  }

  componentDidMount() {
    this.goSubForm('ClientInformationSubForm');
    // this.goSubForm("ProfessionalContactsSubForm");
  }

  getSubFormField(formID, fieldID) {
    let formData = this.state.formData;

    for (var index = 0; index < formData.length; index++) {
      if (formData[index]['id'] == formID) {
        let data = formData[index]['data'];
        let fields = data['fields'];
        for (var findex = 0; findex < fields.length; findex++) {
          if (fields[findex]['id'] == fieldID) {
            return fields[findex];
          }
        }
      }
    }

    return null;
  }

  getSubFormFieldValue(formID, fieldID) {
    let field = this.getSubFormField(formID, fieldID);

    if (field == null) {
      return '';
    } else {
      return field.value;
    }
  }

  createQLVariable(subFormID, subFormData) {
    let varQL = null;

    switch (subFormID) {
      case 'MyDetailsInformationSubForm':
        break;
      case 'ClientSpouseInformationSubForm':
        varQL = {
          client: {
            firstName: this.getSubFormFieldValue(subFormID, 'clientFirstName'),
            lastName: this.getSubFormFieldValue(subFormID, 'clientLastName'),
          },
          spouse: {
            firstName: this.getSubFormFieldValue(subFormID, 'spouseFirstName'),
            lastName: this.getSubFormFieldValue(subFormID, 'spouseLastName'),
          },
        };
        break;
      case 'DependentsSubForm':
        varQL = {
          dependents: subFormData,
        };
        break;
      case 'ClientInformationSubForm':
        varQL = {
          client: {
            birthdate: this.getSubFormFieldValue(subFormID, 'clientBirthdate'),
            estimatedDeathAge:
              this.getSubFormFieldValue(subFormID, 'clientEstimatedDeathAge') !=
              ''
                ? parseInt(
                    this.getSubFormFieldValue(
                      subFormID,
                      'clientEstimatedDeathAge'
                    )
                  )
                : 0,
            // "": this.getSubFormFieldValue(subFormID, 'clientCurrentAge'),
            primaryContactNumber: this.getSubFormFieldValue(
              subFormID,
              'clientPrimaryContactNumber'
            ),
            secondaryContactNumber: this.getSubFormFieldValue(
              subFormID,
              'clientSecondaryContactNumber'
            ),
            workContactNumber: this.getSubFormFieldValue(
              subFormID,
              'clientWorkContactNumber'
            ),
            emailAddress: this.getSubFormFieldValue(
              subFormID,
              'clientEmailAddress'
            ),
            secondaryEmailAddress: this.getSubFormFieldValue(
              subFormID,
              'clientSecondaryEmailAddress'
            ),
            gender: this.getSubFormFieldValue(subFormID, 'clientGender'),
            investmentKnowledge: this.getSubFormFieldValue(
              subFormID,
              'clientInvestmentKnowledge'
            ),
            retirementDate: this.getSubFormFieldValue(
              subFormID,
              'clientRetirementDate'
            ),
            notes: this.getSubFormFieldValue(subFormID, 'clientNotes'),
          },
          address: {
            firstLine: this.getSubFormFieldValue(
              subFormID,
              'clientAddressFirstLine'
            ),
            secondLine: this.getSubFormFieldValue(
              subFormID,
              'clientAddressSecondLine'
            ),
            city: this.getSubFormFieldValue(subFormID, 'clientAddressCity'),
            postalCode: this.getSubFormFieldValue(
              subFormID,
              'clientAddressPostalCode'
            ),
            country: this.getSubFormFieldValue(
              subFormID,
              'clientAddressCountry'
            ),
            state: this.getSubFormFieldValue(subFormID, 'clientAddressState'),
          },
        };
        break;
      case 'SpouseInformationSubForm':
        varQL = {
          spouse: {
            birthdate: this.getSubFormFieldValue(subFormID, 'spouseBirthdate'),
            estimatedDeathAge:
              this.getSubFormFieldValue(subFormID, 'spouseEstimatedDeathAge') !=
              ''
                ? parseInt(
                    this.getSubFormFieldValue(
                      subFormID,
                      'spouseEstimatedDeathAge'
                    )
                  )
                : 0,
            // "": this.getSubFormFieldValue(subFormID, 'spouseCurrentAge'),
            emailAddress: this.getSubFormFieldValue(
              subFormID,
              'spouseEmailAddress'
            ),
            secondaryEmailAddress: this.getSubFormFieldValue(
              subFormID,
              'spouseSecondaryEmailAddress'
            ),
            gender: this.getSubFormFieldValue(subFormID, 'spouseGender'),
            primaryContactNumber: this.getSubFormFieldValue(
              subFormID,
              'spousePrimaryContactNumber'
            ),
            secondaryContactNumber: this.getSubFormFieldValue(
              subFormID,
              'spouseSecondaryContactNumber'
            ),
            workContactNumber: this.getSubFormFieldValue(
              subFormID,
              'spouseWorkContactNumber'
            ),
            investmentKnowledge: this.getSubFormFieldValue(
              subFormID,
              'spouseInvestmentKnowledge'
            ),
            retirementDate: this.getSubFormFieldValue(
              subFormID,
              'spouseRetirementDate'
            ),
          },
        };
        break;
      case 'TrustInformationSubForm':
        varQL = {
          trusts: subFormData,
        };
        break;
      case 'CorporateInformationSubForm':
        varQL = {
          corporates: subFormData,
        };
        break;
      case 'CharityInformationSubForm':
        varQL = {
          charities: subFormData,
        };
        break;
      case 'OthersImpactedSubForm':
        varQL = {
          financiallyImpacteds: subFormData,
        };
        break;
      case 'ProfessionalContactsSubForm':
        varQL = {
          professionalContacts: subFormData,
        };
        break;
      case 'EndSubForm':
    }

    return varQL;
  }

  updateSubForm(subFormID, subFormData, visible = true) {
    let formData = this.state.formData;

    var bFound = false;
    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]['id'] == subFormID) {
        formData[findex]['data'] = subFormData;
        bFound = true;
      }
    }

    if (!bFound) {
      formData.push({
        id: subFormID,
        data: subFormData,
        visible: visible,
      });
    }

    let varQL = this.createQLVariable(subFormID, subFormData);

    console.log('varQL:', varQL, ', dataID:', this.state.dataID);

    var instance = this;
    if (varQL != null) {
      if (this.state.dataID == null) {
        fnMutationClientAdd({ variables: { data: varQL } }).then((response) => {
          instance.setState({
            dataID: response['data']['createClient']['id'],
          });
        });
      } else {
        fnMutationClientUpdate({
          variables: { id: this.state.dataID, data: varQL },
        });
      }
    }

    this.setState({
      formData: formData,
    });
  }

  getSubFormData(subFormID, fromState = true, pformData) {
    let formData;
    if (fromState) {
      formData = this.state.formData;
    } else {
      formData = pformData;
    }

    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]['id'] == subFormID) {
        return formData[findex]['data'];
      }
    }

    return {};
  }

  goSubForm(subFormID) {
    this.setState({
      formVisible: false,
    });

    let nextSubForm = ClientSpouseInformationSubForm;
    let subFormData = this.getSubFormData(subFormID);

    switch (subFormID) {
      case 'ClientSpouseInformationSubForm':
        nextSubForm = ClientSpouseInformationSubForm;
        break;
      case 'ClientInformationSubForm':
        nextSubForm = ClientInformationSubForm;
        break;
      case 'SpouseInformationSubForm':
        nextSubForm = SpouseInformationSubForm;
        break;
      case 'DependentsSubForm':
        nextSubForm = DependentsSubForm;
        break;
      case 'TrustInformationSubForm':
        nextSubForm = TrustInformationSubForm;
        break;
      case 'CorporateInformationSubForm':
        nextSubForm = CorporateInformationSubForm;
        break;
      case 'CharityInformationSubForm':
        nextSubForm = CharityInformationSubForm;
        break;
      case 'OthersImpactedSubForm':
        nextSubForm = OthersImpactedSubForm;
        break;
      case 'ProfessionalContactsSubForm':
        nextSubForm = ProfessionalContactsSubForm;
        break;
      case 'MyDetailsInformationSubForm':
        nextSubForm = MyDetailsInformationSubForm;
        break;
      case 'QuestionSpousePartnerHasSubForm':
        nextSubForm = QuestionSpousePartnerHasSubForm;
        break;
      case 'QuestionDependentSubForm':
        nextSubForm = QuestionDependentSubForm;
        break;
      case 'QuestionTrustSubForm':
        nextSubForm = QuestionTrustSubForm;
        break;
      case 'QuestionCorporationSubForm':
        nextSubForm = QuestionCorporationSubForm;
        break;
      case 'QuestionCharitySubForm':
        nextSubForm = QuestionCharitySubForm;
        break;
      case 'QuestionFinanciallyOthersSubForm':
        nextSubForm = QuestionFinanciallyOthersSubForm;
        break;
      case 'EndSubForm':
        nextSubForm = EndSubForm;
        this.setState({isEndForm: true})
        break;
    }

    setTimeout(() => {
      this.setState({
        formVisible: true,
        curSubFormID: subFormID,
        curSubForm: nextSubForm,
        subFormData: subFormData,
      });
    }, 100);
  }

  toggleRightSide = (e) => {
    e.preventDefault();
    this.setState({ isRightSideOpen: !this.state.isRightSideOpen });
  };

  loadDBData(formData) {
    console.log('formData:', formData);

    var instance = this;
    setTimeout(function () {
      instance.setState({
        formVisible: true,
        dbLoaded: true,
        formData: formData,
        subFormData: instance.getSubFormData(
          instance.state.curSubFormID,
          false,
          formData
        ),
      });
    }, 100);
  }

  render() {
    const navlinks = [
      {
        href: '/',
        title: 'Home',
      },
      {
        href: '/modules',
        title: 'Modules',
      },
      {
        href: '/clients/plans', //new='/clients/plans' old='/clients_plans'
        title: 'Client and Plans',
      },
    ];

    let SubForm = this.state.curSubForm;

    let formpageClassName = 'form-page-container-wrap';
    if (this.state.isRightSideOpen) {
      formpageClassName = 'form-page-container-wrap right-side--opend';
    } else {
      formpageClassName = 'form-page-container-wrap right-side--collapsed';
    }
    return (
      <div className={formpageClassName}>
        <div className='form-page--main-side'>
          <div className='steps'>
            <div className='logo-container align-items-top justify-content-center'>
              <img className='img-asset' src={AssetPlanet} alt="" />
            </div>
            <div className='process'>
              <div className='process-row'>
                {this.state.formSteps.map((formStep, index) => {
                  let elementPos = this.state.formSteps
                    .map(function (x) {
                      return x.id;
                    })
                    .indexOf(this.state.curSubFormID);

                    let classBtn = 'btn nav-items btn-circle'

                  if (elementPos === -1) {
                    elementPos = prevPos;
                  } else {
                    prevPos = elementPos;
                  }

                  classBtn =  elementPos >= index
                  ? 'btn nav-items btn-circle active'
                  : 'btn nav-items btn-circle'

                  if(this.state.isEndForm)  classBtn = 'btn nav-items btn-circle disabled'

                  return (
                    <div className='process-step' key={index}>
                      <button
                        type='button'
                        className={
                        classBtn
                        }
                        data-toggle='tab'
                        onClick={() =>  {
                          if(classBtn !== 'btn nav-items btn-circle disabled')
                            this.goSubForm(formStep.id)}}
                      >
                        {/* <img className="img-icon" src={ImageIcon} /> */}
                        <div style={{ fontSize: 30, color: '#006400' }}>
                          {index + 1}
                        </div>
                      </button>
                      <p className='step-title'>{formStep.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <HiddenHook />
          {!this.state.dbLoaded && (
            <LoadDBDataHook
              dbLoaded={this.state.dbLoaded}
              dbID={this.state.dbID}
              cbLoadDBData={this.loadDBData}
            />
          )}
          <div className='container'>
            <div className='page-nav-history text-uppercase'>
              {/* {navlinks.map((navlink, index) => {
                return (
                  <span key={index}>
                    <Link
                      key={index}
                      to={navlink.href}
                      className='page-nav-link'
                    >
                      {navlink.title}
                    </Link>
                    {index != navlinks.length - 1 ? '/' : null}
                  </span>
                );
              })} */}
            </div>
            {!this.state.dbLoaded && <div>Loading...</div>}
            {this.state.dbLoaded && (
              <div className='form-page-container'>
                <div className='form-page--left-side'>
                  <FormPagePose
                    className='info-form-block'
                    pose={this.state.formVisible ? 'visible' : 'hidden'}
                  >
                    <SubForm
                      subFormData={this.state.subFormData}
                      cbGoSubForm={this.goSubForm}
                      cbUpdateSubForm={this.updateSubForm}
                      formData={this.state.formData}
                      cbGetSubFormField={this.getSubFormField}
                    />
                  </FormPagePose>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='form-page--right-side custom'>
          <span
            className='right-side-collapse-icon'
            onClick={this.toggleRightSide}
          >
            <i className='fe-menu'></i>
          </span>
          <div className='form-page--right-side-wrap'>

<ClientInfoSideDisplay 
data={this.props.clientInfoObject}

/>
</div>
          {/* <div className='form-page--right-side-wrap'>
            {this.state.formData.map((subForm, sindex) => {
              if (subForm.visible == false) {
                return <div key={sindex}></div>;
              }

              let subFormData = subForm.data;
              return (
                <div className='form-brief-block' key={sindex}>
                  <div className='form-brief-top'>
                    <h4 className='form-brief-title'>{subFormData.title}</h4>
                    <span
                      className='form-brief-edit-btn'
                      onClick={() => this.goSubForm(subForm.id)}
                    >
                      <Icon type='edit'></Icon>
                    </span>
                  </div>
                  <div className='form-brief-content'>
                    {subFormData.fields.map((field, ffindex) => {
                      return (
                        <div className='form-brief-item' key={ffindex}>
                          <p className='form-brief-item-title'>
                            {field.title != '' ? field.title + ':' : null}{' '}
                          </p>
                          <p className='form-brief-item-value'>{field.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
         {/* <div className='form-page--right-side custom'>


        <div className='form-page--right-side-wrap'>

        <ClientInfoSideDisplay 
        data={this.props.clientInfoObject}
        
        />
        </div>
        </div> */}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  console.log("in map siaptach to props");

  return {
       // dispatching plain actions
       handleClientInfoObject: (data) => dispatch(setClientInfoObject(data)),
  };
};

const mapStateToProps = (state) => {

  console.log("all client info data",state.rootReducer.clientInfo.clientInfoObject);

  return {
    clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ClientNew);
