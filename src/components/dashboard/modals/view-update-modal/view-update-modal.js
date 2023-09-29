import React from "react";
import Modal from "../../../styled-components/modal/modal";
import * as Style from "./styles/view-update-modal";
import { Icon } from "antd";

function ViewUpdateModal({ show, close }) {
  const updateData = [
    { name: "Asset Planet has added new Asset to the list" },
    { name: "Asset Planet has developed a new category in the Inventory App" },
    { name: "Remember, Monday is a bank holiday. Enjoy the day off!" },
    {
      name: "Asset Planet has gifted another free month to you. Thank you for the referral!",
    },
    { name: "Update Inflation Projection" },
  ];

  return (
    <Modal show={show}>
      <div style={{ width: "35rem" }}>
        <Style.HeaderContainer>
          <Icon type="close" onClick={close}></Icon>
        </Style.HeaderContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "1.5rem",marginBottom:"1rem" }}>Update</div>

          <div>
            {updateData.map((data, index) => (
              <Style.RowContainer key={index}>
                <div style={{width:"90%"}}>{data.name}</div>
                <div style={{width:"10%",display:"flex",columnGap:"0.5rem"}}>
                  <Icon type="close"></Icon>

                  <Icon type="eye"></Icon>
                </div>
              </Style.RowContainer>
            ))}
          </div>
        </div>



        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom:"1.5rem"
          }}
        >
          <div style={{ fontSize: "1.5rem",marginBottom:"1rem" }}>Snoozed Updates</div>

          <div>
            {updateData.map((data, index) => (
              <Style.RowContainer key={index}>
                <div style={{width:"90%"}}>{data.name}</div>
                <div style={{width:"10%",display:"flex",columnGap:"0.5rem"}}>
                  <Icon type="close"></Icon>

                  <Icon type="eye"></Icon>
                </div>
              </Style.RowContainer>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ViewUpdateModal;
