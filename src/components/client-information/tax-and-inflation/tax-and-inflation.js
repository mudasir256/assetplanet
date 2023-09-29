import React from "react";
import { Button } from "../../styled-components/button";
import Table from "../../styled-components/table/table";
import { useHistory } from "react-router-dom";
import * as Style from "./styles/tax-and-inflation";
import { defaultStyles } from "../../../constants/style-constants/utils";
import { Text } from "../../styled-components/text";

function TaxAndInflation() {
  const history = useHistory();
  const { styles } = defaultStyles;

  const tableColumnsData = [
    { id: "1", name: "Tax Credit", class: { width: "10rem" } },
    { id: "2", name: "Amount Of Credit", class: { width: "10rem" } },
    { id: "3", name: "Whose Credit", class: { width: "10rem" } },
  ];

  const tableBodyData = [
    {  tc: "600", ac: "200", wc: "50" },
    {  tc: "10", ac: "900", wc: "50" },
    {  tc: "600", ac: "78", wc: "83" },
  ];

  const taxInfoObj = {
    "State Taxation": "Alaska",
    "Tax Filling Election": "Single",
    "Deductions":"Itemized",
    "State Tax Effective Rate": 19,
    "Federal Tax Rate": 50,
    "Total Tax Rate": 70,
    "Federal Collectible Tax Rate": 100,
    "Gross Income": 10,
  };

  const taxCreditObj = {
    "Tax Credit": "Adoption Credit",
    "Amount Of Credit": "80",
    "Whose Credit": "Child",
    
  };

  const capitalGainObj = {
    "Subject to Cap Gains": "50",
    "Gains Rate Federal": "80",
    "Gains Rate State": "10",
   
  };

  const carryForwardObj = {
    "Total Carry Forward": "50",
    "Short Term Carry Forward": "80",
    "Long Term Carry Forward": "10",
    "Carry Forward Updated": "800",
    "Carry Forward Loss Notes": "Sample Notes",
  };

  const inflationRateObj = {
    "General Inflation": "Static",
    "General Inflation Rate": "50",
    "Medical Inflation": "Federal",
    "Medical Inflation Rate": "100",
    "Education Inflation": "Static",
    "Education Inflation Rate": "Static",
    "Luxury Inflation": "Static",
    "Luxury Inflation Rate": "55",
    "Housing Inflation": "Static",
    "Housing Inflation Rate": "77",
  };

  const allData = [
    { title: "Tax Information", data: taxInfoObj },
    { title: "Capital Gains", data: capitalGainObj },
    { title: "Carry Forward", data: carryForwardObj },
    { title: "Inflation Rates", data: inflationRateObj },
  ];

  return (
    <div>
      <Style.ButtonContainer>
        <Button onClick={() => history.push("/tax_inflation_edit/1")}>
          Edit
        </Button>
      </Style.ButtonContainer>

      <div style={{ display: "flex",flexWrap:"wrap" }}>
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
                      width="12rem"
                      color="rgba(0,0,0,.65)"
                    >
                      {key}{" "}
                    </Text>

                    <Text width="5rem" color="rgba(0,0,0,.65)">
                      {data.data[key]}
                    </Text>
                  </Style.TableBodyRow>
                ))}
            </div>
          ))}
      </div>

     <div style={{margin:"3rem 1rem"}}>
     <Table
        tableColumnsData={tableColumnsData}
        tableBodyData={tableBodyData}
      />
     </div>
    </div>
  );
}

export default TaxAndInflation;
