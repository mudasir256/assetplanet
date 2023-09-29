import React, { useState, useEffect } from "react";
import FaqCard from "./faq-card/faq-card";
import * as Style from "./styles/faq";
import { MODULE_API } from "../../apis";

function Faq() {
  const [faqData, setFaqData] = useState();
  const [html, setHTML] = useState({__html: ""});


  const data = [
    {
      ques: "Do You accept paypal?",
      ans: "Yes, we do along with Alipay, PayATM and payoneer payoneerrrrrrrrrrrrr",
    },
    {
      ques: "Do You accept paypal?",
      ans: "Yes, we do along with Alipay, PayATM and payoneer",
    },
    {
      ques: "Do You accept paypal?",
      ans: "Yes, we do along with Alipay, PayATM and payoneer",
    },
    {
      ques: "Do You accept paypal?",
      ans: "Yes, we do along with Alipay, PayATM and payoneer",
    },
  ];

  const fetchFaqs = async () => {
    let faqsResponce = await MODULE_API.fetchFaq();
    const backendHtmlString = await faqsResponce.data
    setHTML({__html: backendHtmlString})
    // setFaqData(faqsResponce);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  console.log("faq", faqData);

  return (
    // <Style.MainContainer>
    //   <Style.Title>Frequently Asked Questions</Style.Title>

    //   <Style.FaqContainer>
    //     {faqData &&
    //       faqData.items.map((data, index) => (
    //         <FaqCard key={index} data={data} />
    //       ))}
    //   </Style.FaqContainer>
    // </Style.MainContainer>
    <div dangerouslySetInnerHTML={html}/>
  );
}

export default Faq;
