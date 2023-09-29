import React, { useEffect, useState } from "react";
import CollectiblesCard from "../../../../components/organizer/assets/collectibles-card/collectibles-card";
import { Button } from "../../../../components/styled-components/button";
import "../../../../components/form/inventory/inventory.style.css";
import { MODULE_API } from "../../../../apis";
import * as Style from "./styles/collectibles";
import Loader from "../../../styled-components/loader/loader";

function Collectibles({showCollectibleItems}) {
  const [allCollectibles, setAllCollectibles] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCollectibles();
  }, []);

  const fetchCollectibles = async () => {
    try {
      setIsLoading(true);
      let collectibles = await MODULE_API.fetchAll({
        pageNum: 1,
        limit: 20,
      });

      if (collectibles.status === 200) {
        setIsLoading(false);
        setAllCollectibles(collectibles.body);
      }
    } catch (e) {
      setIsLoading(false);

      console.log(e);
    }
  };

  console.log("collectibles in organizer module", allCollectibles);

  return (
    <>
      {/* {isLoading ? <div class="loader" ng-hide="data.length > 0"></div> : null} */}
      <Style.HeaderContainer>
        <div></div>
        <Style.Title>Collectibles</Style.Title>
        <Button onClick={fetchCollectibles}>Sync Data</Button>
      </Style.HeaderContainer>
      <Style.CardContainer>
        {allCollectibles &&
          allCollectibles.map((data, index) => (
            <CollectiblesCard key={index + 1} data={data} showCollectibleItems={showCollectibleItems}/>
          ))}
      </Style.CardContainer>
      <Loader isLoading={isLoading} />

    </>
  );
}

export default Collectibles;
