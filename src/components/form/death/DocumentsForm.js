import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { connect } from 'react-redux';
import { postSavedOtp } from "../../../redux/slices/loginSlice";
import { saveAs } from 'file-saver'
import swal from "sweetalert";
import { Input } from "../../../components/input/Input";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import { Button, Icon, Row, Col, Form, Modal } from "antd";
import { document_types } from "../../../constants/document_types";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import Trust from "../../../assets/images/latest/Trust.png";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import DEATH_API from "../../../apis/death.api";
import MODULE_API from "../../../apis/module.api";
import axios from "axios";

const formName = "documentsForm";

class DocumentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      addNew: [],
      insurancePolicies: [],
      fileUploaded: [],
      fileNotUploaded: [],
      formData: {},
      isDocumentAddModalVisible: false,
      isPolicyAddModalVisible: false,
      isDocumentUpdateModalVisible: false,
      isPolicyUpdateModalVisible: false,
      isDocumentViewModalVisible: false,
      isPolicyViewModalVisible: false,
      updateObject: null,
      selectedIndex: null,
      newDocument: [],
      newPolicy: [],
      isModalOpen: false,
      message: "",
      userData: {},
      deathCertificateUrl: "",
      TooltipModal: false,

    };
    this.documentRef = React.createRef();
    this.policyRef = React.createRef();


  }


  showTooltipModal = async () => {
    this.setState({
      TooltipModal: true,
    });
  };

  handleTooltipCancel = () => {
    this.setState({
      TooltipModal: false,
    });
  };

  showModal = async () => {
    this.setState({
      isModalOpen: true,
    });
    console.log("userData", this.state.userData);
    try {
      const ID = localStorage.getItem("accessId")

      let data = await DEATH_API.configOtp(ID);
      // console.log("data.message",data.message)

    } catch (error) {
      console.log("e ", error);
    }

  };

  handleOk = async () => {

    console.log("login......", this.state.userData);

    if (this.state.userData !== undefined) {
      this.props.postSavedOtp(this.state.userData.otp)
      localStorage.setItem("otp", this.state.userData.otp)
      this.props.handleLoader()

      try {
        this.props.handleLoader();
        const ID = localStorage.getItem("accessId")

        const policy = await DEATH_API.fetchPolicy(this.state.userData && this.state.userData.otp, ID);
        this.setState({ message: policy })
        if (policy && policy.data) {
          this.setState({
            insurancePolicies: policy.data.map((item) => {
              return {
                ...item,
                PolicysNickname: item.policyName,
                PolicyNumber: item.policyNumber,
                Carrier: item.carrier,
                ContactName: item.contactName,
                InsuranceType: item.contactType,
                ContactPhone: item.phoneNumber,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
        const docs = await DEATH_API.fetchDocuments(this.state.userData && this.state.userData.otp, ID);
        // console.log("docs...document", docs.data);
        if (docs && docs.data) {
          this.setState({
            documents: docs.data.map((item) => {
              return {
                ...item,
                DocumentName: item.name,
                DocumentType: item.type,
                StorageLocationOfDocument: item.heldWhere,
                Notes: item.note,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
        console.log("policy response", policy)
        // if(policy.message==="clients.otp.misMatch"){

        // }
        this.props.handleLoader();
        if (this.state.userData.otp) {
          this.setState({
            isModalOpen: false,
          });
        }
        else {
          swal("Oops!", "Invalid OTP", "error")
        }
      } catch (error) {
        this.props.handleLoader();
        console.log(error);
      }
    }
    if (this.state.message.message === "clients.otp.misMatch") {
      swal("Oops!", "clients.otp.misMatch", "error")
      this.setState({
        isModalOpen: true,
      });

    }
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
    this.props.postSavedOtp("")
    localStorage.setItem("otp", "");
  };
  handleLogin = async () => {
    console.log("login......", this.state.userData);
  };

  componentDidMount() {
    if (
      this.props.checklistObject.documentsForm &&
      this.props.checklistObject.documentsForm.hasOwnProperty("documents") &&
      this.props.checklistObject.documentsForm.hasOwnProperty("addNew") &&
      this.props.checklistObject.documentsForm.hasOwnProperty(
        "insurancePolicies"
      ) &&
      this.props.checklistObject.documentsForm.hasOwnProperty("fileUploaded") &&
      this.props.checklistObject.documentsForm.hasOwnProperty("fileNotUploaded")
    )
      this.setState({
        documents: this.props.checklistObject.documentsForm.documents,
        addNew: this.props.checklistObject.documentsForm.addNew,
        insurancePolicies:
          this.props.checklistObject.documentsForm.insurancePolicies,
        fileUploaded: this.props.checklistObject.documentsForm.fileUploaded,
        fileNotUploaded:
          this.props.checklistObject.documentsForm.fileNotUploaded,
      });
    (async () => {
      if (!localStorage.getItem("otp")) {
        localStorage.setItem("otp", "")
      }
      if (localStorage.getItem("otp") === "") {
        this.showModal();
        const ID = localStorage.getItem("accessId")
        const DeathCerificate = await DEATH_API.getDeathCertificate(ID);
        console.log("DeathCerificate", DeathCerificate)
        if (DeathCerificate.status == 200) {
          this.setState({
            deathCertificateUrl: DeathCerificate.data.deathCertificateUrl,
          });
        }

        // try {
        //   let data = await DEATH_API.configOtp();
        //   // console.log("data.message",data.message)

        // } catch (error) {
        //   console.log("e ", error);
        // }
      }
      else {
        try {

          this.props.handleLoader();
          console.log("this.state.userData", this.state.userData)
          if (localStorage.getItem("otp")) {
            const ID = localStorage.getItem("accessId")
            const DeathCerificate = await DEATH_API.getDeathCertificate(ID);
            console.log("DeathCerificate", DeathCerificate)
            if (DeathCerificate.status == 200) {
              this.setState({
                deathCertificateUrl: DeathCerificate.data.deathCertificateUrl,
              });
            }
            const policy = await DEATH_API.fetchPolicy(localStorage.getItem("otp"), ID);
            if (policy.message === "clients.otp.expired") {
              this.showModal();
            }
            else {
              if (policy && policy.data) {
                this.setState({
                  insurancePolicies: policy.data.map((item) => {
                    return {
                      ...item,
                      PolicysNickname: item.policyName,
                      PolicyNumber: item.policyNumber,
                      Carrier: item.carrier,
                      ContactName: item.contactName,
                      InsuranceType: item.contactType,
                      ContactPhone: item.phoneNumber,
                      file: item.fileUrl,
                      Upload: item.fileName,
                    };
                  }),
                });
              }
            }
            const docs = await DEATH_API.fetchDocuments(localStorage.getItem("otp"), ID);
            if (docs.message === "clients.otp.expired") {
              this.showModal();
            }
            // console.log("docs...document", docs.data);
            else {
              if (docs && docs.data) {
                this.setState({
                  documents: docs.data.map((item) => {
                    return {
                      ...item,
                      DocumentName: item.name,
                      DocumentType: item.type,
                      StorageLocationOfDocument: item.heldWhere,
                      Notes: item.note,
                      file: item.fileUrl,
                      Upload: item.fileName,
                    };
                  }),
                });
              }
            }
          }
          this.props.handleLoader();
        } catch (error) {
          this.props.handleLoader();
          console.log(error);
        }
      }
    })();
    this.props.handleChecklistObject(
      this.props.currentForm,
      this.state.documents
    );
    this.props.handleChecklistObject(
      this.props.currentForm,
      this.state.insurancePolicies
    );
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for document add modal
  setDocumentAddModalVisible = () =>
    this.setState({
      isDocumentAddModalVisible: !this.state.isDocumentAddModalVisible,
    });
  // to handle hide and show for policies  add modal
  setPolicyAddModalVisible = () =>
    this.setState({
      isPolicyAddModalVisible: !this.state.isPolicyAddModalVisible,
    });

  // to handle hide and show for document update modal
  setDocumentUpdateModalVisible = () =>
    this.setState({
      isDocumentUpdateModalVisible: !this.state.isDocumentUpdateModalVisible,
    });

  // to handle hide and show for policies update modal
  setPolicyUpdateModalVisible = () =>
    this.setState({
      isPolicyUpdateModalVisible: !this.state.isPolicyUpdateModalVisible,
    });

  // to handle hide and show for View modal
  setDocumentViewModalVisible = () => this.setState({ isDocumentViewModalVisible: !this.state.isDocumentViewModalVisible });

  // to handle hide and show for View modal
  setPolicyViewModalVisible = () => this.setState({ isPolicyViewModalVisible: !this.state.isPolicyViewModalVisible });


  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) =>
    this.onUpdateChange(dateString, index);

  // Function to delete selected row
  deleteSelectedRow = async (idx, all_rows, name, id) => {
    if (name === "document") {

      var that = this;
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this?",
        dangerMode: true,
        buttons: ["No, cancel it!", "Yes, delete it!"],
        icon: "warning",
        type: "warning",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(async function (isConfirm) {
        // Redirect the user
        if (isConfirm) {
          // that.props.handleLoader()
          try {
            that.props.handleLoader();
            await DEATH_API.deleteDocument(id);
            that.props.handleLoader();

          } catch (error) {
            console.log(error);
            return;
          }
          const updatedRows = all_rows.filter((row, index) => {
            return row.id != idx;
          });
          that.setState(
            {
              documents: updatedRows,
            },
            () => {
              that.props.handleChecklistObject(
                that.props.currentForm,
                that.state.documents
              );
            }
          );
          that.props.handleLoader();
          const ID = localStorage.getItem("accessId")

          const docs = await DEATH_API.fetchDocuments(localStorage.getItem("otp"), ID);
          if (docs.message === "clients.otp.expired") {
            that.showModal();
          }
          else {
            console.log("docs...document", docs.data);
            if (docs && docs.data) {
              that.setState({
                documents: docs.data.map((item) => {
                  return {
                    ...item,
                    DocumentName: item.name,
                    DocumentType: item.type,
                    StorageLocationOfDocument: item.heldWhere,
                    Notes: item.note,
                    file: item.fileUrl,
                    Upload: item.fileName,
                  };
                }),
              });
            }
            that.props.handleLoader();
          }
          setTimeout(async () => {
            that.props.handleLoader()
            swal("Deleted!", "Your file has been deleted.", "success");
            that.props.handleLoader()
          }, 0)
        } else {
          swal("Cancelled", "Your file is safe :)", "error");
        }
      });

    } else {

      var that = this;
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this?",
        dangerMode: true,
        buttons: ["No, cancel it!", "Yes, delete it!"],
        icon: "warning",
        type: "warning",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(async function (isConfirm) {
        // Redirect the user
        if (isConfirm) {
          // that.props.handleLoader()
          try {
            that.props.handleLoader();
            await DEATH_API.deletePolicy(id);
            that.props.handleLoader();
            that.props.handleLoader();

          } catch (error) {
            console.log(error);
            return;
          }
          const updatedRows = all_rows.filter((row, index) => {
            return row.id != idx;
          });
          that.setState(
            {
              insurancePolicies: updatedRows,
            },
            () => {
              that.props.handleChecklistObject(
                that.props.currentForm,
                that.state.insurancePolicies
              );
            }
          );
          const ID = localStorage.getItem("accessId")

          const policy = await DEATH_API.fetchPolicy(localStorage.getItem("otp"), ID);
          if (policy.message === "clients.otp.expired") {
            that.showModal();
          }
          else {
            if (policy && policy.data) {
              that.setState({
                insurancePolicies: policy.data.map((item) => {
                  return {
                    ...item,
                    PolicysNickname: item.policyName,
                    PolicyNumber: item.policyNumber,
                    Carrier: item.carrier,
                    ContactName: item.contactName,
                    InsuranceType: item.contactType,
                    ContactPhone: item.phoneNumber,
                    file: item.fileUrl,
                    Upload: item.fileName,
                  };
                }),
              });
            }
            that.props.handleLoader();
          }
          setTimeout(async () => {
            that.props.handleLoader()
            swal("Deleted!", "Your file has been deleted.", "success");
            that.props.handleLoader()
          }, 0)
        } else {
          swal("Cancelled", "Your file is safe :)", "error");
        }
      });

    }
  };

  // Function to get selected  array (row)
  getSelectedRow = (idx, rows, name) => {
    this.setState({
      selectedIndex: idx,
    });

    // get selected row (this will return array of object)
    let selectedRow = rows.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };

  //  function to update a specific document row
  updateDocumentRow = async () => {
    try {
      this.props.handleLoader();
      console.log("updateobject", this.state.updateObject);
      let uploaded = {};
      if (this.state.updateObject.file) {

        const formData = new FormData();
        formData.append("file", this.state.updateObject.file);

        const name = this.state.updateObject.file.name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: this.state.updateObject.file.type })
        const resupload = await axios.put(resdata.uploadUrl, this.state.updateObject.file, { headers: { 'Content-type': this.state.updateObject.file.type } })
        const res = resdata.uploadUrl.split("?")[0]
        console.log("resss video url", res);
        // const uploaded = await MODULE_API.uploadImage(formData);
        uploaded.file_url = res;
        uploaded.fileName = name;

        // const formData = new FormData();
        // formData.append("image", this.state.updateObject.file);
        // console.log("formdata updatedocument", this.state.updateObject);

        // uploaded = await MODULE_API.uploadImage(formData);
      }
      else {
        uploaded.fileUrl = "null"
      }

      // console.log("updated file Url", uploaded.file_url);
      let obj = {
        ...this.state.updateObject,
        name: this.state.updateObject.DocumentName,
        type: this.state.updateObject.DocumentType,
        heldWhere: this.state.updateObject.StorageLocationOfDocument,
        note: this.state.updateObject.Notes,
        fileUrl: this.state.updateObject.file && uploaded.file_url,
        fileName: this.state.updateObject.file && uploaded.fileName,

      };
      delete obj.file
      let { documents, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      await DEATH_API.updateDocument(obj.id, obj)
      documents = [...this.state.documents]; // important to create a copy, otherwise you'll modify state outside of setState call
      documents[index] = obj; // replace current updated object in documents based on index
      this.setState({ documents }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.documents)
      });
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId")
      this.props.handleLoader();
      const docs = await DEATH_API.fetchDocuments(localStorage.getItem("otp"), ID);
      if (docs.message === "clients.otp.expired") {
        this.showModal();
      }
      else {
        console.log("docs...document", docs.data);
        if (docs && docs.data) {
          this.setState({
            documents: docs.data.map((item) => {
              return {
                ...item,
                DocumentName: item.name,
                DocumentType: item.type,
                StorageLocationOfDocument: item.heldWhere,
                Notes: item.note,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
      }
      this.props.handleLoader();
      this.props.handleLoader();
      this.props.handleLoader();
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }
  };

  //  function to update a specific Policy row
  updatePolicyRow = async () => {
    try {
      this.props.handleLoader()


      const formData = new FormData();
      formData.append("file", this.state.updateObject.file);

      const name = this.state.updateObject.file.name;
      const lastDot = name.lastIndexOf('.');
      const fileName = name.substring(0, lastDot);
      const ext = name.substring(lastDot + 1);
      const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: this.state.updateObject.file.type })
      const resupload = await axios.put(resdata.uploadUrl, this.state.updateObject.file, { headers: { 'Content-type': this.state.updateObject.file.type } })
      const res = resdata.uploadUrl.split("?")[0]
      console.log("resss video url", res);
      // const uploaded = await MODULE_API.uploadImage(formData);
      let uploaded = {}
      uploaded.file_url = res;
      uploaded.fileName = name;
      // const formData = new FormData();
      // formData.append("image", this.state.updateObject.file);
      // console.log("formdata updatepolicy", this.state.updateObject);
      // const uploaded = await MODULE_API.uploadImage(formData);
      // console.log("updated file Url", uploaded.file_url);

      console.log(this.state.updateObject.ContactName)
      let obj = {
        ...this.state.updateObject,
        policyName: this.state.updateObject.PolicysNickname,
        policyNumber: this.state.updateObject.PolicyNumber,
        carrier: this.state.updateObject.Carrier,
        contactName: this.state.updateObject.ContactName,
        contactType: this.state.updateObject.InsuranceType,
        phoneNumber: this.state.updateObject.ContactPhone,
        fileUrl: uploaded.file_url,
        fileName: uploaded.fileName,
      };
      delete obj.file

      await DEATH_API.updatePolicy(obj.id, obj)
      let { insurancePolicies, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      insurancePolicies = [...this.state.insurancePolicies]; // important to create a copy, otherwise you'll modify state outside of setState call
      insurancePolicies[index] = obj; // replace current updated object in insurancePolicies based on index
      this.setState({ insurancePolicies }, () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.insurancePolicies
        );
      });
      this.props.handleLoader()
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId")

      this.props.handleLoader();
      const policy = await DEATH_API.fetchPolicy(localStorage.getItem("otp"), ID);
      if (policy.message === "clients.otp.expired") {
        this.showModal();
      }
      else {
        if (policy && policy.data) {
          this.setState({
            insurancePolicies: policy.data.map((item) => {
              return {
                ...item,
                PolicysNickname: item.policyName,
                PolicyNumber: item.policyNumber,
                Carrier: item.carrier,
                ContactName: item.contactName,
                InsuranceType: item.contactType,
                ContactPhone: item.phoneNumber,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
        this.props.handleLoader();
      }
      this.props.handleLoader();

    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
  };

  // function to create document row (data)
  createDocumentRow = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    console.log("currentFormData", currentFormData.formData)
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newDocument: [currentFormData.formData, ...this.state.newDocument],
        formData: {},
      });
    }

    // add current form data in documents list with keeping old data
    this.setState({
      documents: [currentFormData.formData, ...this.state.documents],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.documents)
    });
    var arr = [currentFormData.formData]
    try {
      let data = arr;
      this.props.handleLoader()
      if (Array.isArray(data) && data.length > 0) {
        const allPromises = data.map(async (item) => {
          if (item.file) {

            const formData = new FormData();
            formData.append("file", item.file);
            console.log("item.file", item.file)
            const name = item.file.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: item.file.type })
            const resupload = await axios.put(resdata.uploadUrl, item.file, { headers: { 'Content-type': item.file.type } })
            const res = resdata.uploadUrl.split("?")[0]
            console.log(res);
            delete item.file;
            return { ...item, fileUrl: res, Upload: name };


            // const formData = new FormData();
            // formData.append("image", item.file);
            // const uploaded = await MODULE_API.uploadImage(formData);
            // // console.log("uploaded", item.file)
            // // delete item.file;
            // return { ...item, fileUrl: uploaded.file_url, Upload: item.file.name, };
          }
          return item;
        });
        let res = await Promise.all(allPromises);
        console.log("response of document upload", res)
        await DEATH_API.addDocuments({
          documentsForm: res.map((item) => {
            return {
              name: item.DocumentName,
              type: item.DocumentType,
              heldWhere: item.StorageLocationOfDocument,
              note: item.Notes,
              fileUrl: item.fileUrl,
              fileName: item.Upload,
            };
          }),
        });
      }
      this.props.handleLoader()
      const ID = localStorage.getItem("accessId")
      const docs = await DEATH_API.fetchDocuments(localStorage.getItem("otp"), ID);
      if (docs.message === "clients.otp.expired") {
        this.showModal();
      }
      else {
        this.props.handleLoader()
        if (docs && docs.data) {
          this.setState({
            documents: docs.data.map((item) => {
              return {
                ...item,
                DocumentName: item.name,
                DocumentType: item.type,
                StorageLocationOfDocument: item.heldWhere,
                Notes: item.note,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
        this.props.handleLoader()
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }


  };

  // function to create policy row(data)
  createPolicyRow = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newPolicy: [currentFormData.formData, ...this.state.newPolicy],
        formData: {},
      });
    }
    // add current form data in insurancePolicies list with keeping old data
    this.setState(
      {
        insurancePolicies: [
          currentFormData.formData,
          ...this.state.insurancePolicies,
        ],
      },
      () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.insurancePolicies
        );
      }
    );

    var arr = [currentFormData.formData]
    try {
      this.props.handleLoader()
      let policies = arr;
      if (Array.isArray(policies) && policies.length > 0) {
        const allPromises = policies.map(async (item) => {
          if (item.file) {

            const formData = new FormData();
            formData.append("file", item.file);
            console.log("item.file", item.file)
            const name = item.file.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: item.file.type })
            const resupload = await axios.put(resdata.uploadUrl, item.file, { headers: { 'Content-type': item.file.type } })
            const res = resdata.uploadUrl.split("?")[0]
            console.log(res);
            delete item.file;
            return { ...item, fileUrl: res, Upload: name };


            // const formData = new FormData();
            // formData.append("image", item.file);
            // const uploaded = await MODULE_API.uploadImage(formData);
            // // delete item.file;
            // return { ...item, fileUrl: uploaded.file_url, Upload: item.file.name, };
          }
          return item;
        });
        let res = await Promise.all(allPromises);
        await DEATH_API.addPolicies({
          policiesForm: res.map((item) => {
            return {
              policyName: item.PolicysNickname,
              policyNumber: item.PolicyNumber,
              carrier: item.Carrier,
              contactName: item.ContactName,
              contactType: item.InsuranceType,
              phoneNumber: item.ContactPhone,
              fileUrl: item.fileUrl,
              fileName: item.Upload,

            };
          }),
        });
      }
      this.props.handleLoader()
      const ID = localStorage.getItem("accessId")

      const policy = await DEATH_API.fetchPolicy(localStorage.getItem("otp"), ID);
      if (policy.message === "clients.otp.expired") {
        this.showModal();
      }
      else {
        this.props.handleLoader()
        if (policy && policy.data) {
          this.setState({
            insurancePolicies: policy.data.map((item) => {
              return {
                ...item,
                PolicysNickname: item.policyName,
                PolicyNumber: item.policyNumber,
                Carrier: item.carrier,
                ContactName: item.contactName,
                InsuranceType: item.contactType,
                ContactPhone: item.phoneNumber,
                file: item.fileUrl,
                Upload: item.fileName,
              };
            }),
          });
        }
        this.props.handleLoader()
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }

  };

  // store all modal data in formData state
  setFormData = (value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...value,
      },
    });
  };

  getDocumentRow = ({ data, index, id }) => {
    const { role } = this.props;
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={10}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Document Name:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.DocumentName || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Document type:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.DocumentType || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">{data.Notes || 'N/A'}</span>
            </div>
          </div>
        </Col>
        {/* 
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Death Certificate:
              </span>
              <span className="custom-field-value-style">
                {data.DeathCertificate || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Certificate Needed:
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.CertificateNeeded || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        */}
        <Col span={8}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style"> {data.file ?
                <button className="custom-download-style" onClick={() => {
                  saveAs(data.file, 'Documentdownload')
                }}>
                  {data.file ? data.Upload : data.Upload && data.Upload.filename || 'N/A'}
                </button>
                : 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" && (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="eye"
                onClick={() => {
                  const { documents } = this.state;
                  this.getSelectedRow(index, documents);

                  this.setDocumentViewModalVisible();
                }}
              ></Button>
            </div>
          )}
        </Col>
        {/* 
        <Col span={1}>
          {role!=="protrustee" && (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon={"upload"}
              ></Button>
            </div>
          )}
        </Col>
        */}
        <Col span={1}>
          {role !== "protrustee" && (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="edit"
                onClick={() => {
                  const { documents } = this.state;
                  this.getSelectedRow(index, documents);

                  this.setDocumentUpdateModalVisible();
                }}
              ></Button>
            </div>
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" && (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  const { documents } = this.state;
                  const name = "document";
                  this.deleteSelectedRow(index, documents, name, id);
                }}
              ></Button>
            </div>
          )}
        </Col>
      </Row>
    );
  };

  getInsuranceRow = ({ data, index, id }) => {
    const { role } = this.props;
    // console.log("data polices",data);
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Type of Insurance:
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.InsuranceType}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Carrier:</span>
              <span className="custom-field-value-style"> {data.Carrier || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Policy:</span>
              <span className="custom-field-value-style">
                {data.PolicysNickname || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Contact Name:</span>
              <span className="custom-field-value-style">
                {data.ContactName || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Contact Phone:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.ContactPhone || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style"> {data.file ?
                <button className="custom-download-style" onClick={() => {
                  saveAs(data.file, 'Documentdownload')
                }}>
                  {data.file ? data.Upload : data.Upload && data.Upload.filename || 'N/A'}
                </button>
                : 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments"></div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="eye"
                onClick={() => {
                  const { insurancePolicies } = this.state;
                  this.getSelectedRow(index, insurancePolicies);

                  this.setPolicyViewModalVisible();
                }}
              ></Button>
            </div>
          ) : (
            ""
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="edit"
                onClick={() => {
                  const { insurancePolicies } = this.state;
                  this.getSelectedRow(index, insurancePolicies);

                  this.setPolicyUpdateModalVisible();
                }}
              ></Button>
            </div>
          ) : (
            ""
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  const { insurancePolicies } = this.state;
                  const name = "policy";
                  this.deleteSelectedRow(index, insurancePolicies, name, id);
                }}
              >
              </Button>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    );
  };

  downloadDocumentTemplate = async () => {
    try {
      this.props.handleLoader();
      const res = await DEATH_API.getDocumentTemplates("document");
      console.log("res.....", res.url);
      this.props.handleLoader();
      saveAs(res.url, 'documnetTemplate');
    } catch (error) {
      console.log(error)
    }

  };
  downloadPolicyTemplate = async () => {
    try {
      this.props.handleLoader();
      const res = await DEATH_API.getPolicyTemplates("policy");
      console.log("res.....", res);
      this.props.handleLoader();
      saveAs(res.url, 'policyTemplate');
    } catch (error) {
      console.log(error)
    }

  };
  openDocumentRef = () => {
    const files = this.documentRef.current.click();
    if (files) {
      console.log("files inside..", files);
    }
    console.log("files..... document", files)
    // console.log("documentRef upload", this.documentRef.current.click());

  };

  downloadDocumentRef = async () => {

    try {
      this.props.handleLoader();
      const res = await DEATH_API.exportDocumentSheet("document");
      this.props.handleLoader();
      console.log("res.....", res.url);
      saveAs(res.url, 'documentSheet');

    } catch (error) {
      console.log(error)
    }

  };
  openPolicyRef = () => {
    const files = this.policyRef.current.click();
    if (files) {
      console.log("files  inside..", files);
    }
    console.log("files. policy....", files)
    // console.log("policyRef upload", this.policyRef.current.click());

  };

  downloadPolicyRef = async () => {

    try {
      this.props.handleLoader();
      const res = await DEATH_API.exportPolicySheet("policy");
      this.props.handleLoader();
      console.log("res.....", res.url);
      saveAs(res.url, 'policySheet');

    } catch (error) {
      console.log(error)
    }

  };

  render() {

    const largeBills = [
      {
        title: "Death Certificate URL",
        dataIndex: "certificate_url",
        key: "certificate_url",
        fields: [
          {
            type: "WebAddress",
            name: "certificate_url",
          },
        ],
      },
      {
        title: "Want To Fetch Insurance Policies ?",
        dataIndex: "policy_qna",
        key: "policy_qna",
        fields: [
          {
            type: "Radio",
            name: "policy_qna",
            values: ["Yes", "No"],
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name",
        key: "document_name",
        fields: [
          {
            type: "Input",
            name: "document_name",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type",
        key: "document_type",
        fields: [
          {
            type: "Select",
            name: "document_type",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload",
        key: "file_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location",
        key: "location",
        fields: [
          {
            type: "TextArea",
            name: "location",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "TextArea",
            name: "notes",
          },
        ],
      },
    ];

    const New_Document = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_new_doc",
        key: "doc_icon_new_doc",
        fields: [
          {
            type: "Input",
            name: "doc_icon_new_doc",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_new_doc",
        key: "document_type_new_doc",
        fields: [
          {
            type: "Select",
            name: "document_type_new_doc",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_new_doc",
        key: "document_name_new_doc",
        fields: [
          {
            type: "Input",
            name: "document_name_new_doc",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_new_doc",
        key: "file_upload_new_doc",
        fields: [
          {
            type: "Document",
            name: "file_upload_new_doc",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_new_doc",
        key: "location_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "location_new_doc",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_new_doc",
        key: "date_created_new_doc",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_new_doc",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_doc",
        key: "notes_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_doc",
          },
        ],
      },
    ];

    const Insurance_Policies = [
      {
        title: "Insurance Type",
        dataIndex: "insurance_type_policies",
        key: "insurance_type_policies",
        fields: [
          {
            type: "Select",
            name: "insurance_type_policies",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Nickname of Policy",
        dataIndex: "nickname_policy",
        key: "nickname_policy",
        fields: [
          {
            type: "Input",
            name: "nickname_policy",
          },
        ],
      },
      {
        title: "Policy Number",
        dataIndex: "policy_number",
        key: "policy_number",
        fields: [
          {
            type: "Input",
            name: "policy_number",
          },
        ],
      },
      {
        title: "Carrier",
        dataIndex: "carrier_policy",
        key: "carrier_policy",
        fields: [
          {
            type: "TextArea",
            name: "carrier_policy",
          },
        ],
      },
      {
        title: "Contact Name",
        dataIndex: "contact_name_policy",
        key: "contact_name_policy",
        fields: [
          {
            type: "Input",
            name: "contact_name_policy",
          },
        ],
      },
      {
        title: "View Policy in Insurance Module",
        dataIndex: "view_policy_module",
        key: "view_policy_module",
        fields: [
          {
            type: "Radio",
            name: "view_policy_module",
            values: ["Yes", "No"],
          },
        ],
      },
    ];

    const File_Uploaded = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_upload",
        key: "doc_icon_upload",
        fields: [
          {
            type: "Input",
            name: "doc_icon_upload",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_upload",
        key: "document_type_upload",
        fields: [
          {
            type: "Select",
            name: "document_type_upload",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_upload",
        key: "document_name_upload",
        fields: [
          {
            type: "Input",
            name: "document_name_upload",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_upload",
        key: "file_upload_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload_upload",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_upload",
        key: "location_upload",
        fields: [
          {
            type: "TextArea",
            name: "location_upload",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_upload",
        key: "date_created_upload",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_upload",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_doc",
        key: "notes_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_doc",
          },
        ],
      },
      {
        title: "Phone Number/Fax Number to Send File",
        dataIndex: "send_file_upload",
        key: "send_file_upload",
        fields: [
          {
            type: "Input",
            name: "send_file_upload",
          },
        ],
      },
    ];

    const File_Not_Uploaded = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_not_upload",
        key: "doc_icon_not_upload",
        fields: [
          {
            type: "Input",
            name: "doc_icon_not_upload",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_not_upload",
        key: "document_type_not_upload",
        fields: [
          {
            type: "Select",
            name: "document_type_not_upload",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_not_upload",
        key: "document_name_not_upload",
        fields: [
          {
            type: "Input",
            name: "document_name_not_upload",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_not_upload",
        key: "file_upload_not_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload_not_upload",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_not_upload",
        key: "location_not_upload",
        fields: [
          {
            type: "TextArea",
            name: "location_not_upload",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_not_upload",
        key: "date_created_not_upload",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_not_upload",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_not_doc",
        key: "notes_new_not_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_not_doc",
          },
        ],
      },
      {
        title: "Phone Number/Fax Number to Send File",
        dataIndex: "send_file_not_upload",
        key: "send_file_not_upload",
        fields: [
          {
            type: "Input",
            name: "send_file_not_upload",
          },
        ],
      },
    ];

    const documentFields = [
      {
        title: "Document Name",
        type: "input",
        index: "DocumentName",
      },
      {
        title: "Document Type",
        type: "select",
        options: ["Adoption Papers", "Birth Certificate", "Divorce Papers", "Driver's License", "Financial Accounts", "Financial Obligations", "Green Card", "ID", "Marriage License", "Medical", "Military", "Mortgage/Real Estate Deeds of Trust", "Naturalization Documents", "Passport", "Power of Attorney", "Social Security Card", "Sources of Income/Assets", "Tax Statements", "Vehicle Registration/Ownership Papers", "Will", "Others"],
        index: "DocumentType",
      },
      // {
      //   title: "Death Certificate URL",
      //   type: "web",
      // },
      // {
      //   title: "Certificated Needed",
      //   type: "input",
      // },
      {
        title: "Storage Location Of Document",
        type: "input",
        index: "StorageLocationOfDocument",
      },
      {
        title: "File",
        type: "file",
        index: "file",
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes",
      },
    ];

    const UpdateDocumentFields = [
      {
        title: "Document Name",
        type: "input",
        index: "DocumentName",
      },
      {
        title: "Document Type",
        type: "select",
        options: ["Adoption Papers", "Birth Certificate", "Divorce Papers", "Driver's License", "Financial Accounts", "Financial Obligations", "Green Card", "ID", "Marriage License", "Medical", "Military", "Mortgage/Real Estate Deeds of Trust", "Naturalization Documents", "Passport", "Power of Attorney", "Social Security Card", "Sources of Income/Assets", "Tax Statements", "Vehicle Registration/Ownership Papers", "Will", "Others"],
        index: "DocumentType",
      },
      // {
      //   title: "Death Certificate URL",
      //   type: "web",
      // },
      // {
      //   title: "Certificated Needed",
      //   type: "input",
      // },
      {
        title: "Storage Location Of Document",
        type: "input",
        index: "StorageLocationOfDocument",
      },
      {
        title: "File",
        type: "document",
        index: "file",
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes",
      },
    ];

    const policiesFields = [
      {
        title: "Policy's Nickname",
        type: "input",
        index: "PolicysNickname",
      },
      {
        title: "Policy Number",
        type: "input",
        index: "PolicyNumber",
      },
      {
        title: "Carrier",
        type: "input",
        index: "Carrier",
      },
      {
        title: "Contact Name",
        type: "input",
        index: "ContactName",
      },
      {
        title: "Insurance Type",
        type: "select",
        options: ["Auto Insurance", "Life Insurance", "Property Insurance", "Rental Insurance", "Others"],
        index: "InsuranceType",
      },
      {
        title: "Contact Phone",
        type: "phone",
        index: "ContactPhone",
      },
      {
        title: "File",
        type: "document",
        index: "file",
      },
    ];

    const UpdatePoliciesFields = [
      {
        title: "Policy's Nickname",
        type: "input",
        index: "PolicysNickname",
      },
      {
        title: "Policy Number",
        type: "input",
        index: "PolicyNumber",
      },
      {
        title: "Carrier",
        type: "input",
        index: "Carrier",
      },
      {
        title: "Contact Name",
        type: "input",
        index: "ContactName",
      },
      {
        title: "Insurance Type",
        type: "select",
        options: ["Auto Insurance", "Life Insurance", "Property Insurance", "Rental Insurance", "Others"],
        index: "InsuranceType",
      },
      {
        title: "Contact Phone",
        type: "phone",
        index: "ContactPhone",
      },
      {
        title: "File",
        type: "document",
        index: "file",
      },
    ];

    // const { handleFormInputChange, role } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      role,
    } = this.props;

    return (
      <React.Fragment>
        <input
          type="file"
          id="file"
          accept=".csv, application/vnd.ms-excel, text/csv"
          ref={this.documentRef}
          style={{ display: "none" }}
          onChange={async (event) => {
            try {
              const formData = new FormData();
              formData.append('file', event.target.files[0])
              this.props.handleLoader()
              const res = await DEATH_API.uploadDocumnet(formData);
              const ID = localStorage.getItem("accessId")
              const docs = await DEATH_API.fetchDocuments(localStorage.getItem("otp"), ID);
              if (docs.message === "clients.otp.expired") {
                this.showModal();
              }
              else {
                if (docs && docs.data) {
                  this.setState({
                    documents: docs.data.map((item) => {
                      return {
                        ...item,
                        DocumentName: item.name,
                        DocumentType: item.type,
                        StorageLocationOfDocument: item.heldWhere,
                        Notes: item.note,
                        file: item.fileUrl,
                        Upload: item.fileName,
                      };
                    }),
                  });
                }
                this.props.handleLoader()
              }

            } catch (error) {
              console.log(error)
            }
          }}

        />
        <input
          type="file"
          id="file"
          accept=".csv, application/vnd.ms-excel, text/csv"
          ref={this.policyRef}
          style={{ display: "none" }}
          onChange={async (event) => {
            try {
              const formData = new FormData();
              formData.append('file', event.target.files[0])
              this.props.handleLoader()
              const res = await DEATH_API.uploadPolicy(formData);
              const ID = localStorage.getItem("accessId")

              const policy = await DEATH_API.fetchPolicy(localStorage.getItem("otp"), ID);
              if (policy.message === "clients.otp.expired") {
                this.showModal();
              }
              else {
                if (policy && policy.data) {
                  this.setState({
                    insurancePolicies: policy.data.map((item) => {
                      return {
                        ...item,
                        PolicysNickname: item.policyName,
                        PolicyNumber: item.policyNumber,
                        Carrier: item.carrier,
                        ContactName: item.contactName,
                        InsuranceType: item.contactType,
                        ContactPhone: item.phoneNumber,
                        file: item.fileUrl,
                        Upload: item.fileName,
                      };
                    }),
                  });
                }
                this.props.handleLoader()
              }

            } catch (error) {
              console.log(error)
            }
          }}

        />

        <AddModal
          title={"Add New Document"}
          fields={documentFields}
          isVisible={this.state.isDocumentAddModalVisible}
          cbClose={this.setDocumentAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createDocumentRow}
        />

        <AddModal
          title={"Add New Policy"}
          fields={policiesFields}
          isVisible={this.state.isPolicyAddModalVisible}
          cbClose={this.setPolicyAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createPolicyRow}
        />
        <Modal title={"Important Documents"} visible={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div style={{ marginTop: "20px" }}>
            {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
            <div className="">
              <h2 className="otp-heading">This passcode provides another layer of security for your important documents. The passcode is only valid for this session.</h2>
              <div>
                <InputGroup>
                  <label>Code that was sent to your mobile</label>
                  <Input
                    onChange={(e) => {
                      this.setState({
                        userData: { ...this.state.userData, [e.target.name]: e.target.value }
                      });
                    }}
                    id="otp"
                    type="text"
                    // pattern="[0-9]{10}"
                    pattern="[0-9.]+"
                    // pattern="[0-9]+"
                    // pattern="\d*"
                    // maxlength="4"
                    maxLength={6}
                    placeholder="***OTP***"
                    name="otp"
                  ></Input>
                </InputGroup>
                {/*
              <Button
                onClick={() => {
                  this.handleLogin();
                }}
              // disabled={user.loading}
              >
                OK
              </Button>
            */}

              </div>
            </div>
          </div>
        </Modal>
        <UpdateModal
          title={"Update Document"}
          fields={UpdateDocumentFields}
          isVisible={this.state.isDocumentUpdateModalVisible}
          cbClose={this.setDocumentUpdateModalVisible}
          cbUpdate={this.updateDocumentRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Document"}
          fields={UpdateDocumentFields}
          isVisible={this.state.isDocumentViewModalVisible}
          cbClose={this.setDocumentViewModalVisible}
          // onLoad={this.get}
          obj={this.state.updateObject}

        />
        <UpdateModal
          title={"Update Policies"}
          fields={UpdatePoliciesFields}
          isVisible={this.state.isPolicyUpdateModalVisible}
          cbClose={this.setPolicyUpdateModalVisible}
          cbUpdate={this.updatePolicyRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Policies"}
          fields={UpdatePoliciesFields}
          isVisible={this.state.isPolicyViewModalVisible}
          cbClose={this.setPolicyViewModalVisible}
          obj={this.state.updateObject}

        />
        {/* <Header image={Trust} title={"Important Documents"} /> */}

        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={Trust}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Important Documents
              <Icon
                style={{
                  fontSize: "27px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                  color: "#39b54a",
                }}
                onClick={async () => {
                  this.showTooltipModal()
                }}
                type="question-circle"
              ></Icon>
            </h2>
          </Col>
        </Row>

        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Important Documents</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                This is another simple but critical feature to have in a program to maximize collaboration.
                There are variety of ways to store data and the idea was to simplify by allowing our servers
                store and back-up the data, thereby making it accessible with anyone authorized by Plan
                Creator as a Trusted Individual. Except for Advanced Health Care Directive, important
                documents are not accessible to anybody other than those with certain permissions and still
                must be authenticated using 2FA by text (SMS).  Early access is not available for Trusted
                Individuals to ensure the secrecy of its contents and intent by Plan Creator.  Only once the
                plan has been fully activated will this area and its contents be viewable by Trusted
                Individuals. Document examples include insurance policies, wills, trusts with amendments,
                birth certificate, deeds, divorce or civil settlement, misc. legal papers, scanned copies of
                personal letters, receipts, and much more.
                Death certificate URL might have been populated by Plan Creator to reflect the county in
                which they currently reside. There is no automation to this process and the program cannot
                order death certificates on behalf of anyone.
              </h2>

            </div>
          </div>
        </Modal>

        <Row className="mb-4">
          <Col span={7}></Col>
          <Col span={11}>
            <Form.Item label={""}>
              <div className="custom-upload-style">
                <input
                  id="file-input"
                  type="input"
                  placeholder="Enter Url Here"
                  style={{ border: "none", outline: "none", width: "60.5%" }}
                  defaultValue={this.state.deathCertificateUrl}
                  disabled={role !== "protrustee" ? false : true}
                />
                {/* <label for="file-input"> */}
                <Button
                  style={{
                    fontSize: "20px",
                    background: "#39b54a",
                    // padding: "8px",
                    borderRadius: "5px",
                    color: "white",

                  }}
                  disabled={role !== "protrustee" ? false : true}
                  // isDisabled={role !== "protrustee" ? false : true}
                  onClick={async () => {
                    let URL = document.getElementById("file-input").value
                    console.log("URL", URL);
                    this.props.handleLoader();
                    const res = await DEATH_API.PostDeathCertificate({ deathCertificateUrl: URL })
                    this.props.handleLoader();
                    console.log("res", res);
                    // swal("Success!", res.message, "success");

                  }}
                >
                  Death Certificate Url
                </Button>

                {/* </label> */}
              </div>
            </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Add
          title={"Important Documents"}
          button={"Document Options"}
          cbAdd={this.setDocumentAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
          list={[
            // {
            //   option: "Download Template",
            //   cb: this.downloadDocumentTemplate,
            // },
            // {
            //   option: "Upload Document",
            //   cb: this.openDocumentRef,
            // },
            {
              option: "Download CSV List",
              cb: this.downloadDocumentRef,
            },
            // {
            //   option: "Fax Document",
            // },
            {
              option: "Email Document",
            },
          ]}
        />
        {/* get document row */}
        {this.state.documents.map((data, index) =>
          this.getDocumentRow({ data, index: index + 1, id: data.id })
        )}

        <Add
          title={"Insurance Policies"}
          button={"Policy Options"}
          cbAdd={this.setPolicyAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
          list={[
            // {
            //   option: "Download Template",
            //   cb: this.downloadPolicyTemplate,
            // },
            // {
            //   option: "Upload Policy",
            //   cb: this.openPolicyRef,
            // },
            {
              option: "Download CSV List",
              cb: this.downloadPolicyRef,
            },
            // {
            //   option: "Fax Document",
            // },
            {
              option: "Email Document",
            },
          ]}
        />
        {/* get policy row */}
        {this.state.insurancePolicies.map((data, index) =>
          this.getInsuranceRow({ data, index: index + 1, id: data.id })
        )}

        <Footer
          cbPrev={this.props.previousForm}
          cbNext={this.props.nextForm
            // this.props.nextForm(async () => {
            //   try {
            //     let data = this.state.newDocument;
            //     this.props.handleLoader()
            //     if (Array.isArray(data) && data.length > 0) {
            //       const allPromises = data.map(async (item) => {
            //         if (item.file) {
            //           const formData = new FormData();
            //           formData.append("image", item.file);
            //           const uploaded = await MODULE_API.uploadImage(formData);
            //           delete item.file;
            //           return { ...item, fileUrl: uploaded.file_url };
            //         }
            //         return item;
            //       });
            //       let res = await Promise.all(allPromises);
            //       await DEATH_API.addDocuments({
            //         documentsForm: res.map((item) => {
            //           return {
            //             name: item.DocumentName,
            //             type: item.DocumentType,
            //             heldWhere: item.StorageLocationOfDocument,
            //             note: item.Notes,
            //             fileUrl: item.fileUrl,
            //           };
            //         }),
            //       });
            //     }
            //     let policies = this.state.newPolicy;
            //     if (Array.isArray(policies) && policies.length > 0) {
            //       const allPromises = policies.map(async (item) => {
            //         if (item.file) {
            //           const formData = new FormData();
            //           formData.append("image", item.file);
            //           const uploaded = await MODULE_API.uploadImage(formData);
            //           delete item.file;
            //           return { ...item, fileUrl: uploaded.file_url };
            //         }
            //         return item;
            //       });
            //       let res = await Promise.all(allPromises);
            //       await DEATH_API.addPolicies({
            //         policiesForm: res.map((item) => {
            //           return {
            //             policyName: item.PolicysNickname,
            //             policyNumber: item.PolicyNumber,
            //             carrier: item.Carrier,
            //             contactName: item.ContactName,
            //             contactType: item.InsuranceType,
            //             phoneNumber: item.ContactPhone,
            //             fileUrl: item.fileUrl,

            //           };
            //         }),
            //       });
            //     }
            //     this.props.handleLoader()
            //     return true;
            //   } catch (error) {
            //     console.log(error);
            //     throw new Error(error);
            //   }
            // })
          }
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  savedOTP: state.rootReducer.loginUser.savedOtp
});

const mapDispatchToProps = { postSavedOtp };

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsForm);