import React, { useState } from "react";
import * as Style from "../styledComponents/Stepper/Stepper";

const Stepper = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const contentComponents = props.contentComponents;

  console.log("steps", props.steps);
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const ActiveContent = contentComponents[activeStep];
  const userRole =
    localStorage.getItem("role") != "undefined" &&
    JSON.parse(localStorage.getItem("role"));

  return (
    <Style.StepperContainer>
      <Style.StepperContent>
        <Style.StepperSteps>
          {props.steps.map((step, index) => (
            <Style.MainStepper>
              <Style.Step
                key={index}
                active={activeStep === index}
                activenumber={activeStep}
                completedSteps={index}
                disabled={userRole && userRole === "trustee" ? true : false}
                steps={index}
                onClick={() => setActiveStep(index)}
              >
                <span style={{ width: "30px", padding: "5px" }}>
                  {" "}
                  {step.step}
                </span>
              </Style.Step>
              <Style.StepLine
                active={activeStep === index}
                activenumber={activeStep}
                completedSteps={index}
                steps={index}
              ></Style.StepLine>
            </Style.MainStepper>
          ))}
        </Style.StepperSteps>
        {console.log("activeStep", activeStep, props.steps.length)}
        <div style={{ marginTop: "4rem", minHeight:"59vh" }}>
          {" "}
          <ActiveContent role={userRole} />{" "}
        </div>
        <Style.StepperButtons activeStep={activeStep}>
          {activeStep !== 0 && (
            <Style.BackButton onClick={handleBack} disabled={activeStep === 0}>
              Previous
            </Style.BackButton>
          )}
          <Style.Button
            onClick={handleNext}
            disabled={
              activeStep === props.steps.length - 1 ||
              (userRole && userRole === "trustee")
                ? true
                : false
            }
          >
            Next
          </Style.Button>
        </Style.StepperButtons>
      </Style.StepperContent>
    </Style.StepperContainer>
  );
};

export default Stepper;
