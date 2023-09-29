import React from "react";
import { Button } from "antd";
import * as Style from "./styles/styled-row";

function StyledRow({ item, getSelectedRow, deleteRow, index, image ,allItems}) {
  console.log("item",item);
  return (
    <Style.MainContainer>
      {image === "required" ? (
        <img
          src={
           allItems[index] && allItems[index].Image &&  allItems[index].Image[0] ||
            "https://assetplanet-dashboard.herokuapp.com/static/media/member.5d444ca9.png"
          }
          height="200px"
          width="200px"
        />
      ) : (
        <Style.IndexConatiner>{index + 1}</Style.IndexConatiner>
      )}

      <Style.ContentConatiner>
        {Object.keys(item).map((key, index1) => (
          <Style.Item key={index1}>
            <span style={{ fontWeight: "bolder" }}>{key} : </span> {item[key]}
          </Style.Item>
        ))}
      </Style.ContentConatiner>
      <Style.ButtonsContainer>
        <Button
          type="link"
          style={{ fontSize: "21px" }}
          icon="edit"
          onClick={() => getSelectedRow(index)}
        ></Button>
        <Button
          type="link"
          style={{ fontSize: "21px" }}
          icon="delete"
          onClick={() => deleteRow(index)}
        ></Button>
      </Style.ButtonsContainer>
    </Style.MainContainer>
  );
}

export default StyledRow;
