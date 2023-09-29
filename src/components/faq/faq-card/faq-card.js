import React, { useState } from "react";
import * as Style from "./styles/faq-card";
import downArrow from "../../../assets/SVGs/down-arow-white.svg";
import upArrow from "../../../assets/SVGs/up-arrow-white.svg";

function FaqCard({ data }) {
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
    setImageShow(!imageShow)
  };

  return (
    <Style.CardContainer onClick={handleShow}>
      <Style.QuestionContainer>
        <div>{data.question}</div>
        <div
          style={{
            backgroundColor: "green",
            borderRadius: "100%",
            height: "1.5rem",
            width: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageShow ? (
            <img src={upArrow} height={9} width={9} />
          ) : (
            <img src={downArrow} height={9} width={9} />
          )}
        </div>
      </Style.QuestionContainer>
      {show ? <div style={{ paddingTop: "0.5rem" }}>{data.answer}</div> : null}
    </Style.CardContainer>
  );
}

export default FaqCard;
