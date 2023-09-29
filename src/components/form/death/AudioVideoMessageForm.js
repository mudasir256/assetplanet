import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal, Upload } from "antd";
import video2 from "../../../assets/images/video2.png";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import Header from "../components/header";
import Add from "../components/add";
import "../../custom/CustomSubFormTable.css";
import speaker from "../../../assets/images/speaker.png"
import audioThumb from "../../../assets/images/audiothumb.jpeg"
import videoThumb from "../../../assets/images/videothumb.jpg"
import { WebcamStreamCapture } from "../../../helpers/Recorder";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import MODULE_API from "../../../apis/module.api";
import Loader from "../../../components/styled-components/loader/loader";
import DEATH_API from "../../../apis/death.api";
import swal from "sweetalert";
import axios from "axios";

const formName = "audioVideoForm";

class AudioVideoMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio_video: {},
      formData: {},
      showModal: false,
      showAudioModal: false,
      showVideo: false,
      showAudio: false,
      recordState: null,
      audioData: null,
      currentType: null,
      showUploading: false,
      videoName: "",
      audioName: "",
      isLoading: false,
      TooltipModal: false,


    };
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

  componentDidMount() {
    if (
      this.props.checklistObject.audioVideoForm &&
      this.props.checklistObject.audioVideoForm.hasOwnProperty("audio_video")
    )
      this.setState({
        audio_video: this.props.checklistObject.audioVideoForm.audio_video,
      });
    (async () => {
      try {
        this.props.handleLoader()
        const ID = localStorage.getItem("accessId")
        const data = await DEATH_API.fetchAudioVideo(ID)
        if (data && data.data)
          this.setState({
            audio_video: data.data,
          });
        this.props.handleLoader()
      } catch (error) {
        console.log(error)
        this.props.handleLoader()
      }

    })();

  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  onStop = async (audioData) => {
    this.setState({
      audioData: audioData,
    });
    console.log("audioData", audioData);
    var file = new File([audioData.blob], "recorded.mp3", { type: "audio/wav" });
    console.log("audio file", file)
    this.setState({ isLoading: true })
    const resdata = await MODULE_API.uploadFile({ fileExt: "mp3", contentType: "audio/wav" })
    const resupload = await axios.put(resdata.uploadUrl, file, {
      headers: { 'Content-type': file.type }
    }
    )
    const res = resdata.uploadUrl.split("?")[0]
    console.log("audio url ", res);
    this.setState({ audio_video: { ...this.state.audio_video, [this.state.currentType]: res } })
    await this.updateRecord()
    this.setState({ isLoading: false })
    this.setState({ showAudioModal: false });
    swal("Uploaded!", "Your file has been Uploaded.", "success");

  };
  async updateRecord() {
    await DEATH_API.updateAudioVideo({
      incapacitatedAudio: null,
      incapacitatedVideo: null,
      spouseVideo: null,
      spouseAudio: null,
      familyAudio: null,
      familyVideo: null,
      friendsVideo: null,
      friendsAudio: null,
      ...this.state.audio_video
    })
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  getAudioVideoRow = ({ name, arr }) => {
    name = name.split('/')[0].toLowerCase().trim()
    const { role } = this.props;
    console.log("role in audio video file", role)
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={6}></Col>
          <Col span={6}>
            <div className="custom-audio-video-container">
              <div>
                {/* <Icon type="delete" style={{ fontSize: "20px" }}></Icon> */}
              </div>
              {this.state.audio_video.hasOwnProperty(`${name}Video`) && this.state.audio_video[`${name}Video`] ?
                <React.Fragment>
                  <div style={{ color: "red", cursor: "pointer", display: "contents" }} onClick={() => {
                    this.setState({ showVideo: true });
                    this.setState({ videoName: name });
                    console.log("on click", name);
                    console.log("video url to watch", this.state.audio_video[`${name}Video`]);
                  }}>
                    <img style={{ width: "40px", height: "40px", marginBottom: "4px" }} src={videoThumb}></img>
                    <span style={{ color: "green" }}>Watch Now</span>
                  </div>
                  {
                    this.state.showVideo && (
                      <>
                        {console.log(`${this.state.videoName}`, this.state.audio_video[`${this.state.videoName}Video`])}
                        <Modal
                          closable={false}
                          // width="55vw"
                          centered
                          visible={true}
                          title={"Watch Video"}
                          footer={false}
                        >
                          <div style={{
                            display: "flex", height: "fit-content",
                            margin: "auto",
                            width: "20rem",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}>
                            <video style={{ height: "20rem", width: "20rem" }} controls>
                              <source src={this.state.videoName && this.state.audio_video[`${this.state.videoName}Video`]} type="video/mp4" />
                            </video>
                          </div>
                          <div
                            className="custom-add-audio-video"
                            style={{ width: "fit-content", marginTop: "8px", marginInline: "auto" }}
                            onClick={() => {
                              this.setState({ showVideo: false });
                            }}
                          >
                            <span style={{ color: "white" }}>Cancel</span>
                          </div>
                        </Modal>
                      </>
                    )
                  }
                </React.Fragment>
                : <span className="custom-media-header">No Media</span>}
              {role !== "protrustee" && (
                <React.Fragment>
                  <div
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showModal: true, currentType: `${name}Video` });
                    }}
                  >
                    <span style={{ color: "white" }}>Add Video</span>
                  </div>
                  {this.state.audio_video.hasOwnProperty(`${name}Video`) && this.state.audio_video[`${name}Video`]
                    && < div
                      style={{ marginTop: "10px" }}
                      className="custom-add-audio-video"
                      onClick={async () => {
                        // swal("Oops!", "Are you sure you want to delete this media file?", "error");
                        // this.props.handleLoader()
                        // let obj = { ...this.state.audio_video, [`${name}Video`]: null }
                        // this.setState({ audio_video: { ...obj } });
                        // setTimeout(async () => {
                        //   await this.updateRecord()
                        //   this.props.handleLoader()
                        // }, 0)
                        var that = this;
                        swal({
                          title: "Are you sure?",
                          text: "Are you sure you want to delete this media file?",
                          dangerMode: true,
                          buttons: ["No, cancel it!", "Yes, delete it!"],
                          icon: "warning",
                          type: "warning",
                          closeOnConfirm: false,
                          closeOnCancel: false
                        }).then(function (isConfirm) {
                          // Redirect the user
                          if (isConfirm) {
                            that.props.handleLoader()
                            let obj = { ...that.state.audio_video, [`${name}Video`]: null }
                            that.setState({ audio_video: { ...obj } });
                            setTimeout(async () => {
                              await that.updateRecord()
                              that.props.handleLoader()
                              swal("Deleted!", "Your file has been deleted.", "success");
                            }, 0)
                          } else {
                            swal("Cancelled", "Your file is safe :)", "error");
                          }
                        });
                      }}
                    >
                      <span style={{ color: "white" }}>Remove Video</span>
                    </div>}
                </React.Fragment>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-audio-video-container">
              {this.state.audio_video.hasOwnProperty(`${name}Audio`) && this.state.audio_video[`${name}Audio`] ?
                <React.Fragment>
                  <div style={{ color: "red", cursor: "pointer", display: "contents" }} onClick={() => {
                    console.log("Audio file to show", this.state.audio_video[`${name}Audio`]);
                    this.setState({ showAudio: true });
                    this.setState({ audioName: name });
                  }}>

                    <img style={{ width: "40px", height: "40px", marginBottom: "4px" }} src={audioThumb}></img>
                    <span style={{ color: "green" }}>Listen Now</span>
                  </div>
                  {
                    this.state.showAudio && (
                      <>
                        {console.log("Audio file to show", this.state.audio_video[`${this.state.audioName}Audio`])}
                        <Modal
                          closable={false}
                          // width="55vw"
                          centered
                          visible={true}
                          title={"Watch Audio"}
                          footer={false}
                        >
                          <div>
                            <div style={{
                              display: "flex", height: "fit-content",
                              margin: "auto",
                              width: "20rem",
                              backgroundImage: `url('${speaker}')`,
                              backgroundSize: "15rem",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              justifyContent: "space-between",
                              alignItems: "center"
                            }} >
                              <audio style={{ height: "20rem", width: "20rem", }} controls>
                                <source src={this.state.audio_video[`${this.state.audioName}Audio`]} type="audio/mpeg" />
                              </audio>
                            </div>
                          </div>
                          <div
                            className="custom-add-audio-video"
                            style={{ width: "fit-content", marginTop: "8px", marginInline: "auto" }}
                            onClick={() => {
                              this.setState({ showAudio: false });
                            }}
                          >
                            <span style={{ color: "white" }}>Cancel</span>
                          </div>

                        </Modal>
                      </>
                    )
                  }
                </React.Fragment>

                : <span className="custom-media-header">No Media</span>}
              {role !== "protrustee" && (
                <React.Fragment>
                  <div
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showAudioModal: true, currentType: `${name}Audio` });
                    }}
                  >
                    <span style={{ color: "white" }}>Add Audio</span>
                  </div>
                  {this.state.audio_video.hasOwnProperty(`${name}Audio`) && this.state.audio_video[`${name}Audio`] && <div
                    style={{ marginTop: "10px" }}
                    className="custom-add-audio-video"
                    onClick={async () => {
                      var that = this;
                      swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to delete this media file?",
                        dangerMode: true,
                        buttons: ["No, cancel it!", "Yes, delete it!"],
                        icon: "warning",
                        type: "warning",
                        closeOnConfirm: false,
                        closeOnCancel: false
                      }).then(function (isConfirm) {
                        // Redirect the user
                        if (isConfirm) {
                          that.props.handleLoader()
                          let obj = { ...that.state.audio_video, [`${name}Audio`]: null }
                          that.setState({ audio_video: { ...obj } });
                          setTimeout(async () => {
                            await that.updateRecord()
                            that.props.handleLoader()
                            swal("Deleted!", "Your file has been deleted.", "success");
                          }, 0)
                        } else {
                          swal("Cancelled", "Your file is safe :)", "error");
                        }
                      });


                      // this.props.handleLoader()
                      // let obj = { ...this.state.audio_video, [`${name}Audio`]: null }
                      // this.setState({ audio_video: { ...obj } });
                      // setTimeout(async () => {
                      //   await this.updateRecord()
                      //   this.props.handleLoader()
                      // }, 0)
                    }}
                  >
                    <span style={{ color: "white" }}>Remove Audio</span>
                  </div>}
                </React.Fragment>
              )}
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
      </React.Fragment >
    );
  };

  render() {
    console.log(this.state.audio_video)
    // const largeBills = [
    //   {
    //     title: "Incapacitated",
    //     dataIndex: "incapaticitated",
    //     key: "incapaticitated",
    //     fields: [
    //       {
    //         type: "Video",
    //         name: "incapaticitated",
    //         title: "If I Am Incapacitated",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Spouse/Partner",
    //     dataIndex: "spouse_partner",
    //     key: "spouse_partner",
    //     fields: [
    //       {
    //         type: "Video",
    //         name: "spouse_partner",
    //         title: "If I Die Spouse/Partner",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Family",
    //     dataIndex: "family",
    //     key: "family",
    //     fields: [
    //       {
    //         type: "Video",
    //         name: "family",
    //         title: "If I Die Family",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Friends",
    //     dataIndex: "friends",
    //     key: "friends",
    //     fields: [
    //       {
    //         type: "Video",
    //         name: "friends",
    //         title: "If I Die Friends",
    //       },
    //     ],
    //   },
    // ];
    const { recordState } = this.state;
    const { handleFormInputChange } = this.props;

    const forms = [
      // "Incapacitated",
      "Spouse / Partner",
      "Family",
      "Friends"
    ]

    return (
      <React.Fragment>
        {this.state.showModal && (
          <Modal
            closable={false}
            width="55vw"
            centered
            visible={true}
            title={"Record Video"}
            footer={false}
          >
            <WebcamStreamCapture
              create={(type, url) => {
                this.setState({
                  audio_video: {
                    ...JSON.parse(JSON.stringify(this.state.audio_video)),
                    [type]: url
                  }
                })
                this.updateRecord()
              }}
              currentType={this.state.currentType}

              onCancel={() => {
                this.setState({ showModal: false });
              }}
            ></WebcamStreamCapture>
          </Modal>
        )
        }
        {
          this.state.showAudioModal && (
            <Modal
              closable={false}
              // width="55vw"
              centered
              visible={true}
              title={"Record Audio"}
              footer={false}
            >
              <div>
                <AudioReactRecorder
                  state={recordState}
                  onStop={this.onStop}
                  backgroundColor="rgb(255,255,255)"
                />
                <audio
                  id="audio"
                  controls
                  src={this.state.audioData ? this.state.audioData.url : null}
                ></audio>
                <button id="record" onClick={this.start}>
                  Start
                </button>
                <button id="stop" onClick={this.stop}>
                  Stop
                </button>
              </div>
              <button
                id="pause"
                className=""
                onClick={() => {
                  this.setState({ showAudioModal: false });
                }}
              >
                Cancel
              </button>

              <Upload onRemove={(e) => {
                console.log(e)
              }}
                showUploadList={this.state.showUploading}
                customRequest={async ({ file, onError, onSuccess, onProgress }) => {
                  // console.log("event file", e.file)
                  const fileSize = file.size / (1024 * 1000)// in MB
                  console.log("fileSize in mb", fileSize)

                  if (fileSize < 100) {
                    console.log("inside file size")
                    this.setState({
                      showUploading: true,
                    });
                    try {
                      const formData = new FormData();
                      console.log("file....", file);
                      const name = file.name;
                      const lastDot = name.lastIndexOf('.');
                      const fileName = name.substring(0, lastDot);
                      const ext = name.substring(lastDot + 1);
                      const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: file.type })
                      const resupload = await axios.put(resdata.uploadUrl, file, {
                        headers: { 'Content-type': file.type }, onUploadProgress: (event) => {
                          const { total, loaded } = event
                          onProgress({ percent: Math.round((loaded / total) * 100) }, file)
                        }
                      })
                      onSuccess(resupload)
                      const res = resdata.uploadUrl.split("?")[0]
                      console.log(res);
                      // const resUpload = await MODULE_API.uploadURL(resdata.uploadUrl,e.file,e.file.type)
                      // const res = await MODULE_API.uploadImage(formData)

                      this.setState({ audio_video: { ...this.state.audio_video, [this.state.currentType]: res } })
                      await this.updateRecord()
                      // e.onSuccess(res, e.file)
                    } catch (error) {
                      onError(error)
                      console.log(error)
                    }

                  }
                  else {
                    this.setState({ showAudioModal: false, });
                    swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                  }
                }}
              ><Button style={{ width: "100%", marginLeft: "1rem" }}  >Upload Audio</Button></Upload>
              <button id="pause" className="" style={{ display: "block" }} onClick={() => { this.setState({ showAudioModal: false }); }}>Done </button>
              <Loader isLoading={this.state.isLoading}></Loader>
            </Modal>
          )
        }
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={video2}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Audio Video Message
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

        {/*  <Header image={video2} title={"Audio Video Message"} /> */}
        {
          forms.map((type, index, arr) => {
            return <> <Add key={index} title={type} />{this.getAudioVideoRow({ name: type })}</>
          })
        }
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Audio Video Message</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                Plan Creators can leave one or more custom messages in audio or video format.
                Messages can be easily updated by Plan Creator and
                only viewable by others upon plan
                activation
                .  The Trusted Individuals cannot alter the Plan Creators messages after death so
                that their wishes and intentions are protected.
                Serious: These can be highly serious and deeply confidential messages and the people who
                created this program realized the importance of potential grief counseling and other
                emotional support.  Third-party professional services that are skilled in such important, yet
                delicate matters are available as part of our expanding service network.  Plan Creators can
                also record these messages from any location they appreciate and can be uploaded at their
                convenience.
                Fun: Messages don’t need to be serious. They can also be fun and silly including the use of
                third-party provider cameo.com where celebrities and other people of interest leave custom
                messages for the departed and their target group.  An extreme example: Can you imagine
                the sendoff message for a KISS superfan to have Gene Simmons say the words- “John Doe
                was a superfan he bought KISS condoms and KISS coffins, so we had him coming and going.
                He will truly be missed but he wants you to party all night at his funeral”.
              </h2>

            </div>
          </div>
        </Modal>
        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment >
    );
  }
}

export default AudioVideoMessage;
