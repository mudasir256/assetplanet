import React from 'react'
import { Row, Col, Form, Radio, Button, Icon, Input } from "antd";
import form from "../../../assets/images/form.png";
import Footer from "../components/footer";
import addNotes from "../../../assets/SVGs/add-notes.svg";
import editNotes from "../../../assets/SVGs/edit-notes.svg";
import deleteNotes from "../../../assets/SVGs/delete-notes.svg";
import editNote from "./editNotes";
import "./death.css";
import "../../custom/CustomSubFormTable.css";
import DEATH_API from "../../../apis/death.api";

const EditNotes = (props, checkListform, customChecklist) => {
    console.log("edit props",props);
   const snakeToCamel = str => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  const  camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return (
    <div className="custom-field-align">
  <Input
      id="sectionEdit"
      className="field-set"
      type="text"
      placeholder="Enter Notes"
      size={"large"}
      name="notes"
      onChange={(e) => {
        // console.log("value....", e.target.value)
      }}
    />
    <Button
      className="button-set"
      onClick={async () => {
        const value = document.getElementById("sectionEdit").value;
        console.log("value.. saved", value);
        try {
          await DEATH_API.upsertChecklist({
            ...props.checkListForm,
            [snakeToCamel(props.name)]: value
          })
          this.setState({
            checkListForm: {
              ...props.checkListForm,
              [snakeToCamel(props.name)]: value
            },
          });
        } catch (err) {
          console.log("err", err);
        //   alert("error in upsert")
          return
        }
        // this.setState({
        //   checkListForm: { ...this.state.checkListForm,[this.snakeToCamel(name)]:value }
        // })
        this.setState({
            customChecklist: { ...props.customChecklist, [props.name]: false }
        })
      }

      }
    >
      Edit Notes
    </Button>
    
    {" "}
    </div> 
  )
}

export default EditNotes
