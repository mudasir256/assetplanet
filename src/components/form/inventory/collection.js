import React, { Component } from "react";
import { Button, Form, Input, Col, Row, Modal } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import inventory from "../../../assets/images/latest/household.png";
import { MODULE_API } from "../../../apis";
import { connect } from "react-redux";
import { setCollection } from "../../../redux/inventory/actions";

import { postSetCollection } from "../../../redux/slices/inventorySlice";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurance_rows: [],
      attributes: [],
      module: null,
      isUpdate: false,
      moduleId: null,
      formData: {},
      isVisible: false,
      isLoading: false,
      updateObject: null,
      isDelete: false,
      deletedId: null,
    collectionDetail:null

    };
  }

  componentDidMount() {
    this.get(this.props.match.params.id);
  }

  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };


  get = async (path = "") => {
    try {
      const { collection } = this.props;
      let updatedPath = "";
      if (path) updatedPath = `${path}_item`;
      else updatedPath = collection.name;
      this.setState({ isLoading: true });
      const { dispatch } = this.props;
      // if (this.props.match.params.id) {
      let attributes = await MODULE_API.fetchAttributes(`${updatedPath}`);
      if (attributes) {
      this.setState({
        collectionDetail:attributes
      })
        dispatch(postSetCollection(attributes));
        // this.setState({
        //   attributes: attributes.attributes,
        //   module: attributes.name,
        //   moduleId: attributes.id,
        // });
        // }
      this.setState({ isLoading: false });

      }
    } catch (error) {
      console.log("e ", error);
    }
  };

  create = async (body) => {
    try {
      const { collection } = this.props;
      this.setState({ isLoading: true });
      if (body && body.hasOwnProperty("defaultValues")) {
        let values = body.defaultValues.split(",");
        let defVal = [];
        values.forEach((v) => {
          defVal.push({
            value: v,
          });
        });
        body["defaultValues"] = defVal;
        
      }

    // get last item from array, then get last item priority value and increment it
      let lastAttributePrioroty = collection.attributes.slice(-1)[0].priority
      body["priority"] = lastAttributePrioroty+1

      let create = await MODULE_API.create({
        name: collection.name,
        attributes: [body],
      });

      // this.setState({ isLoading: false });
      return create;
    } catch (error) {}
  };

  update = async () => {
    try {
      console.log("in update");
      this.setState({ isLoading: true });
      let { collection } = this.props;
      console.log("at first body", collection);

      let body = {...collection};

      let obj = {
        ...this.state.updateObject,
      };

      if (
        this.state.updateObject &&
        this.state.updateObject.hasOwnProperty("attribute_default_values")&&
        this.state.updateObject.attribute_default_values.length > 0

      ) {
        // console.log("reached for",this.state.updateObject);
        let values = this.state.updateObject.attribute_default_values.split(",");

        let defVal = [];
        // console.log(values);
        values.forEach((v) => {
          defVal.push({
            value: v,
          });
        });

        obj = {
          ...this.state.updateObject,
          defaultValues: defVal,
        };
      }
      console.log("before body",body)
      console.log("obj",obj)

      body["attributes"] = [obj];
      console.log("after body",body)
      

      await MODULE_API.create(body);
      await this.get();

      // this.setState({ isLoading: true });
      // if (body && body.hasOwnProperty("defaultValues")) {
      //   let values = body.defaultValues.split(",");
      //   let defVal = [];
      //   values.forEach((v) => {
      //     defVal.push({
      //       value: v,
      //     });
      //   });
      //   body["defaultValues"] = defVal;
      // }

      // let create = await MODULE_API.create({
      //   name: collection.name,
      //   attributes: [body],
      // });

      // // this.setState({ isLoading: false });
      // return create;
      this.setState({ isLoading: false });
      return {
        status: 200,
      };
    } catch (error) {
      console.log(error);
    }
  };

  remove = async (id) => {
    try {
      this.setState({ isLoading: true });
      const { collection } = this.props;
      let remove = await MODULE_API.removeModuleAttribute({
        moduleId: collection.id,
        attributeId: id,
      });
      await this.get();
      this.setState({ isLoading: false, isDelete: false, deletedId: null });
      return remove;
    } catch (error) {}
  };

  getField = (attr, index) => {
    const { name } = attr;
    return (
      <Col span={8} key={index} style={{height:"8rem"}}>
        <Row className="custom-sub-container" style={{height:"6rem"}}>
          <Col span={17}>
            <div className="custom-field-alignments">
              <div className="custom-filed-margin">
                <span className="custom-field-heading-style">Name: </span>
                {name}
              </div>
            </div>
          </Col>

          <Col span={2}>
            <div className="custom-field-alignments-icons">
              <Button
                onClick={() => {
                  console.log("edit clicked arr",attr);
                  let attribute = {...attr}
                  let str = "";
                  if (
                    attribute &&
                    attribute.hasOwnProperty("attribute_default_values") &&
                    attribute.attribute_default_values.length > 0
                  ) {
                    // console.log(attribute);
                    attribute.attribute_default_values.forEach((v) => {
                      str = str + v.value + ",";
                    });
                    if (str)
                    attribute["attribute_default_values"] = str.slice(0, -1);
                  }

                  // console.log("ATTR ", attribute);
                  this.setState({ updateObject: attribute }, () => {
                    this.setUpdate();
                  });
                }}
                type="link"
                style={{ fontSize: "21px" }}
                icon="edit"
              ></Button>
            </div>
          </Col>
          <Col span={2}>
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  this.setState({ isDelete: true, deletedId: attr.id });
                  // this.remove(attr.id);
                }}
              ></Button>
            </div>
          </Col>
        </Row>
      </Col>
    );
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  setUpdate = () => {
    if (this.state.isUpdate) this.setState({ isUpdate: false });
    else this.setState({ isUpdate: true });
  };

  onConstraints = (obj) => {
    const { name,dataType, subType, type, placeHolder } = obj;


    // console.log("objjjjjjjjjjjjjjjjjjjjjjjjj",obj);
    // if (
    //   /^[a-zA-Z0-9]+$/.test(
    //     name
    //   ))
    //   {
    //     return "Field Name Invalid"
    //   }
    if (!dataType) return "*DataType Required";
    if (!subType) return "*SubType Required";
    if (!type) return "*Type Required";
    if (!placeHolder) return "*PlaceHolder Required";

    if (dataType === "date" && (subType !== "single" || type !== "String"))
      return "*DataType Date containts mismatched, Subtype: single, Type: string";

      if (dataType === "float" && (subType !== "single" || (type !== "Float" && type!=="Formula") ))
      return "*DataType Float containts mismatched, Subtype: single, Type: float";


      // if (dataType === "float" && (subType !== "single" || type !== "Formula" ))
      // return "*DataType Float containts mismatched, Subtype: single, Type: formula";
      

      

    if (dataType === "int" && (subType !== "single" || type !== "Int"))
      return "*DataType Int containts mismatched, Subtype: single, Type: int";

    if (dataType === "string" && (subType !== "single" || type !== "String"))
      return "*DataType String containts mismatched, Subtype: single, Type: string";

    if (dataType === "dropdown" && type === "Boolean")
      return "*DataType Dropdown containts mismatched, Type: int,string,float";

    if (dataType === "image" && type !== "String")
      return "*DataType Image containts mismatched, Type: String";

    if (dataType === "boolean" && (subType !== "single" || type !== "Boolean"))
      return "*DataType Boolean containts mismatched, Subtype: single, Type: boolean";

    return null;
  };

  render() {
    const collection = null;
    // const {  } ;
    // console.log("collection 111",collection);
    console.log("updated Object",this.setState.updateObject);
    

    const fields = [
      {
        title: "Field Name",
        index: "name",
        type: "input",
        isRequired: true,
      },
      {
        title: "Field Type",
        index: "type",
        type: "select",
        options: ["String", "Int", "Float", "Boolean","Formula"],
      },
      {
        title: "Field SubType",
        index: "subType",
        type: "select",
        options: ["single", "array"],
      },
      {
        title: "Required",
        index: "isRequired",
        type: "radio",
      },
      {
        title: "Downloadable",
        index: "isDownloadable",
        type: "radio",
      },
      {
        title: "Place Holder",
        index: "placeHolder",
        type: "input",
        isRequired: true,
      },
      {
        title: "Data Type",
        index: "dataType",
        type: "select",
        options: [
          "string",
          "int",
          "float",
          "dropdown",
          "image",
          "boolean",
          "date",
        ],
      },
      {
        title: "Default Values Comma Separated",
        index: "defaultValues",
        type: "input",
      },

      {
        title: "Formula",
        index: "formula",
        type: "input",
      },
    ];

    const fields_update = [
      {
        title: "Field Name",
        index: "name",
        type: "input",
        isRequired: true,
      },
      {
        title: "Field Type",
        index: "type",
        type: "select",
        options: ["String", "Int", "Float", "Boolean","Formula"],
      },
      {
        title: "Field SubType",
        index: "subType",
        type: "select",
        options: ["single", "array"],
      },
      {
        title: "Required",
        index: "isRequired",
        type: "radio",
      },
      {
        title: "Downloadable",
        index: "isDownloadable",
        type: "radio",
      },
      {
        title: "Place Holder",
        index: "placeHolder",
        type: "input",
        isRequired: true,
      },
      {
        title: "Data Type",
        index: "dataType",
        type: "select",
        options: [
          "string",
          "int",
          "float",
          "dropdown",
          "image",
          "boolean",
          "date",
        ],
      },
      {
        title: "Default Values Comma Separated",
        index: "attribute_default_values",
        type: "input",
      },

      {
        title: "Formula",
        index: "formula",
        type: "input",
      },
      
    ];


    return (
      <React.Fragment>
        <Header title={"Collection"} image={inventory} />
        { this.state.isLoading ? (
          <div class="loader"></div>
        ) : null}

        <Row gutter={16} type="flex">
          <Col span={2}></Col>
          <Col span={2}>
            <Button
              type="primary"
              size={"default"}
              style={{ background: "#39b54a", width: "100%" }}
              onClick={() => this.props.history.push("/inventory")}
            >
              <span className="custom-footer-text">Back</span>
            </Button>
          </Col>
        </Row>

        <div style={{ marginRight: "10%", marginLeft: "10%", marginTop: "5%" }}>
          <Add title={"Add / Edit New Collection"} />

          <div className="info-form-block">
            <Row gutter={16} type="flex" justify="center">
              <Col span={8}>
                <Form.Item label="Collection Name">
                  <Input
                    value={
                      collection && collection.name
                        ? collection.name.replace("_item", "")
                        : ""
                    }
                    size={"large"}
                    name="total_potential"
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                {/* <Form.Item label="Collection Type">
                  <Input size={"large"} name="total_potential" />
                </Form.Item> */}
              </Col>
            </Row>
          </div>

          <Modal
            title="Confirmation"
            visible={this.state.isDelete}
            onOk={() => {
              this.remove(this.state.deletedId);
              // this.update(this.state.deletedId, { deleted: true });
            }}
            onCancel={() => {
              this.setState({ isDelete: false, deletedId: null });
            }}
          >
            <h5>Are you sure about deleting this ?</h5>
          </Modal>

          <AddModal
            title={"Add New Attribute"}
            fields={fields}
            isVisible={this.state.isVisible}
            cbClose={this.setVisible}
            cbCreate={this.create}
            onLoad={this.get}
            onConstraints={this.onConstraints}
          />

          <UpdateModal
            title={"Update Collection"}
            fields={fields_update}
            isVisible={this.state.isUpdate}
            cbClose={this.setUpdate}
            cbUpdate={this.update}
            onLoad={this.get}
            obj={this.state.updateObject}
            onUpdateChange={this.onUpdateChange}
            onConstraints={this.onConstraints}
          />

          <Add
            title={"Add Input Fields"}
            button={"Add New Field"}
            cbAdd={this.setVisible}
          />
          <Row gutter={16} justify="center">
            {/* {console.log("collectioncollectioncollectioncollectioncollection",collection)} */}
            {this.state.collectionDetail
              ? this.state.collectionDetail.attributes.map((attr, index) => {
                  return this.getField(attr, index);
                })
              : null}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.rootReducer.inventory.collection

  };
};

export default connect(mapStateToProps, null)(Collection);
