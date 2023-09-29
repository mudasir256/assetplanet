import React from "react";
import Stepper from "./Stepper/Stepper";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { StartMessage } from "./StartMessage";
import { AudioVideo } from "./AudioVideo";
import { Checklist } from "./Checklist";
import { PersonalInstructions } from "./PersonalInstructions";
import { ContactList } from "./ContactList";
import { EmailandText } from "./EmailandText";
import { Funeralwishes } from "./Funeralwishes";
import { PasswordList } from "./PasswordList";
import { BillsToPay } from "./BillsToPay";
export default function demoStepper() {
  const mysteps = [
    {
      step: "1",
      name: "MESSAGE",
    },
    {
      step: "2",
      name: "Audio Video",
    },
    {
      step: "3",
      name: "Checklist",
    },
    {
      step: "4",
      name: "Personal Instruction",
    },
    {
      step: "5",
      name: "Email and Text",
    },
    {
      step: "6",
      name: "Contact List",
    },
    {
      step: "7",
      name: "Funeral Wishes",
    },
    {
      step: "8",
      name: "List of Password",
    },
    {
      step: "9",
      name: "Bills to Pay",
    },
    {
      step: "10",
      name: "Assets and Liabilities",
    },
    {
      step: "11",
      name: "Important Document",
    },
    {
      step: "12",
      name: "Litigation List",
    },
    {
      step: "13",
      name: "Location of Personal Instruction",
    },
  ];

  const contentComponents = [
    StartMessage,
    AudioVideo,
    Checklist,
    PersonalInstructions,
    ContactList,
    EmailandText,
    Funeralwishes,
    PasswordList,
    BillsToPay,
    Step2,
    Step3,
    Step4,
    Step1,
  ];

  return (
    <>
      <Stepper steps={mysteps} contentComponents={contentComponents} />
    </>
  );
}
