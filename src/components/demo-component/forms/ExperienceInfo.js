import React from 'react'
import EducationalInfo from './EducationalInfo';

function ExperienceInfo({preForm}) {

  const preComponent = {
    name: "EducationalInfo",
    title: "Educational Info",
    unique: "matric",
    isMulti: false,
    component: EducationalInfo  
    
  };
  return (
    <div>
       <div
          style={{
            display: "flex",
            marginTop:"2rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button onClick={()=>{preForm(preComponent)}}>Previous</button>

          <button >Next</button>
        </div>
    </div>
  )
}

export default ExperienceInfo