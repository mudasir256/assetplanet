import React, { Component } from "react";
// import SubFormTable from "../../SubFormTable";
import { Icon, Row, Col, Input, Spin, Modal } from "antd";
import { states } from "../../../constants/moving_states";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import Header from "../components/header";
import Add from "../components/add";
import { saveAs } from 'file-saver';
import "../../custom/CustomSubFormTable.css";
import support from "../../../assets/images/latest/support.png";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import ContactModal from "../components/contactsmodal";
// import ContactsModalNew from "../components/ContactsModalNew";
import DEATH_API from "../../../apis/death.api";
import Report from "../../Report";
import ContactList from "../../ContactList";
import swal from 'sweetalert';
import MODULE_API from "../../../apis/module.api";
import axios from "axios";

const formName = "contactListForm";

class ContactListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_list: [],
      search: [],
      results: [],
      formData: {},
      isContactAddModalVisible: false,
      isTeamAddModalVisible: false,
      isContactUpdateModalVisible: false,
      isContactViewModalVisible: false,
      isTeamUpdateModalVisible: false,
      updateObject: null,
      selectedIndex: null,
      newData: [],
      audio: {},
      video: {},
      audioName: "",
      videoName: "",
      isLoading: false,
      MYID: "",
      searchParam: "",
      TooltipModal: false,

    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.contactListForm &&
      this.props.checklistObject.contactListForm.hasOwnProperty("contact_list")
    )
      this.setState({
        contact_list: this.props.checklistObject.contactListForm.contact_list,
      });
    (async () => {
      this.props.handleLoader()
      const ID = localStorage.getItem("accessId")
      this.setState({
        MYID: ID,
      });
      let data = await DEATH_API.fetchContactList(ID)

      // console.log("client contacts", data.data[0].clients_contact_lists)
      if (data && data.data) {
        this.setState({
          contact_list:
            data.data[0].clients_contact_lists.map((item, idx) => {
              item = {
                ...item,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                state: item.state,
                company: item.company,
                city: item.city,
                country: item.country,
                phone: `${item.primaryCountryCode} ${item.phoneNumber}`,
                note: item.note,
                Individual: item.isTrusted ? "Yes" : "No",
                audioUrl: item.audioUrl,
                videoUrl: item.videoUrl,
                audioFileName: item.audioFileName,
                videoFileName: item.videoFileName,
                alternatePhone: `${item.alternateCountryCode} ${item.alternatePhoneNumber}`,
                secondPasswordGranted: item.secondPasswordGranted ? "Yes" : "No",
                partOfCoreTeam: item.partOfCoreTeam ? "Yes" : "No",
                typeOfRelation: item.typeOfRelation,
                idx: idx + 1
              }
              delete item.primaryCountryCode;
              delete item.phoneNumber;
              delete item.alternateCountryCode;
              delete item.alternatePhoneNumber
              return item
            })
        })
      }
      this.props.handleLoader()
    })()
    this.props.handleChecklistObject(this.props.currentForm, this.state.contact_list)
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
  componentDidUpdate() {
    console.log("isLoading", this.state.isLoading);

  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevprops", prevState)
    if (this.props.searchParam !== prevProps.searchParam) {
      // this.setState({
      //   searchParam: this.props.searchParam
      // })
      try {
        this.setState({ isLoading: true })

        setTimeout(async () => {
          const res = await DEATH_API.searchContactList(this.state.searchParam);
          if (res.data.length > 0) {
            // this.setState({ isLoading: true })

            console.log("res.....", res.data[0].clients_contact_lists);
            let arr = res.data[0].clients_contact_lists.map((item, idx) => {
              item = {
                ...item,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                state: item.state,
                company: item.company,
                city: item.city,
                country: item.country,
                phone: `${item.primaryCountryCode} ${item.phoneNumber}`,
                note: item.note,
                Individual: item.isTrusted ? "Yes" : "No",
                audioUrl: item.audioUrl,
                videoUrl: item.videoUrl,
                audioFileName: item.audioFileName,
                videoFileName: item.videoFileName,
                alternatePhone: `${item.alternateCountryCode} ${item.alternatePhoneNumber}`,
                secondPasswordGranted: item.secondPasswordGranted ? "Yes" : "No",
                partOfCoreTeam: item.partOfCoreTeam ? "Yes" : "No",
                typeOfRelation: item.typeOfRelation,
                idx: idx + 1
              }
              delete item.primaryCountryCode;
              delete item.phoneNumber;
              delete item.alternateCountryCode;
              delete item.alternatePhoneNumber
              return item
            })
            console.log(arr);
            this.setState({
              contact_list: arr
            })


          }
        }, 300)


        this.setState({ isLoading: false })
      } catch (error) {
        this.setState({ isLoading: false })
        console.log(error)
      }
    }

  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("prevProps", prevState)
  //   if (prevState.MYID !== localStorage.getItem("accessId")) {
  //     console.log('pokemons state has changed.')
  //   }
  //   else {
  //     console.log('pokemons state has not changed.')
  //   }
  // }


  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for contact add modal
  setContactAddModalVisible = () => this.setState({ isContactAddModalVisible: !this.state.isContactAddModalVisible });

  // to handle hide and show for contact update modal
  setContactUpdateModalVisible = () => this.setState({ isContactUpdateModalVisible: !this.state.isContactUpdateModalVisible });
  // to handle hide and show for contact View modal
  setContactViewModalVisible = () => this.setState({ isContactViewModalVisible: !this.state.isContactViewModalVisible });


  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    // console.log("contact update form change", {
    //   updateObject: {
    //     ...this.state.updateObject,
    //     [index]: val,
    //   },
    // })
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });

  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };

  // Function to delete selected row
  deleteSelectedRow = async (idx, all_rows, name, id) => {

    console.log("id of deleted", id)
    console.log("index of deleted", idx)

    var that = this;
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this ?",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, delete it!"],
      icon: "warning",
      type: "warning",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then(async function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        try {
          that.props.handleLoader()
          await DEATH_API.deleteContact(id)
          const updatedRows = all_rows.filter((row, index) => {
            return index != idx - 1;
          });
          that.setState({
            contact_list: updatedRows,
          }, () => {
            that.props.handleChecklistObject(that.props.currentForm, that.state.contact_list)
          });
          that.props.handleLoader()
        } catch (error) {
          console.log(error);
          that.props.handleLoader()

        }
        setTimeout(async () => {
          swal("Deleted!", "Your file has been deleted.", "success");
        }, 0)
      } else {
        swal("Cancelled", "Your file is safe :)", "error");
      }
    });

    // this.props.handleLoader()
    // await DEATH_API.deleteContact(id)
    // const updatedRows = all_rows.filter((row, index) => {
    //   return index != idx - 1;
    // });
    // this.setState({
    //   contact_list: updatedRows,
    // }, () => {
    //   this.props.handleChecklistObject(this.props.currentForm, this.state.contact_list)
    // });
    // this.props.handleLoader()
  };


  // Function to get selected  array (row)
  getSelectedRow = (idx, rows, name) => {
    // console.log("idx>>>",idx)
    this.setState({
      selectedIndex: idx,
    });
    // get selected row (this will return array of object)
    let selectedRow = rows.filter((row, index) => {
      return index == idx - 1;
    });
    // get first and only element from list and store it in update object
    console.log("selectedRow[0]", selectedRow[0])
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


  //  function to update a specific contact row
  updateContactRow = async () => {
    console.log("this.state.updateObject contacts", this.state.updateObject)

    try {
      this.props.handleLoader()
      let obj = {
        ...this.state.updateObject,
        firstName: this.state.updateObject.firstName,
        lastName: this.state.updateObject.lastName,
        email: this.state.updateObject.email,
        state: this.state.updateObject.state,
        company: this.state.updateObject.company,
        city: this.state.updateObject.city,
        country: this.state.updateObject.country,
        phoneNumber: this.state.updateObject.phone,
        note: this.state.updateObject.note,
        alternatePhoneNumber: this.state.updateObject.alternatePhoneNumber,
        // AlternatePhone: this.state.updateObject.alternatePhoneNumber,
        audioUrl: this.state.updateObject.audioUrl,
        videoUrl: this.state.updateObject.videoUrl,
        audioFileName: this.state.updateObject.audioFileName,
        videoFileName: this.state.updateObject.videoFileName,
        typeOfRelation: this.state.updateObject.typeOfRelation,
        secondPasswordGranted: this.state.updateObject.secondPasswordGranted.toLowerCase() == 'yes' ? true : false,
        isTrusted: this.state.updateObject.Individual.toLowerCase() == 'yes' ? true : false,
        partOfCoreTeam: this.state.updateObject.partOfCoreTeam.toLowerCase() == 'yes' ? true : false,

        zipCode: this.state.updateObject.zipCode ? +this.state.updateObject.zipCode : null,
      };


      console.log("videoUrl >>>", obj["videoUrl"])


      if (obj["videoUrl"] != "string" && obj["videoUrl"] !== null && typeof obj["videoUrl"] === "object") {
        const formData = new FormData();
        formData.append("video", obj["videoUrl"]);

        const name = obj["videoUrl"].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: obj["videoUrl"].type })
        const resupload = await axios.put(resdata.uploadUrl, obj["videoUrl"], { headers: { 'Content-type': obj["videoUrl"].type } })
        const res = resdata.uploadUrl.split("?")[0]
        console.log("resss video url", res);
        // const uploaded = await MODULE_API.uploadImage(formData);
        obj.videoUrl = res;
        obj.videoFileName = name;
      }
      if (obj["audioUrl"] != "string" && obj["audioUrl"] !== null && typeof obj["audioUrl"] === "object") {
        console.log("2 else if");
        const formData = new FormData();
        formData.append("audio", obj["audioUrl"]);
        const name = obj["audioUrl"].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: obj["audioUrl"].type })
        const resupload = await axios.put(resdata.uploadUrl, obj["audioUrl"], { headers: { 'Content-type': obj["audioUrl"].type } })
        const res = resdata.uploadUrl.split("?")[0]
        console.log(res);
        console.log("resss audio url", res);
        // const uploaded = await MODULE_API.uploadImage(formData);
        obj.audioUrl = res;
        obj.audioFileName = name;
      }

      else {
        console.log("in else part")
      }


      console.log("here in api call update")

      let { contact_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      contact_list = [...this.state.contact_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      contact_list[index] = obj; // replace current updated object in contact_list based on index
      this.setState({ contact_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.contact_list)
      });
      console.log("obj.id>>>  for update contact ", obj.id, obj)

      const resupdate = await DEATH_API.updateContact(obj.id, obj)
      console.log("resupdate", resupdate);
      if (resupdate.status === 200) {
        swal("success", resupdate.message, "success")
      }
      else if (resupdate.status === 400) {
        swal("error", resupdate.message, "error")
      }
      const ID = localStorage.getItem("accessId")

      let datares = await DEATH_API.fetchContactList(ID)
      if (datares && datares.data) {
        this.setState({
          contact_list:
            datares.data[0].clients_contact_lists.map((item, idx) => {
              item = {
                ...item,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                state: item.state,
                company: item.company,
                city: item.city,
                country: item.country,
                phone: `${item.primaryCountryCode} ${item.phoneNumber}`,
                note: item.note,
                Individual: item.isTrusted ? "Yes" : "No",
                audioUrl: item.audioUrl,
                videoUrl: item.videoUrl,
                audioFileName: item.audioFileName,
                videoFileName: item.videoFileName,
                alternatePhone: `${item.alternateCountryCode} ${item.alternatePhoneNumber}`,
                secondPasswordGranted: item.secondPasswordGranted ? "Yes" : "No",
                partOfCoreTeam: item.partOfCoreTeam ? "Yes" : "No",
                typeOfRelation: item.typeOfRelation,
                idx: idx + 1
              }
              delete item.primaryCountryCode;
              delete item.phoneNumber;
              delete item.alternateCountryCode;
              delete item.alternatePhoneNumber
              return item
            })
        })
      }

      console.log("resupdate", resupdate)
      this.props.handleLoader()
    } catch (error) {
      console.log(error);
      // this.props.handleLoader()
      console.log("error in try catch",)
      this.props.handleLoader()

    }
  };

  // function to create contact row (data)
  createContact = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }
    // add current form data in contact_list list with keeping old data
    this.setState({
      contact_list: [currentFormData.formData, ...this.state.contact_list],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.contact_list)
    });
    var arr = [currentFormData.formData]
    try {
      let data = arr
      console.log("data in conatct list", arr)
      this.props.handleLoader()

      if (Array.isArray(data) && data.length > 0) {
        const allPromises = data.map(async (item) => {
          if (item.audio) {
            const formData = new FormData();
            formData.append("audio", item.audio);
            console.log("item.audio", item.audio)
            const name = item.audio.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: item.audio.type })
            const resupload = await axios.put(resdata.uploadUrl, item.audio, { headers: { 'Content-type': item.audio.type } })
            const res = resdata.uploadUrl.split("?")[0]
            console.log(res);
            // const resdata = await MODULE_API.uploadFile({fileExt: ext,contentType:file.type})
            // const resupload = await axios.put(resdata.uploadUrl,file,{headers:{'Content-type':file.type}})
            // const uploaded = await MODULE_API.uploadImage(formData);
            // console.log("file_urlfile_url audio", uploaded)

            delete item.audio;
            return { ...item, fileUrlAudio: res, audioName: name };
          }
          return item;
        });
        const allPromises1 = data.map(async (item) => {
          if (item.video) {
            const formData = new FormData();
            formData.append("video", item.video);
            console.log("item.video", item.video)
            const name = item.video.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: item.video.type })
            const resupload = await axios.put(resdata.uploadUrl, item.video, { headers: { 'Content-type': item.video.type } })
            const res = resdata.uploadUrl.split("?")[0]
            console.log(res);

            // const uploaded = await MODULE_API.uploadImage(formData);
            // console.log("file_urlfile_url video", uploaded)
            delete item.video;
            return { ...item, fileUrlVideo: res, videoName: name };
          }

          return item;
        });

        let res = await Promise.all(allPromises);
        let res1 = await Promise.all(allPromises1);

        console.log("res>>>> promises audio data", res[0].fileUrlAudio);
        console.log("res>>>> promises video data", res1[0].fileUrlVideo);
        this.setState({
          audio: res[0].fileUrlAudio,
        });
        this.setState({
          video: res1[0].fileUrlVideo,
        });
        this.setState({
          audioName: res[0].audioName,
        });
        this.setState({
          videoName: res1[0].videoName,
        });
        console.log("audio state", this.state.audioName)
        console.log("video state", this.state.videoName)

        // this.props.handleLoader()
        console.log("data contactlist payload...", data)
        const ID = localStorage.getItem("accessId")

        let api_res = await DEATH_API.addContactList({
          contactListForm: data.map(item => {
            return {
              firstName: item.FirstName,
              lastName: item.LastName,
              email: item.Email,
              state: item.State,
              company: item.Company,
              city: item.City,
              country: item.Country,
              phoneNumber: item.Phone,
              isTrusted: item.Individual && item.Individual.toLowerCase() === "yes" ? true : false,
              note: item.Notes,
              address: item.Address,
              alternatePhoneNumber: item.AlternatePhone,
              typeOfRelation: item.TypeOfRelation,
              partOfCoreTeam: item.partOfCoreTeam && item.partOfCoreTeam.toLowerCase() === "yes" ? true : false,
              audioUrl: this.state.audio,
              videoUrl: this.state.video,
              videoFileName: this.state.videoName,
              audioFileName: this.state.audioName,

              secondPasswordGranted: item.secondPasswordGranted && item.secondPasswordGranted.toLowerCase() === "yes" ? true : false,
              zipCode: item.ZipCode
            }
          })
        }, ID)
        console.log("api_res", api_res)
        // swal("Oops!", api_res.message, "error");
        // if(api_res){

        // }
        // this.props.handleLoader()

        let datares = await DEATH_API.fetchContactList(ID)
        if (datares && datares.data) {
          this.setState({
            contact_list:
              datares.data[0].clients_contact_lists.map((item, idx) => {
                item = {
                  ...item,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  email: item.email,
                  state: item.state,
                  company: item.company,
                  city: item.city,
                  country: item.country,
                  phone: `${item.primaryCountryCode} ${item.phoneNumber}`,
                  note: item.note,
                  Individual: item.isTrusted ? "Yes" : "No",
                  audioUrl: item.audioUrl,
                  videoUrl: item.videoUrl,
                  audioFileName: item.audioFileName,
                  videoFileName: item.videoFileName,
                  alternatePhone: `${item.alternateCountryCode} ${item.alternatePhoneNumber}`,
                  secondPasswordGranted: item.secondPasswordGranted ? "Yes" : "No",
                  partOfCoreTeam: item.partOfCoreTeam ? "Yes" : "No",
                  typeOfRelation: item.typeOfRelation,
                  idx: idx + 1
                }
                delete item.primaryCountryCode;
                delete item.phoneNumber;
                delete item.alternateCountryCode;
                delete item.alternatePhoneNumber
                return item
              })
          })
        }
        this.props.handleLoader()

        if (api_res.message === "Trustee.Already.exist") {
          swal("Oops!", api_res.message, "error");
        }
        console.log("api_res", api_res);

        if (api_res.status === "ERROR" || api_res.status === 400) {

          swal("Error", api_res.message, "error");

        }
        return api_res
      }
    } catch (error) {
      this.props.handleLoader()
      console.log("errrordds in catch block")
      // swal("Oops!", error.message, "error");
      this.props.handleLoader()
      // throw new Error(error)
    }


  };

  // function to create team row(data)
  createTeam = (currentFormData) => {

    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
    // add current form data in team_list list with keeping old data
    this.setState({
      team_list: [...this.state.team_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.team_list)
    });
  };



  // store all modal data in formData state
  setFormData = (value) => {
    // console.log('value is ', value)
    this.setState({
      formData: {
        ...this.state.formData,
        ...value,
      },
    });
  };



  // getContactRow = ({ data, index }) => {

  //   return (
  //     <Row type="flex" key={index} className="custom-sub-container">
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Name</span>
  //           <span className="custom-table-value-text">{data.Name}</span>
  //           {/* <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span> */}
  //         </div>
  //       </Col>
  //       {/* <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Last Name</span>
  //           <span className="custom-table-value-text">{data.LastName}</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //         </div>
  //       </Col> */}
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Phone</span>
  //           <span className="custom-table-value-text">{data.Phone}</span>
  //           {/* <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span> */}
  //         </div>
  //       </Col>
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Email</span>
  //           <span className="custom-table-value-text">{data.Email}</span>
  //           {/* <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Relationship</span>
  //           <span className="custom-table-value-text">{data.TypeOfRelation}</span>
  //           {/* <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Notes</span>
  //           <span className="custom-table-value-text">{data.Notes}</span>
  //           {/* <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Actions</span>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }}
  //               type="edit"
  //               onClick={() => {
  //                 const { contact_list } = this.state;
  //                 this.getSelectedRow(index, contact_list);

  //                 this.setContactUpdateModalVisible();
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }}
  //               type="delete"
  //               onClick={() => {
  //                 const { contact_list } = this.state;
  //                 const name = "contact";
  //                 this.deleteSelectedRow(index, contact_list, name, data.id);
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           {/* <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div> */}
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // };

  // getContactRow = ({ data, index }) => {
  //   console.log("index", index);
  //   return (
  //     <Row type="flex" key={index} >
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-value-text">{data.firstName || 'N/A'}</span>
  //           {/* <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span> */}
  //         </div>
  //       </Col>
  //       {/* <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Last Name</span>
  //           <span className="custom-table-value-text">{data.LastName}</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //         </div>
  //       </Col> */}
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-value-text">{data.Phone || 'N/A'}</span>
  //           {/* <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span> */}
  //         </div>
  //       </Col>
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-value-text">{data.Email || 'N/A'}</span>
  //           {/* <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-value-text">{data.TypeOfRelation || 'N/A'}</span>
  //           {/* <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-value-text">{data.Notes || 'N/A'}</span>
  //           {/* <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }}
  //               type="eye"
  //               onClick={() => {
  //                 const { contact_list } = this.state;
  //                 console.log("this.state without table",this.state)
  //                 this.getSelectedRow(index, contact_list);

  //                 this.setContactViewModalVisible();
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }}
  //               type="edit"
  //               onClick={() => {
  //                 const { contact_list } = this.state;
  //                 this.getSelectedRow(index, contact_list);
  //                 // console.log("row is printed upadte",this.getSelectedRow(index, contact_list))

  //                 this.setContactUpdateModalVisible();
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }}
  //               type="delete"
  //               onClick={() => {
  //                 const { contact_list } = this.state;
  //                 const name = "contact";
  //                 this.deleteSelectedRow(index, contact_list, name, data.id);
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           {/* <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div> */}
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // };


  // getTeamRow = ({ data, index }) => {
  //   return (
  //     <Row type="flex" key={index} className="custom-sub-container">
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">First Name</span>
  //           <span className="custom-table-value-text">{data.Name}</span>
  //           {/* <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span>
  //           <span className="custom-table-value-text">Adam Meyers</span> */}
  //         </div>
  //       </Col>
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Last Name</span>
  //           <span className="custom-table-value-text">{data.LastName}</span>
  //           {/* <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span>
  //           <span className="custom-table-value-text">Nicole</span> */}
  //         </div>
  //       </Col>
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Phone</span>
  //           <span className="custom-table-value-text">{data.Phone}</span>
  //           {/* <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span>
  //           <span className="custom-table-value-text">+1-234-5678</span> */}
  //         </div>
  //       </Col>
  //       <Col span={3}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Email</span>
  //           <span className="custom-table-value-text">{data.Email}</span>
  //           {/* <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span>
  //           <span className="custom-table-value-text">danish@google.com</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Relationship</span>
  //           <span className="custom-table-value-text">{data.TypeOfRelation}</span>
  //           {/* <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span>
  //           <span className="custom-table-value-text">Brother</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Notes</span>
  //           <span className="custom-table-value-text">{data.Notes}</span>
  //           {/* <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span>
  //           <span className="custom-table-value-text">Note will come here</span> */}
  //         </div>
  //       </Col>
  //       <Col span={4}>
  //         <div className="custom-field-alignments">
  //           <span className="custom-table-text">Actions</span>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }}
  //               type="edit"
  //               onClick={() => {
  //                 const { team_list } = this.state;
  //                 this.getSelectedRow(index, team_list);

  //                 this.setTeamtUpdateModalVisible();
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }}
  //               type="delete"
  //               onClick={() => {
  //                 const { team_list } = this.state;
  //                 const name = "team";
  //                 this.deleteSelectedRow(index, team_list, name);
  //               }}
  //             >

  //             </Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           {/* <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div>
  //           <div className="custom-table-icon-align">
  //             <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="save"></Icon>
  //             <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
  //           </div> */}
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // };

  downloadContacts = async () => {

    try {
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId")

      const res = await DEATH_API.exportPolicySheet("contact", ID);
      this.props.handleLoader();
      console.log("ContactSheet", res.url);
      saveAs(res.url, 'ContactSheet');
      if (res.message === "no.record.found") {

        swal("Oops!", res.message, "error")
      }
      else {
        swal("Success!", res.message, "success")

      }

      console.log("res", res.message)

    } catch (error) {
      console.log(error)
    }

  };

  render() {
    // console.log('type of relation', this.state.contact_list)
    const largeBills = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        fields: [
          {
            type: "Input",
            name: "name",
          },
        ],
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        fields: [
          {
            type: "Input",
            name: "company",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "address",
          },
        ],
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        fields: [
          {
            type: "Input",
            name: "city",
          },
        ],
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        fields: [
          {
            type: "Select",
            name: "state",
            placeholder: "-Select-",
            values: states,
          },
        ],
      },
      {
        title: "Zip Code",
        dataIndex: "zip_code",
        key: "zip_code",
        fields: [
          {
            type: "Input",
            name: "zip_code",
          },
        ],
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        fields: [
          {
            type: "Input",
            name: "country",
          },
        ],
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        fields: [
          {
            type: "PhoneNumber",
            name: "phone",
          },
        ],
      },
      {
        title: "Alternate Phone",
        dataIndex: "alternate_phone",
        key: "alternate_phone",
        fields: [
          {
            type: "PhoneNumber",
            name: "alternate_phone",
          },
        ],
      },
    ];

    const Search = [
      {
        title: "Name",
        dataIndex: "first_name",
        key: "first_name",
        fields: [
          {
            type: "Input",
            name: "first_name",
          },
        ],
      },
      // {
      //   title: "LAst Name",
      //   dataIndex: "last_name",
      //   key: "last_name",
      //   fields: [
      //     {
      //       type: "Input",
      //       name: "last_name",
      //     },
      //   ],
      // },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        fields: [
          {
            type: "Input",
            name: "company",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "address",
          },
        ],
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        fields: [
          {
            type: "Input",
            name: "city",
          },
        ],
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        fields: [
          {
            type: "Input",
            name: "state",
          },
        ],
      },
      {
        title: "Zip Code",
        dataIndex: "zip_code",
        key: "zip_code",
        fields: [
          {
            type: "Input",
            name: "zip_code",
          },
        ],
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        fields: [
          {
            type: "Input",
            name: "country",
          },
        ],
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        fields: [
          {
            type: "Input",
            name: "phone",
          },
        ],
      },
      {
        title: "Alt Phone",
        dataIndex: "alt_phone",
        key: "alt_phone",
        fields: [
          {
            type: "Input",
            name: "alt_phone",
          },
        ],
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
        fields: [
          {
            type: "Input",
            name: "relationship",
          },
        ],
      },
      {
        title: "Profession",
        dataIndex: "profession",
        key: "profession",
        fields: [
          {
            type: "Input",
            name: "profession",
          },
        ],
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        fields: [
          {
            type: "Input",
            name: "email",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "Input",
            name: "notes",
          },
        ],
      },
    ];

    const contactFields = [
      {
        title: "First Name",
        type: "nameInput",
        index: "FirstName"
      },
      {
        title: "Last Name",
        type: "nameInput",
        index: "LastName"
      },
      {
        title: "Type Of Relation",
        type: "select",
        options: ["Accounting - CPA", "Accounting - Bookkeeper", "Consultant", "Family", "Financial Services - Advisor", "Financial Services - Wealth Planner", "Financial Services - Insurance Agent Property", "Financial Services - Insurance Agent Life", "Friend", "Health - Doctor", "Health - Dentist", "Health - Veterinarian", "Health - Pharmacist", "Lawyer", "Professional", "Others"],
        index: "TypeOfRelation"
      },
      {
        title: "Phone",
        type: "phoneNumber",
        index: "Phone"
      },
      {
        title: "Alternate Phone",
        type: "phoneNumberA",
        index: "AlternatePhone"
      },
      {
        title: "Email",
        type: "email",
        index: "Email"
      },
      {
        title: "Address",
        type: "input",
        index: "Address"
      },
      {
        title: "City",
        type: "input",
        index: "City"
      },
      {
        title: "State",
        type: "input",
        index: "State"
      },
      // {
      //   title: "Country",
      //   type: "input",
      //   index: "Country"
      // },
      {
        title: "Zip Code",
        type: "input",
        index: "ZipCode"
      },

      {
        title: "Company",
        type: "input",
        index: "Company"
      },
      // {
      //   title: "Phone",
      //   type: "phone",
      //   index: "Phone"
      // },
      // {
      //   title: "Alternate Phone",
      //   type: "phone",
      //   index: "AlternatePhone"
      // },

      {
        title: "*Trusted Indvidual*",
        type: "radio",
        index: "Individual"
      },
      {
        title: "Second Password Granted",
        type: "radio",
        index: "secondPasswordGranted"
      },
      {
        title: "Part of Core Team",
        type: "radio",
        index: "partOfCoreTeam"
      },
      // {
      //   title: "Email",
      //   type: "input",
      //   index: "Email"
      // },
      // {
      //   title: "Company",
      //   type: "input",
      //   index: "Company"
      // },

      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
      {
        title: "Video",
        type: "video",
        index: "Video"
      },
      {
        title: "Audio",
        type: "audio",
        index: "Audio"
      },
    ];


    const UpdateContactFields = [
      {
        title: "First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "Phone",
        type: "phoneNumber",
        index: "phone"
      },

      {
        title: "Alternate Phone",
        type: "phoneNumberA",
        index: "alternatePhoneNumber"
      },

      {
        title: "Address",
        type: "input",
        index: "address"
      },
      {
        title: "City",
        type: "input",
        index: "city"
      },
      {
        title: "State",
        type: "input",
        index: "state"
      },
      // {
      //   title: "Country",
      //   type: "input",
      //   index: "Country"
      // },
      {
        title: "Zip Code",
        type: "input",
        index: "zipCode"
      },
      {
        title: "Email",
        type: "email",
        index: "email"
      },
      {
        title: "Company",
        type: "input",
        index: "company"
      },

      {
        title: "Type Of Relation",
        type: "select",
        options: ["Accounting - CPA", "Accounting - Bookkeeper", "Consultant", "Family", "Financial Services - Advisor", "Financial Services - Wealth Planner", "Financial Services - Insurance Agent Property", "Financial Services - Insurance Agent Life", "Friend", "Health - Doctor", "Health - Dentist", "Health - Veterinarian", "Health - Pharmacist", "Lawyer", "Professional", "Others"],
        index: "typeOfRelation"
      },
      {
        title: "*Trusted Indvidual*",
        type: "radio",
        index: "Individual"
      },
      {
        title: "Second Password Granted",
        type: "radio",
        index: "secondPasswordGranted"
      },
      {
        title: "Part of Core Team",
        type: "radio",
        index: "partOfCoreTeam"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "note"
      },
      {
        title: "Video",
        type: "video",
        index: "videoUrl"
      },
      {
        title: "Audio",
        type: "audio",
        index: "audioUrl"
      },
    ];

    const contact_cols = [
      {
        title: "First Name",
        dataIndex: "firstName",
        sorter: (a, b) =>
          a.firstName > b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1,
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        sorter: (a, b) => a["lastName"] > b["lastName"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        // sorter: (a, b) => a["Phone"] > b["Phone"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Email",
        dataIndex: "email",
        // sorter: (a, b) => a["Email"] > b["Email"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Trusted Team*",
        dataIndex: "Individual",
        filters: [
          {
            text: 'Trusted',
            value: 'Yes',
          },
          {
            text: 'Not Trusted',
            value: 'No',
          },
        ],
        onFilter: (value, record) => record.Individual.indexOf(value) === 0,
        sorter: (a, b) => a["Individual"] > b["Individual"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Type of Relation",
        dataIndex: "typeOfRelation",
        sorter: (a, b) => a["typeOfRelation"] > b["typeOfRelation"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Confidential Access*",
        dataIndex: "secondPasswordGranted",
        sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Notes",
        dataIndex: "note",
        // key: "account",
        // sorter: (a, b) => a["Notes"] > b["Notes"],
        // sorter: (a, b) =>
        //   a["Notes"] > b["Notes"] ? 1 : a["Notes"] === b["Notes"] ? 0 : -1,
        render: (record) => (record ? record : "N/A"),
      },

      {
        title: "Action",
        render: (record, index) => {
          // console.log("index...>>>",record.idx);
          return (
            <Col span={18}>
              <div className="custom-field-alignments">
                <div className="custom-table-icon-align">
                  <Icon style={{ fontSize: "20px" }}
                    type="eye"
                    onClick={() => {
                      const { contact_list } = this.state;
                      // console.log("this.state..",this.state)
                      this.getSelectedRow(record.idx, contact_list);

                      this.setContactViewModalVisible();
                    }}
                  >

                  </Icon>
                  {role !== "protrustee" &&
                    <Icon style={{ fontSize: "20px", marginLeft: "5px" }}
                      type="edit"
                      onClick={() => {
                        const { contact_list } = this.state;
                        this.getSelectedRow(record.idx, contact_list);
                        // console.log("row is printed upadte",this.getSelectedRow(index, contact_list))

                        this.setContactUpdateModalVisible();
                      }}
                    >

                    </Icon>
                  }
                  {role !== "protrustee" &&
                    <Icon style={{ fontSize: "20px", marginLeft: "5px" }}
                      type="delete"
                      onClick={() => {
                        const { contact_list } = this.state;
                        const name = "contact";
                        this.deleteSelectedRow(record.idx, contact_list, name, record.id);
                      }}
                    >

                    </Icon>
                  }
                  {/*  <Icon style={{ fontSize: "20px", marginLeft: "5px" }} type="save"></Icon>
                  <Icon style={{ fontSize: "20px", marginLeft: "5px" }} type="printer"></Icon>
                  */}
                </div>
                {/* <div className="custom-table-icon-align">
                <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
                <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
                <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
              </div>
              <div className="custom-table-icon-align">
                <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
                <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
                <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
              </div>
              <div className="custom-table-icon-align">
                <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
                <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
                <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
              </div>
              <div className="custom-table-icon-align">
                <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
                <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
                <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
              </div>
              <div className="custom-table-icon-align">
                <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
                <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
                <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
              </div> */}
              </div>
            </Col>
          );
        },
      },
    ];
    // const teamFields = [
    //   {
    //     title: "Name",
    //     type: "input",
    //     index: "tName"
    //   },
    //   {
    //     title: "Last Name",
    //     type: "input",
    //     index: "tLastName"
    //   },
    //   {
    //     title: "Address",
    //     type: "input",
    //     index: "tAddress"
    //   },
    //   {
    //     title: "City",
    //     type: "input",
    //     index: "tCity"
    //   },
    //   {
    //     title: "State",
    //     type: "input",
    //     index: "tState"
    //   },
    //   {
    //     title: "Country",
    //     type: "input",
    //     index: "tCountry"
    //   },
    //   {
    //     title: "Zip Code",
    //     type: "input",
    //     index: "tZipCode"
    //   },
    //   {
    //     title: "Phone",
    //     type: "phone",
    //     index: "tPhone"
    //   },
    //   {
    //     title: "Alternate Phone",
    //     type: "phone",
    //     index: "tAlternatePhone"
    //   },
    //   {
    //     title: "Part Of My Professional Team",
    //     type: "radio",
    //     index: "tPartOfMyProfessionalTeam"
    //   },
    //   {
    //     title: "Email",
    //     type: "email",
    //     index: "tEmail"
    //   },
    //   {
    //     title: "Company",
    //     type: "input",
    //     index: "tCompany"
    //   },
    //   {
    //     title: "Type Of Relation",
    //     type: "select",
    //     options: ["Abc", "Def"],
    //     index: "tTypeOfRelation"
    //   },
    //   {
    //     title: "Notes",
    //     type: "textarea",
    //     index: "tNotes"
    //   },
    // ];


    // const UpdateTeamFields = [
    //   {
    //     title: "Name",
    //     type: "input",
    //     index: "tName"
    //   },
    //   {
    //     title: "Last Name",
    //     type: "input",
    //     index: "tLastName"
    //   },
    //   {
    //     title: "Address",
    //     type: "input",
    //     index: "tAddress"
    //   },
    //   {
    //     title: "City",
    //     type: "input",
    //     index: "tCity"
    //   },
    //   {
    //     title: "State",
    //     type: "input",
    //     index: "tState"
    //   },
    //   {
    //     title: "Country",
    //     type: "input",
    //     index: "tCountry"
    //   },
    //   {
    //     title: "Zip Code",
    //     type: "input",
    //     index: "tZipCode"
    //   },
    //   {
    //     title: "Phone",
    //     type: "phone",
    //     index: "tPhone"
    //   },
    //   {
    //     title: "Alternate Phone",
    //     type: "phone",
    //     index: "tAlternatePhone"
    //   },
    //   {
    //     title: "Part Of My Professional Team",
    //     type: "radio",
    //     index: "tPartOfMyProfessionalTeam"
    //   },
    //   {
    //     title: "Email",
    //     type: "email",
    //     index: "tEmail"
    //   },
    //   {
    //     title: "Company",
    //     type: "input",
    //     index: "tCompany"
    //   },
    //   {
    //     title: "Type Of Relation",
    //     type: "select",
    //     options: ["Abc", "Def"],
    //     index: "tTypeOfRelation"
    //   },
    //   {
    //     title: "Notes",
    //     type: "textarea",
    //     index: "tNotes"
    //   },
    // ];

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
      handleRadioChange,
      role
    } = this.props;
    console.log("this.state.updateObject", this.state.updateObject)
    return (
      <React.Fragment>
        <ContactModal
          title={"Add New Contact"}
          fields={contactFields}
          isVisible={this.state.isContactAddModalVisible}
          cbClose={this.setContactAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          handleRadioChange={handleRadioChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createContact}
        />

        {/* 
        <AddModal
          title={"Add New Team"}
          fields={teamFields}
          isVisible={this.state.isTeamAddModalVisible}
          cbClose={this.setTeamAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createTeam}
        /> */}


        <UpdateModal
          title={"Update Contact"}
          fields={UpdateContactFields}
          isVisible={this.state.isContactUpdateModalVisible}
          cbClose={this.setContactUpdateModalVisible}
          cbUpdate={this.updateContactRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}
        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"List View Only"}
          fields={UpdateContactFields}
          isVisible={this.state.isContactViewModalVisible}
          cbClose={this.setContactViewModalVisible}
          // cbUpdate={this.updateContactRow}
          // onLoad={this.get}
          obj={this.state.updateObject}

        // onConstraints={this.onConstraints}
        />

        {/* <UpdateModal
          title={"Update Team"}
          fields={UpdateTeamFields}
          isVisible={this.state.isTeamUpdateModalVisible}
          cbClose={this.setTeamUpdateModalVisible}
          cbUpdate={this.updateTeamRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        /> */}

        {/* <Header image={support} title={"Contact List"} />*/}
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={support}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Contact List
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

        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Contact List</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                This web-based program does not worry about operating system or device types so that you
                may access anywhere and retrieve contacts relevant to the Plan Creator.  This is a simple,
                yet complicated functionality of our program as each contact added can be assigned a
                certain permission group or role by the Plan Creator.  Each contact also can have fields to
                denote their profession and if they are part of a Trusted Team.  For example, one group
                might be pickleball friends, another group college buddies, or a contact can be listed as a
                lawyer-cpa-financial expert, and more.  By creating this contact list feature, Trusted
                Individuals can quickly and easily assess who are those people on the “Trusted Team” and
                what notes did they leave or interactions have they posted.  Care and collaboration help
                reduce chaos and lead to better outcomes for a difficult situation.
              </h2>

            </div>
          </div>
        </Modal>
        <Add
          // title={"Has Access To Death Module"}
          button={"Add New Contact"}
          cbAdd={this.setContactAddModalVisible}
          // isDisabled={role !== "protrustee" ? false : true}
          list={[
            {
              option: "Download Contact List",
              cb: this.downloadContacts,
              isDisabled: true,
            },

          ]}

        />
        {/* get contact row */}
        {/*    <table className="custom-sub-container-table" >
          <tr type="flex" className="custom-sub-container-row">
            <Row type="flex"  >
              <Col span={3}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Name</th>
                </div></Col>
              <Col span={3}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Phone</th>
                </div></Col>
              <Col span={3}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Email</th>
                </div></Col>
              <Col span={4}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Relationship</th> </div></Col>

              <Col span={4}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Notes</th>
                </div></Col>
              <Col span={4}>
                <div className="custom-field-alignments">
                  <th className="custom-table-text">Action</th>
                </div></Col>

            </Row>
          </tr>
          {this.state.contact_list.map((data, index) =>
            <tr type="flex" key={index} className="custom-sub-container-row" >
              {this.getContactRow({ data, index: index + 1 })}
            </tr>
          )}

        </table>
      */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Input
            addonAfter={
              <Icon
                type="search"
                style={{
                  position: "relative",
                  top: "-3px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
            }
            onChange={async (event) => {
              console.log("value of search", event.target.value)
              this.setState({ searchParam: event.target.value })
              try {
                this.setState({ isLoading: true })

                setTimeout(async () => {
                  const res = await DEATH_API.searchContactList(this.state.searchParam);
                  console.log("res", res)
                  if (res.data && res.data.length > 0) {
                    // this.setState({ isLoading: true })

                    console.log("res.....", res.data[0].clients_contact_lists);
                    let arr = res.data[0].clients_contact_lists.map((item, idx) => {
                      item = {
                        ...item,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        state: item.state,
                        company: item.company,
                        city: item.city,
                        country: item.country,
                        phone: `${item.primaryCountryCode} ${item.phoneNumber}`,
                        note: item.note,
                        Individual: item.isTrusted ? "Yes" : "No",
                        audioUrl: item.audioUrl,
                        videoUrl: item.videoUrl,
                        audioFileName: item.audioFileName,
                        videoFileName: item.videoFileName,
                        alternatePhone: `${item.alternateCountryCode} ${item.alternatePhoneNumber}`,
                        secondPasswordGranted: item.secondPasswordGranted ? "Yes" : "No",
                        partOfCoreTeam: item.partOfCoreTeam ? "Yes" : "No",
                        typeOfRelation: item.typeOfRelation,
                        idx: idx + 1
                      }
                      delete item.primaryCountryCode;
                      delete item.phoneNumber;
                      delete item.alternateCountryCode;
                      delete item.alternatePhoneNumber
                      return item
                    })
                    console.log(arr);
                    this.setState({
                      contact_list: arr
                    })


                  }
                }, 1000)


                this.setState({ isLoading: false })
              } catch (error) {
                this.setState({ isLoading: false })
                console.log(error)
              }

            }}

            style={{ width: "50%", height: "30%" }}
            size={"large"}
            placeholder="Search Contacts"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          {this.state.isLoading ?
            <Spin />
            : <React.Fragment></React.Fragment>
          }
        </div>
        <ContactList
          // loading={this.state.report_rows ? false : true}
          // loading={
          //   this.state.contact_list ? this.state.contact_list <= 0 : false
          // }
          cols={contact_cols}
          rows={this.state.contact_list}
        // onChange={this.handleChange}
        ></ContactList>
        {/* {this.state.contact_list.map((data, index) =>
          this.getContactRow({ data, index: index + 1 })
        )}

         
        <Add
          title={"Professional Team"}
          button={"Add New Professional Team"}
          cbAdd={this.setTeamAddModalVisible}
        /> */}

        {/* get team row */}
        {/* {this.state.team_list.map((data, index) =>
          this.getTeamRow({ data, index: index + 1 })
        )} */}



        {/*  <Add title={"Search Results"} />
         {this.getRow()} */}


        <Footer
          cbPrev={this.props.previousForm}
          cbNext={this.props.nextForm
            //   this.props.nextForm(async () => {
            //   try {
            //     let data = this.state.newData
            //     console.log("data in conatct list", data)
            //     this.props.handleLoader()

            //     if (Array.isArray(data) && data.length > 0) {
            //       const allPromises = data.map(async (item) => {
            //         if (item.audio) {
            //           const formData = new FormData();
            //           formData.append("audio", item.audio);
            //           console.log("item.audio",item.audio)
            //           const name = item.audio.name;
            //           const lastDot = name.lastIndexOf('.');
            //           const fileName = name.substring(0, lastDot);
            //           const ext = name.substring(lastDot + 1);
            //            const resdata = await MODULE_API.uploadFile({fileExt: ext,contentType:item.audio.type})
            //           const resupload = await axios.put(resdata.uploadUrl,item.audio,{headers:{'Content-type':item.audio.type}})
            //           const res = resdata.uploadUrl.split("?")[0]
            //           console.log(res);
            //           // const resdata = await MODULE_API.uploadFile({fileExt: ext,contentType:file.type})
            //           // const resupload = await axios.put(resdata.uploadUrl,file,{headers:{'Content-type':file.type}})
            //           // const uploaded = await MODULE_API.uploadImage(formData);
            //           // console.log("file_urlfile_url audio", uploaded)

            //           delete item.audio;
            //           return { ...item, fileUrlAudio: res };
            //         }
            //         return item;
            //       });
            //       const allPromises1 = data.map(async (item) => {
            //         if (item.video) {
            //           const formData = new FormData();
            //           formData.append("video", item.video);
            //           console.log("item.video",item.video)
            //           const name = item.video.name;
            //           const lastDot = name.lastIndexOf('.');
            //           const fileName = name.substring(0, lastDot);
            //           const ext = name.substring(lastDot + 1);
            //            const resdata = await MODULE_API.uploadFile({fileExt: ext,contentType:item.video.type})
            //           const resupload = await axios.put(resdata.uploadUrl,item.video,{headers:{'Content-type':item.video.type}})
            //           const res = resdata.uploadUrl.split("?")[0]
            //           console.log(res);

            //           // const uploaded = await MODULE_API.uploadImage(formData);
            //           // console.log("file_urlfile_url video", uploaded)
            //           delete item.video;
            //           return { ...item, fileUrlVideo: res };
            //         }

            //         return item;
            //       });

            //       let res = await Promise.all(allPromises);
            //       let res1 = await Promise.all(allPromises1);

            //       console.log("res>>>> promises audio data", res[0].fileUrlAudio);
            //       console.log("res>>>> promises video data", res1[0].fileUrlVideo);
            //       this.setState({
            //         audio: res[0].fileUrlAudio,
            //       });
            //       this.setState({
            //         video: res1[0].fileUrlVideo,
            //       });
            //       console.log("audio state", this.state.audio)
            //       console.log("video state", this.state.video)

            //       // this.props.handleLoader()
            //       console.log("data contactlist payload...", data)
            //       let api_res = await DEATH_API.addContactList({
            //         contactListForm: data.map(item => {

            //           return {
            //             firstName: item.FirstName,
            //             lastName: item.LastName,
            //             email: item.Email,
            //             state: item.State,
            //             company: item.Company,
            //             city: item.City,
            //             country: item.Country,
            //             phoneNumber: item.Phone,
            //             isTrusted: item.Individual.toLowerCase() === "yes" ? true : false,
            //             note: item.Notes,
            //             address: item.Address,
            //             alternatePhoneNumber: item.AlternatePhone,
            //             typeOfRelation: item.TypeOfRelation,
            //             audioUrl: this.state.audio,
            //             videoUrl: this.state.video,

            //             partOfProfessionalTeam: item.PartOfMyProfessionalTeam.toLowerCase() === "yes" ? true : false,
            //             zipCode: item.ZipCode
            //           }
            //         })
            //       })
            //       this.props.handleLoader()
            //       return api_res
            //     }
            //   } catch (error) {
            //     this.props.handleLoader()
            //     console.log(error)
            //     // this.props.handleLoader()
            //     throw new Error(error)
            //   }
            // })
          }
        />

      </React.Fragment>
    );
  }
}

export default ContactListForm;
