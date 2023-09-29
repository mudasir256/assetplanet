import React, { useState, useEffect } from "react";
import * as Style from "./styledComponents/AudioVideo";
import AudioVideoImg from "../assets/images/DeathModuleNew/QR Code.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import AddModal from "./styledComponents/Modal/AddModal";
import Input from "../components/styled-components/input/input";
import { Button, Modal, Upload } from "antd";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import RecordImg from "../assets/images/DeathModuleNew/Play button.png";
import { WebcamStreamCapture } from "./Recorder";
import DEATH_API from "../apis/death.api";
import MODULE_API from "../apis/module.api";
import swal from "sweetalert";
import axios from "axios";

export const AudioVideo = () => {
  const filesList = [
    { id: 1, fileName: "file name234567890-" },
    { id: 2, fileName: "file name234567891-" },
    { id: 3, fileName: "file name234567892-" },
    { id: 4, fileName: "file name234567893-" },
    { id: 5, fileName: "file name234567894-" },
    { id: 6, fileName: "file name234567895-" },
  ];

  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [showUploading, setShowUploading] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [audioVideo, setAudioVideo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAudioVideo();
  }, []);
  const getAudioVideo = async () => {
    try {
      // this.props.handleLoader()
      const ID = localStorage.getItem("accessId");
      const data = await DEATH_API.fetchAudioVideo(ID);
      if (data && data.data) setAudioVideo(data.data);
      // this.setState({
      //   audio_video: data.data,
      // });
      // this.props.handleLoader()
    } catch (error) {
      console.log(error);
      // this.props.handleLoader()
    }
  };

  const HandleAudioUpload = async ({file, onError, onSuccess, onProgress}) => {
    const fileSize = file.size / (1024 * 1000); // in MB
    console.log("fileSize in mb", fileSize);
    if (fileSize < 100) {
      console.log("inside file size");
      setShowUploading(true)
      // this.setState({
      //   showUploading: true,
      // });
      try {
        const formData = new FormData();
        console.log("file....", file);
        const name = file.name;
        const lastDot = name.lastIndexOf(".");
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({
          fileExt: ext,
          contentType: file.type,
        });
        const resupload = await axios.put(resdata.uploadUrl, file, {
          headers: { "Content-type": file.type },
          onUploadProgress: (event) => {
            const { total, loaded } = event;
            onProgress({ percent: Math.round((loaded / total) * 100) }, file);
          },
        });
        onSuccess(resupload);
        const res = resdata.uploadUrl.split("?")[0];
        console.log(res);
        // const resUpload = await MODULE_API.uploadURL(resdata.uploadUrl,e.file,e.file.type)
        // const res = await MODULE_API.uploadImage(formData)
        setAudioVideo((prev) => ({
          ...prev,
          [currentType]: res,
        }));
        // this.setState({
        //   audio_video: {
        //     ...this.state.audio_video,
        //     [this.state.currentType]: res,
        //   },
        // });
        await updateRecord();
        // e.onSuccess(res, e.file)
      } catch (error) {
        onError(error);
        console.log(error);
      }
    } else {
      // this.setState({ showAudioModal: false });
      swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
    }
  };
  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
  };
  const onStop = async (audioData) => {
    console.log("audioData", audioData);
    setAudioData(audioData);
    // this.setState({
    //   audioData: audioData,
    // });
    console.log("audioData", audioData);
    var file = new File([audioData.blob], "recorded.mp3", {
      type: "audio/wav",
    });
    console.log("audio file", file);
    // this.setState({ isLoading: true })
    const resdata = await MODULE_API.uploadFile({
      fileExt: "mp3",
      contentType: "audio/wav",
    });
    const resupload = await axios.put(resdata.uploadUrl, file, {
      headers: { "Content-type": file.type },
    });
    const res = resdata.uploadUrl.split("?")[0];
    console.log("audio url ", res);
    setAudioVideo((prev) => ({
      ...prev,
      [currentType]: res,
    }));
    // this.setState({ audio_video: { ...this.state.audio_video, [this.state.currentType]: res } })
    await updateRecord();
    // this.setState({ isLoading: false })
    setShowModal(false);
    // this.setState({ showAudioModal: false });
    swal("Uploaded!", "Your file has been Uploaded.", "success");
  };
  const updateRecord = async () => {
    console.log("update record");
    await DEATH_API.updateAudioVideo({
      incapacitatedAudio: null,
      incapacitatedVideo: null,
      spouseVideo: null,
      spouseAudio: null,
      familyAudio: null,
      familyVideo: null,
      friendsVideo: null,
      friendsAudio: null,
      ...audioVideo,
    });
  };
  const handelCloseModal = () => {
    setShowModal(false);
  };
  const handelCloseVideoModal = () => {
    setShowVideoModal(false);
  };
  const handleChange = (obj) => {
    const { name, value } = obj;

    console.log("data", obj);
  };
  const submitData = () => {
    console.log("submit");
  };

  const fields = [
    {
      Component: Input,
      name: "Record Audio",
      title: "Record Audio",
      type: "file",
      onChange: (event) => handleChange(event.target),
    },
  ];

  return (
    <div>
      <Style.MainHeading>
        <Style.HeaderImg
          src={AudioVideoImg}
          alt="AudioVideoImg"
        ></Style.HeaderImg>
        Audio/Video Messages
      </Style.MainHeading>
      <Modal closable={false} visible={showModal} centered footer={false}>
        <div>
          <h3> Record Audio</h3>
          <div style={{ display: "flex" }}>
            <img
              style={{ marginTop: "8px" }}
              src={RecordImg}
              width={"30.24px"}
              height={"30.24px"}
              alt="img"
            ></img>
            <AudioReactRecorder
              state={recordState}
              onStop={onStop}
              backgroundColor="rgb(255,255,255)"
              foregroundColor="#2A3DA3"
              canvasHeight={"48px"}
              canvasWidth={"450px"}
            />
          </div>
          {/*  {audioData && audioData.url && (
            <audio
              id="audio"
              controls
              src={audioData ? audioData.url : null}
            ></audio>
        )} */}
          <Style.RecordingButtons>
            <Style.StopButton
              id="stop"
              onClick={() => {
                stop();
                setRecordState(null);
                handelCloseModal();
              }}
            >
              Cancel
            </Style.StopButton>
            {recordState !== null ? (
              <Style.RecordButton id="stop" onClick={stop}>
                Stop
              </Style.RecordButton>
            ) : (
              <Style.RecordButton id="record" onClick={start}>
                Start
              </Style.RecordButton>
            )}
          </Style.RecordingButtons>
        </div>
      </Modal>
      <Modal closable={false} visible={showVideoModal} centered footer={false}>
        <div>
          <h3> Record Video</h3>
          <WebcamStreamCapture
            create={(type, url) => {
              setAudioVideo({
                ...JSON.parse(JSON.stringify(audioVideo)),
                [type]: url,
              });
              // this.setState({
              //   audio_video: {
              //     ...JSON.parse(JSON.stringify(this.state.audio_video)),
              //     [type]: url,
              //   },
              // });
              updateRecord();
            }}
            currentType={currentType}
            onCancel={() => {
              setShowVideoModal(false);
            }}
          ></WebcamStreamCapture>
        </div>
      </Modal>
      <Style.HeaderCard>
        <Style.HeaderCardHeading>SPOUSE</Style.HeaderCardHeading>
        <Style.HeaderCardHeadingB>FAMILY</Style.HeaderCardHeadingB>
        <Style.HeaderCardHeadingB>FRIENDS</Style.HeaderCardHeadingB>
      </Style.HeaderCard>
      <Style.AudioVideoCardSection>
        <Style.AudioVideoCards>
          {/* Spouse Audio Video Cards */}
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Audio Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowModal(true);
                    setCurrentType("spouseAudio");
                  }}
                >
                  +
                </Style.Button>
                <Upload
                  onRemove={(e) => {
                    console.log(e);
                  }}
                  style={{display:"none"}}
                  showUploadList={showUploading}
                  customRequest={({file, onError, onSuccess, onProgress}) => {
                    HandleAudioUpload({file, onError, onSuccess, onProgress});
                  }}
                  // customRequest={async ({ file, onError, onSuccess, onProgress }) => {
                  //   // console.log("event file", e.file)
                  //   const fileSize = file.size / (1024 * 1000)// in MB
                  //   console.log("fileSize in mb", fileSize)

                  //   if (fileSize < 100) {
                  //     console.log("inside file size")
                  //     this.setState({
                  //       showUploading: true,
                  //     });
                  //     try {
                  //       const formData = new FormData();
                  //       console.log("file....", file);
                  //       const name = file.name;
                  //       const lastDot = name.lastIndexOf('.');
                  //       const fileName = name.substring(0, lastDot);
                  //       const ext = name.substring(lastDot + 1);
                  //       const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: file.type })
                  //       const resupload = await axios.put(resdata.uploadUrl, file, {
                  //         headers: { 'Content-type': file.type }, onUploadProgress: (event) => {
                  //           const { total, loaded } = event
                  //           onProgress({ percent: Math.round((loaded / total) * 100) }, file)
                  //         }
                  //       })
                  //       onSuccess(resupload)
                  //       const res = resdata.uploadUrl.split("?")[0]
                  //       console.log(res);
                  //       // const resUpload = await MODULE_API.uploadURL(resdata.uploadUrl,e.file,e.file.type)
                  //       // const res = await MODULE_API.uploadImage(formData)

                  //       this.setState({ audio_video: { ...this.state.audio_video, [this.state.currentType]: res } })
                  //       await this.updateRecord()
                  //       // e.onSuccess(res, e.file)
                  //     } catch (error) {
                  //       onError(error)
                  //       console.log(error)
                  //     }

                  //   }
                  //   else {
                  //     this.setState({ showAudioModal: false, });
                  //     swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                  //   }
                  // }}
                >
                  <img
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    src={SeeMore}
                    alt="seemore"
                    onClick={() => {
                      console.log("name of clicked");
                      setCurrentType("spouseAudio");
                    }}
                  ></img>{" "}
                </Upload>
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"spouse"}Audio`) &&
              audioVideo[`${"spouse"}Audio`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"spouse"}Audio`]} target="blank">
                      Audio
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Video Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowVideoModal(true);
                    setCurrentType("spouseVideo");
                  }}
                >
                  +
                </Style.Button>
                <img
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  src={SeeMore}
                  alt="seemore"
                  onClick={() => {
                    console.log("name of clicked");
                    setCurrentType("spouseVideo");
                  }}
                ></img>{" "}
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"spouse"}Video`) &&
              audioVideo[`${"spouse"}Video`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"spouse"}Video`]} target="blank">
                      Video
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
        </Style.AudioVideoCards>
        <Style.AudioVideoCards>
          {/* Family Audio Video Cards */}
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Audio Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowModal(true);
                    setCurrentType("familyAudio");
                  }}
                >
                  +
                </Style.Button>
                <img
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  src={SeeMore}
                  alt="seemore"
                ></img>{" "}
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"family"}Audio`) &&
              audioVideo[`${"family"}Audio`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"family"}Audio`]} target="blank">
                      Audio
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Video Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowVideoModal(true);
                    setCurrentType("familyVideo");
                  }}
                >
                  +
                </Style.Button>
                <img
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  src={SeeMore}
                  alt="seemore"
                  onClick={() => {
                    console.log("name of clicked");
                    setCurrentType("familyVideo");
                  }}
                ></img>{" "}
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"family"}Video`) &&
              audioVideo[`${"family"}Video`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"family"}Video`]} target="blank">
                      Video
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
        </Style.AudioVideoCards>{" "}
        <Style.AudioVideoCards>
          {/* Friends Audio Video Cards */}
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Audio Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowModal(true);
                    setCurrentType("friendsAudio");
                  }}
                >
                  +
                </Style.Button>
                <img
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  src={SeeMore}
                  alt="seemore"
                  onClick={() => {
                    console.log("name of clicked");
                    setCurrentType("friendsAudio");
                  }}
                ></img>{" "}
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"friends"}Audio`) &&
              audioVideo[`${"friends"}Audio`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"friends"}Audio`]} target="blank">
                      Audio
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
          <Style.SubCard>
            <Style.SubCardHeader>
              <Style.Title style={{}}>Video Message</Style.Title>
              <div>
                <Style.Button
                  onClick={() => {
                    setShowVideoModal(true);
                    setCurrentType("friendsVideo");
                  }}
                >
                  +
                </Style.Button>
                <img
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  src={SeeMore}
                  alt="seemore"
                  onClick={() => {
                    console.log("name of clicked");
                    setCurrentType("friendsVideo");
                  }}
                ></img>{" "}
              </div>
            </Style.SubCardHeader>
            <div style={{ overflowY: "scroll", height: "10rem" }}>
              {audioVideo &&
              audioVideo.hasOwnProperty(`${"friends"}Video`) &&
              audioVideo[`${"friends"}Video`] ? (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>
                    <a href={audioVideo[`${"friends"}Video`]} target="blank">
                      Video
                    </a>
                  </Style.FileTitle>
                </Style.FileHeader>
              ) : (
                <Style.FileHeader>
                  <Style.FileTitle style={{}}>No Media</Style.FileTitle>
                </Style.FileHeader>
              )}
            </div>
          </Style.SubCard>
        </Style.AudioVideoCards>
      </Style.AudioVideoCardSection>
    </div>
  );
};
