import React, { useState } from "react";
import { Button } from "../../components/styled-components/button";
import Loader from "../../components/styled-components/loader/loader";
import DEATH_API from "../../apis/death.api";
export const AcceptInvitation = () => {
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    console.log("Accepted");
    // try {
    //     (async () => {
    //         setLoading(true)
    //         let responseData = await DEATH_API.fetchClientList();
    //         let newData = [];
    //         if (responseData) {
    //           // route from here to login
    //         }

    //     })()
    // } catch (error) {
    //     setLoading(false)
    //     console.log("error")
    // }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "4rem",
          alignItems: "center",
        }}
      >
        <h1>Invitation Form</h1>
        <Button
          style={{ marginTop: "1rem" }}
          onClick={() => {
            handleAccept();
          }}
        >
          Accept Invite
        </Button>
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};
