import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import { Button, Modal } from 'antd';
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import events from "./events";
import moment from 'moment';
import date from 'availity-reactstrap-validation/lib/AvValidator/date';

// let firstDaty = 1;

const calanderfull = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, seteventName] = useState("");
  const [eventStart, seteventStart] = useState(new date());
  const [eventEnd, seteventEnd] = useState("");


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const renderEventContent = (eventInfo) => {
    console.log("renderEventContent", eventInfo);
    return (
      <React.Fragment>
        {eventInfo.view.type === "dayGridMonth" ?
          <div style={{ margin: "auto" }}>
            <span>{eventInfo.event.title}</span>
            <span style={{ fontWeight: "bold", display: "block" }}>${eventInfo.event.extendedProps.amount}</span>

          </div>
          :
          <div style={{}}>
            <span style={{ fontWeight: "bold", display: "block", float:"left" }}>{eventInfo.event.title}</span>
            <span style={{ fontWeight: "bold", display: "block", float:"right" }}>${eventInfo.event.extendedProps.amount}</span>

          </div>
        }

      </React.Fragment>
    );
  };
  const handleEventClick = (info) => {
    // bind with an arrow function
    console.log(`Event ID: ${info.event.id} Selected!`, info.event.title);
    console.log(`Event ID: ${info.event.id} Selected!`, info.event.start);
    // console.log(`Event ID: ${info.event.id} Selected!`,info.event.end);

    seteventName(info.event.title);
    seteventStart(info.event.start);
    // seteventEnd(info.event.end);
    showModal();

  };

  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        // initialView='listMonth'
        // firstDay={firstDaty}
        eventBackgroundColor='blue'
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        locale="us"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          // right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
          right: "dayGridMonth,listMonth"

        }} listDayFormat
        buttonText={{
          // today: "today",
          month: "Calendar",
          // week: "week",
          // day: "day",
          list: " List "
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        events={props.props}
      />
      <>

        <Modal title={eventName} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p className='EventClass'> <span className='EventTitle'>Event Title: </span> {eventName}</p>
          <p className='EventClass'> <span className='EventTitle'>Event Time: </span>{moment(eventStart).format('dddd, MM/DD/YYYY, hA')}</p>
        </Modal>
      </>

    </div>
  )
}

export default calanderfull
