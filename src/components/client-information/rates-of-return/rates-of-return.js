import React from "react";
import { Button } from "../../styled-components/button";
import Table from "../../styled-components/table/table";
import { useHistory } from "react-router-dom";
import * as Style from "./styles/rates-of-return";
import { defaultStyles } from "../../../constants/style-constants/utils";
import { Text } from "../../styled-components/text";

function RatesOfReturn() {
  const history = useHistory();
  const { styles } = defaultStyles;

  const tableColumnsData = [
    { id: "1", name: "How Many Years", class: { width: "10rem" } },
    { id: "2", name: "High Band", class: { width: "10rem" } },
    { id: "3", name: "Low Band", class: { width: "10rem" } },
    { id: "4", name: "Expected Average", class: { width: "10rem" } },
    { id: "5", name: "Start Year", class: { width: "10rem" } },
    { id: "6", name: "Average", class: { width: "10rem" } },
  ];

  const tableBodyData = [
    { hmy: "15", hb: "8", lb: "6",ea:"80",sy:"209",a:"85" },
    { hmy: "15", hb: "9", lb: "6",ea:"85",sy:"2019",a:"90" },
  
  ];

  const staticReturnRateObj = {
    Static: 345,
  };

  const professionalPredictionsObj = {
    "Professional Predictions": "William Forsyth Sharpe",
    "Prediction File": "abc.doc",
  };

  const allData = [
    { title: "Static Return Rate", data: staticReturnRateObj },
    { title: "Professional Prediction", data: professionalPredictionsObj },
  ];

  return (
    <div>
      <Style.ButtonContainer>
        <Button onClick={() => history.push("/rates_of_return_edit/1")}>
          Edit
        </Button>
      </Style.ButtonContainer>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {allData &&
          allData.map((data, index) => (
            <div style={{ padding: "1rem 0rem 0 1rem" }}>
              <Style.TableHeader>{data.title}</Style.TableHeader>
              {data &&
                Object.keys(data.data).map((key, index) => (
                  <Style.TableBodyRow
                    key={index}
                    backgroundColor={
                      (index + 1) % 2 === 0 ? "white" : "rgba(0,0,0,.05)"
                    }
                  >
                    <Text
                      style={styles.text.labelBoldText}
                      width="13rem"
                      color="rgba(0,0,0,.65)"
                    >
                      {key}{" "}
                    </Text>

                    <Text width="13rem" color="rgba(0,0,0,.65)">
                      {data.data[key]}
                    </Text>
                  </Style.TableBodyRow>
                ))}
            </div>
          ))}
      </div>

      <div style={{ margin: "3rem 1rem" }}>
        <Table
          tableColumnsData={tableColumnsData}
          tableBodyData={tableBodyData}
        />
      </div>
    </div>
  );
}

export default RatesOfReturn;
