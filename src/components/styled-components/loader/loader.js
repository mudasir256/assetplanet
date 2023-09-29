import React, { useState } from "react";
// import {useSelector} from 'react-redux'
import * as Style from "./styles/loader";
// import loader from '../../../assets/SVGs/grid.svg'
import loader from '../../../assets/SVGs/bars.svg'

function Loader({isLoading}) {
  // const[show1,setShow1] = useState(true)
  // const isLoading=useSelector((state)=>state.genericSlice.isLoading)
  return isLoading? (

    <div>
      {/* {show? ( */}
        <Style.Loader  >
          <Style.LoaderContent
          onClick={e=>e.stopPropagation()}
          >
            {/* <div>Loading</div> */}
            <img src={loader} height={50} width={50} alt="asset planet loader"/>
          </Style.LoaderContent>
        </Style.Loader>
      {/* ) : null} */}
    </div>
  ):null;
}

export default Loader;
