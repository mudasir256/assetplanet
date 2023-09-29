import React from "react";
import * as Style from "./style/style";
import TitleImg from "../../../assets/images/DeathModuleNew/Ellipse 105.png";
export default ({ data, name }) => (
  <TableMarkup titles={Object.keys(data[0])} data={data} name={name} />
);
const TableMarkup = ({ titles, data, name }) => (
  <Style.Table>
    <thead>
      <Style.TableRow>
        {titles.map((title, index) => (
          <th key={index} style={{ marginLeft: index === 0 && name === "PersonalInstruction" ? "1rem" : "0px" }}>
            {title}
          </th>
        ))}
      </Style.TableRow>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <Style.TableRow key={index}>
          {titles.map((title, index) => (
            <Style.TableData key={index} >
              {index === 0 && name === "PersonalInstruction" && (
                <img
                  style={{ cursor: "pointer", marginRight: "1rem" }}
                  src={TitleImg}
                  alt="TitleImg"
                ></img>
              )}
              {item[title]}
            </Style.TableData>
          ))}
        </Style.TableRow>
      ))}
    </tbody>
  </Style.Table>
);
// export default TableMarkup;