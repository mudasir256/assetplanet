import React from "react";
import * as Style from "./styles/collectibles-card";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postSetSelectedModuleName } from "../../../../redux/slices/inventorySlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CollectiblesCard({ data,showCollectibleItems }) {
  console.log("data", data);
  const { image, name } = data;
  const history = useHistory();

  const dispatch = useDispatch()

  const handleCardClick = (name) => {
    dispatch(postSetSelectedModuleName(name))
    history.push({
      pathname: `/items/${name}`,
      //   search: name,
      // state: { detail: response.data }
    });
    // showCollectibleItems()
  }

  return (
    <Style.MainContainer
    //   onClick={() => {
    //     // history.push("/items");
    //     history.push({
    //       pathname: "/items",
    //       moduleName: `${name}_item`,
    //       image:image
    //     });
    //   }}
    onClick={()=>handleCardClick(name)}
    >
      <img
        src={
          image ||
          "https://assetplanet-dashboard.herokuapp.com/static/media/member.5d444ca9.png"
        }
        height="45px"
        width="45px"
      />

      <div style={{ fontSize: "1.1rem" }}>{name}</div>
    </Style.MainContainer>
  );
}
export default CollectiblesCard;
