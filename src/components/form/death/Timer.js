import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";

export default function Timer(props) {
  let timing = props.Time * 3600;

  let Start = new Date(props.startTime);
  let StartDBTime = Start.getTime();
  var CurrentTime = new Date().getTime();
  let estimateTime = CurrentTime - StartDBTime;
  let remaingTime = props.Time * 3600000 - estimateTime;
  // console.log("StartDBTime", StartDBTime)
  // console.log("CurrentTime", CurrentTime)
  // console.log("estimateTime", estimateTime)
  // console.log("remaingTime", remaingTime/1000)

  let remain = Math.ceil(remaingTime / 1000);

  var newtime = CurrentTime - timing;
  // console.log("newtime", remain)
  //   console.log("props.timerState", props.timerState);
  const [time, setTime] = useState(remain);
  const interval = useRef();
  useEffect(()=>{
    interval.current = setInterval(()=>{
        setTime((time)=>{
            props.timerState(time-1);
             return time-1
            })
    },1000)
},[])
  useEffect(() => {
    console.log(time,"fgjhkljhg",remain);

    if(time<=0 && interval.current) {
        console.log("stopping time");
        clearInterval(interval.current)}
  }, [time]);
  // console.log("timer",time)
//   console.log("time in timer",time)

  return (
    time >= 0 && (
      <div className="App">
        <p>
          Time left: {parseInt(`${Math.floor(time / 3600)}`.padStart(2, 0))}{" "}
          Hours, {parseInt(`${Math.floor((time % 3600) / 60)}`.padStart(2, 0))}{" "}
          Minutes, {parseInt(`${time % 60}`.padStart(2, 0))} Seconds
        </p>
      </div>
    )
  );
}
