import React from "react";
import Webcam from "react-webcam";
import { Row, Col, Button, Upload } from "antd";
import swal from "sweetalert";
import MODULE_API from "../apis/module.api";
import Loader from "../components/styled-components/loader/loader";
import * as Style from "./styledComponents/AudioVideo";
import axios from "axios";

export const WebcamStreamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [imgSrc, setImgSrc] = React.useState(null);
  const { create, currentType } = props;
  const [showUploading, setshowUploading] = React.useState(false);
  console.log("props", props);
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${imageSrc}" width="700px" height="600px">`;
  }, [webcamRef, setImgSrc]);

  const handleDownload = React.useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      var file = new File([blob], "capture.webm", { type: "video/webm" });
      console.log("file", file);
      setLoading(true);
      const resdata = await MODULE_API.uploadFile({
        fileExt: "webm",
        contentType: "video/webm",
      });
      const resupload = await axios.put(resdata.uploadUrl, file, {
        headers: { "Content-type": file.type },
      });
      const res = resdata.uploadUrl.split("?")[0];
      console.log("video url ", res);
      create(currentType, res);
      setLoading(false);
      props.onCancel();
      swal("Uploaded!", "Your file has been Uploaded.", "success");

      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style = "display: none";
      // a.href = url;
      // a.download = "react-webcam-stream-capture.webm";
      // a.click();
      // window.URL.revokeObjectURL(url);
      // setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <Webcam width={"90%"} mirrored={true} audio={true} ref={webcamRef} />
      <Style.RecordingButtons>
        <Style.StopButton
          style={{
            width: "auto",
          }}
          onClick={props.onCancel}
        >
          Cancel
        </Style.StopButton>
        {capturing ? (
          <Style.StopButton
            style={{
              width: "auto",
            }}
            onClick={handleStopCaptureClick}
          >
            Stop Capture
          </Style.StopButton>
        ) : (
          <Style.RecordButton
            style={{
              width: "auto",
            }}
            onClick={handleStartCaptureClick}
          >
            Start Capture
          </Style.RecordButton>
        )}
        {recordedChunks.length > 0 && (
          <Style.RecordButton
            style={{
              width: "auto",
            }}
            onClick={handleDownload}
          >
            Save
          </Style.RecordButton>
        )}
        {/* <Col span={6}>
          <Button
            style={{
              width: "100%",
            }}
            onClick={capture}
          >
            SnapShot
          </Button>
          </Col> */}

        {/* <Col span={6}>
          <Upload onRemove={(e) => {
            console.log(e)
          }}
            showUploadList={showUploading}

            customRequest={async ({ file, onError, onSuccess, onProgress }) => {
              const fileSize = file.size / (1024 * 1000)// in MB
              console.log("fileSize in mb", fileSize)
              if (fileSize < 100) {
                setshowUploading(true);

                try {
                  const formData = new FormData();
                  formData.append('file', file)
                  console.log("file while upload", file)
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
                  // const res = await MODULE_API.uploadImage(formData)
                  create(currentType, res)
                  // e.onSuccess(res, e.file)
                } catch (error) {
                  console.log(error)
                }
              }
              else {
                props.onCancel()
                swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
              }
            }}
            maxCount={1}
            multiple={false}
          >
            <Button style={{
              width: "100%",
            }}

            >Upload Video</Button>
          </Upload>

        </Col>
          */}

        {/* <Col span={10}>
          <Button
            type="success"
            style={{
              marginTop: "1rem",
              width: "100%",
            }}
            onClick={props.onCancel}
          >
            Done
          </Button>
          </Col>*/}
        <Loader isLoading={loading}></Loader>
      </Style.RecordingButtons>
    </>
  );
};
