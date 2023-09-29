import React, { Component } from "react";
import { Button, Icon, Col, Row, Modal } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import inventory_img from "../../../assets/images/latest/household.png";
import { MODULE_API } from "../../../apis";
import { connect } from "react-redux";
import { setInventories } from "../../../redux/inventory/actions";
import "./inventory.style.css";
import { withRouter } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

import { postSetInventories } from "../../../redux/slices/inventorySlice";
import Loader from "../../styled-components/loader/loader";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventories: [],
      insurance_rows: [],
      formData: {},
      isVisible: false,
      isUpdate: false,
      updateObject: null,
      isLoading: false,
      isDelete: false,
      deletedId: null,
      pageNum: 2,
      limit: 10,
      collectibles_fields: [],
      totalCollectibles: 0,
    };
  }

  componentDidMount() {
    console.log("in component did mount");
    this.get();
  }

  handleScrollEnd = async (e) => {
    try {
      const bottom =
        e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
          e.target.clientHeight ||
        e.target.scrollHeight - Math.ceil(e.target.scrollTop - 1) ===
          e.target.clientHeight;
      console.log("scroll height", e.target.scrollHeight);
      console.log("scroll top", Math.ceil(e.target.scrollTop));
      console.log(
        "scroll height difference",
        e.target.scrollHeight - Math.ceil(e.target.scrollTop)
      );
      console.log("scroll client height", e.target.clientHeight);

      // console.log("total", this.state.totalCollectibles);
      // console.log("total 1", this.state.collectibles_fields.length);
      if (bottom) {
        console.log("scroll bottom condition detected");

        if (
          this.state.collectibles_fields.length < this.state.totalCollectibles
        ) {
          this.setState({ pageNum: this.state.pageNum + 1 });
          console.log("page number", this.state.pageNum);
          this.setState({ isLoading: true });
          let inventories = await MODULE_API.fetchAll({
            history: this.props.history,
            pageNum: this.state.pageNum,
            limit: 10,
          });
          console.log("bodyyyyyyyyyyyyyy in scroll end", [
            ...this.state.collectibles_fields,
            ...inventories.body,
          ]);
          if (inventories.status === 200) {
            this.setState({ isLoading: false });

            this.setState({
              ...this.state,
              collectibles_fields: [
                // ...this.state.collectibles_fields,
                ...this.state.collectibles_fields,
                ...inventories.body,
              ],
            });
          }
        } else {
          console.log(
            "collectibles are equal to total size no more scroll scroll end"
          );
        }
      } else {
        console.log("bottom not detected scroll end");
      }
    } catch (error) {
      console.log("ERR ", error);
    }
  };

  handleOnDragEnd = async (result) => {
    try {
      console.log("handleOnDragEnd result", result);
      this.setState({ isLoading: true });

      let payload = {
        source: {
          id: 545,
          priority: 2,
        },
        target: {
          id: 555,
          priority: 87,
        },
      };
      const sourceIndex = result.source.index;
      const targetIndex = result.destination.index;

      console.log("handleOnDragEnd sourceIndex", sourceIndex);
      console.log("handleOnDragEnd targetIndex", targetIndex);

      const copyCollectiblesFieldsArray = [...this.state.collectibles_fields];
      const copyCollectiblesFieldsArrayForSwapping = [
        ...this.state.collectibles_fields,
      ];

      console.log(
        "handleOnDragEnd copyCollectiblesFieldsArray",
        copyCollectiblesFieldsArray
      );

      // from index of source and destination collectibles,
      // get id and priority of source and destination and append it to payload object
      for (let i = 0; i < copyCollectiblesFieldsArray.length; i++) {
        if (i + 1 == sourceIndex) {
          payload.source.id = copyCollectiblesFieldsArray[i].id;
          payload.source.priority = copyCollectiblesFieldsArray[i].priority;
        }
        if (i + 1 == targetIndex) {
          payload.target.id = copyCollectiblesFieldsArray[i].id;
          payload.target.priority = copyCollectiblesFieldsArray[i].priority;
        }
      }

      console.log("handleOnDragEnd payload after swapping", payload);

      // swap aource and target items in collectibles fields array
      copyCollectiblesFieldsArrayForSwapping[targetIndex - 1] =
        copyCollectiblesFieldsArray[sourceIndex - 1];
      copyCollectiblesFieldsArrayForSwapping[sourceIndex - 1] =
        copyCollectiblesFieldsArray[targetIndex - 1];

      console.log(
        "handleOnDragEnd copyCollectiblesFieldsArrayForSwapping",
        copyCollectiblesFieldsArrayForSwapping
      );

      // code to shift source item to target and remaining items will remain in same priority
      // const copyItems = Array.from(this.state.collectibles_fields);
      // const [reorderedItem] = copyItems.splice(result.source.index - 1, 1);
      // copyItems.splice(result.destination.index - 1, 0, reorderedItem);

      this.setState({
        collectibles_fields: copyCollectiblesFieldsArrayForSwapping,
      });

      await MODULE_API.swapCollectibles(payload);
      this.get();
      this.setState({ isLoading: true });
    } catch (e) {
      console.log(e);
    }
  };

  get = async () => {
    try {
      console.log("in get request");
      this.setState({ pageNum: 2 });

      this.setState({ isLoading: true });
      console.log("page num", this.pageNum);
      const { dispatch, inventory } = this.props;
      let inventories = await MODULE_API.fetchAll({
        history: this.props.history,
        pageNum: 1,
        limit: 10,
      });
      // let res = await axios.get(
      //  "https://8ko2agg5e6.execute-api.us-east-1.amazonaws.com/dev02/module/all"
      //  "http://192.168.1.46:3000/dev02/module/all",

      // );
      // let inventories = res.data
      // console.log("bodyyyyyyyyyyyyyy", inventories);
      if (inventories.status === 200) {
        this.setState({
          collectibles_fields: inventories.body,
        });
        this.setState({ isLoading: false });
        this.setState({ totalCollectibles: inventories.count });
      }
      dispatch(postSetInventories(inventories.body));
      this.setState({ inventories: inventories.body, isLoading: false });
    } catch (error) {
      console.log("ERR ", error);
    }
  };

  update = async (id, body) => {
    try {
      this.setState({ isLoading: true });
      let update = await MODULE_API.update(id, body);
      await this.get();
      this.setState({ isDelete: false, deletedId: null });
      return update;
    } catch (error) {}
  };

  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  getRow = ({ inventory, index }) => {
    return (
      <Draggable
        key={inventory.name}
        draggableId={inventory.name}
        index={index}
      >
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Row type="flex" className="custom-sub-container" key={index}>
              <Col span={2}>
                <div className="custom-sub-index">
                  <span className="custom-index-format">{index}</span>
                </div>
              </Col>

              <Col
                span={10}
                onClick={() => {
                  this.props.history.push(`/collection/${inventory.name}`);
                }}
              >
                <div className="custom-field-alignments">
                  <div className="custom-filed-margin">
                    <span className="custom-field-heading-style">
                      {inventory.name}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="custom-field-alignments">
                  <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: inventory.enable ? "#39b54a" : "#C41E3A",
                      width: "25%",
                    }}
                    onClick={() => {
                      this.update(
                        inventory.id,
                        inventory.enable ? { enable: false } : { enable: true }
                      );
                    }}
                  >
                    <span>{inventory.enable ? "Enable" : "Disabled"}</span>
                  </Button>
                </div>
              </Col>

              <Col span={1}>
                <div className="custom-field-alignments-icons">
                  <Button
                    type="link"
                    style={{ fontSize: "21px" }}
                    icon="edit"
                    onClick={() => {
                      this.setState({ updateObject: inventory }, () => {
                        this.setUpdate();
                      });
                    }}
                  ></Button>
                </div>
              </Col>
              <Col span={1}>
                <div className="custom-field-alignments-icons">
                  <Button
                    type="link"
                    style={{ fontSize: "21px" }}
                    icon="delete"
                    onClick={() => {
                      this.setState({
                        deletedId: inventory.id,
                        isDelete: true,
                      });
                      // this.update(inventory.id, { deleted: true });
                    }}
                  ></Button>
                </div>
              </Col>
            </Row>
          </li>
        )}
      </Draggable>
    );
  };

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  setUpdate = () => {
    if (this.state.isUpdate) this.setState({ isUpdate: false });
    else this.setState({ isUpdate: true });
  };

  createModule = async (body) => {
    try {
      const { inventory } = this.props;
      this.setState({ isLoading: true });
      const { name, subType, image } = body;
      let uploadimg = null;
      let formData = new FormData();
      formData.append("image", image);

      let img = await MODULE_API.uploadImage(formData);
      if (img && img.status === 200) uploadimg = img.file_url;

      let req = {
        name,
        subType,
        image: uploadimg,
        module: "Collection",
        attributes: [
          {
            name: "total",
            type: "Int",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Total",
            dataType: "Int",
          },
          {
            name: "image",
            type: "String",
            isRequired: true,
            isDownloadable: true,
            placeHolder: "Select Image",
            dataType: "image",
          },
        ],
      };

      // req["priority"] = inventory.length + 1;
      console.log("inventoryyyyyyyyyyyyy", inventory);
      console.log("reqqqqqq", req);
      let create = await MODULE_API.create(req);
      console.log("responce", create.module.id);
      const parentId = create.module.id;
      console.log("parent id", parentId);

      let req2 = {
        name: `${name}_item`,
        subType,
        module: "Collection",
        parentId: parentId,
        attributes: [
          // {
          //   name: "Value",
          //   type: "Int",
          //   subType: "single",
          //   isRequired: true,
          //   isDownloadable: true,
          //   placeHolder: "Enter Value",
          //   dataType: "int",
          // },
          {
            name: "Item Name",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Item Name",
            dataType: "string",
            priority: 1,
          },
          {
            name: "Quantity",
            type: "Int",
            subType: "single",
            isRequired: true,
            isDownloadable: true,
            placeHolder: "Enter Quantity",
            dataType: "int",
            priority: 2,
          },
          {
            name: "Universal Product Code",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Scan UPC or Enter UPC",
            dataType: "string",
            priority: 3,
          },
          {
            name: "Price Paid (each)",
            type: "Float",
            subType: "single",
            isRequired: true,
            isDownloadable: true,
            placeHolder: "Enter Price Paid (each)",
            dataType: "float",
            priority: 4,
          },
          {
            name: "Total Paid",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "",
            dataType: "Formula",
            formula:
              "function attribute(name) {\
              return  values[name];\
            }\
            \
            attribute('Quantity')*attribute('Price Paid (each)');\
            ",
            priority: 5,
            // "attribute('Quantity')*attribute('Price Paid (each)')"
          },
          {
            name: "Purchased Where",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Purchased Where",
            dataType: "string",
            priority: 6,
          },
          {
            name: "Purchase Date",
            type: "Date",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Purchase Date",
            dataType: "date",
            priority: 7,
          },
          // {
          //   name: "Appreciation/Depreciation %",
          //   type: "Float",
          //   subType: "single",
          //   isRequired: false,
          //   isDownloadable: false,
          //   placeHolder: "Enter %",
          //   dataType: "float",
          //   priority:7
          //   // formula  :"1"
          // },
          {
            name: "Update Value (Appraisal or other method, each)",
            type: "Float",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Update Value (each)",
            dataType: "float",
            priority: 8,
          },
          {
            name: "Update Source (Self, Auction, Pro, etc)",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Update Source",
            dataType: "string",
            priority: 9,
          },
          {
            name: "Update Date",
            type: "Date",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Update Date",
            dataType: "date",
            priority: 10,
          },
          // {
          //   name: "Estimated Current Value Per Item (No Update Value)",
          //   type: "String",
          //   subType: "single",
          //   isRequired: false,
          //   isDownloadable: false,
          //   placeHolder: "",
          //   dataType: "Formula",
          //   formula:"function attribute(name) {\
          //     return  values[name];\
          //   }\
          //   \
          //   attribute('Quantity')*attribute('Price Paid (each)');\
          //   ",
          //   priority:11

          //   //  "attribute('Quantity')*attribute('Price Paid (each)')"
          // },{
          //   name: "Estimated Current Value Per Item (With Update Value)",
          //   type: "String",
          //   subType: "single",
          //   isRequired: false,
          //   isDownloadable: false,
          //   placeHolder: "",
          // dataType: "Formula",
          //   formula:"function attribute(name) {\
          //     return  values[name];\
          //   }\
          //   \
          //   attribute('Quantity')*attribute('Update Value');\
          //   ",
          //   priority:12
          //   // "attribute('Quantity')*attribute('Update Value')"
          // },

          {
            name: "Estimated Total Current Value",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "",
            dataType: "Formula",
            formula:
              "function attribute(name) {return  values[name];            };   let v = attribute('Update Value (Appraisal or other method, each)');if (!v){attribute('Total Paid')}else{v =  attribute('Update Value (Appraisal or other method, each)');attribute('Quantity') * v}",
            // formula:"function attribute(name) {return  values[name];            }   \n\nlet v = attribute('Estimated Current Value Per Item (With Update Value)')\nif (v == 0)\nv =  attribute('Estimated Current Value Per Item (No Update Value)')\nattribute('Quantity') * v",
            priority: 11,
          },
          {
            name: "Storage Location",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Storage Location",
            dataType: "string",
            priority: 12,
          },
          {
            name: "Location Details",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Location Details",
            dataType: "string",
            priority: 13,
          },
          {
            name: "Image",
            type: "String",
            subType: "array",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Upload Image",
            dataType: "image",
            priority: 14,
          },
          {
            name: "Owner",
            type: "String",
            subType: "single",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Enter Owner",
            dataType: "string",
            priority: 15,
          },
          {
            name: "Upload Document",
            type: "String",
            subType: "array",
            isRequired: false,
            isDownloadable: false,
            placeHolder: "Upload Document",
            dataType: "image",
            priority: 16,
          },
        ],
      };
      console.log("inventry param", req2);
      await MODULE_API.create(req2);
      this.setState({ isLoading: false });
      return create;
    } catch (error) {}
  };

  render() {
    console.log("collectibles_fields outside", this.state.collectibles_fields);

    const fields = [
      {
        title: "Name",
        index: "name",
        type: "input",
        isRequired: true,
      },
      {
        title: "Module",
        index: "module",
        type: "input",
        def: "Collection",
        isDisabled: true,
      },
      {
        title: "Sub Type",
        index: "subType",
        type: "input",
      },
      {
        title: "Image",
        index: "image",
        type: "document",
      },
    ];

    const fields_update = [
      {
        title: "Name",
        index: "name",
        type: "input",
        isRequired: true,
        isDisabled: false,
      },
      {
        title: "Module",
        index: "module",
        type: "input",
        def: "Collection",
        isDisabled: true,
      },
      {
        title: "Sub Type",
        index: "subType",
        type: "input",
      },
    ];

    const { inventory } = this.props;

    return (
      <React.Fragment>
        <Loader isLoading={this.state.isLoading} />

        <Header title={"Inventory"} image={inventory_img} />
        {/* {!inventory || inventory.length === 0 ? (
          <div class="loader" ng-hide="data.length > 0"></div>
        ) : null} */}
        {/* {this.state.isLoading ? (
          <div class="loader" ng-hide="data.length > 0"></div>
        ) : null} */}

        <div style={{ marginRight: "10%", marginLeft: "10%", marginTop: "5%" }}>
          <Modal
            title="Confirmation"
            visible={this.state.isDelete}
            onOk={() => {
              this.update(this.state.deletedId, { deleted: true });
            }}
            onCancel={() => {
              this.setState({ isDelete: false, deletedId: null });
            }}
          >
            <h5>Are you sure about deleting this ?</h5>
          </Modal>

          <AddModal
            title={"Add New Collection"}
            fields={fields}
            isVisible={this.state.isVisible}
            cbClose={this.setVisible}
            cbCreate={this.createModule}
            onLoad={this.get}
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
          />

          <Add
            title={"My Collection"}
            button={"Add New Collection"}
            cbAdd={this.setVisible}
          />

          <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="collectibles">
              {(provided) => (
                <ul
                  className="collectibles-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  onScroll={this.handleScrollEnd}
                >
                  {this.state.collectibles_fields.map((inventory, index) => {
                    return this.getRow({ inventory, index: index + 1 });
                  })}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          {/* <div>
         {inventory.map((inventory, index) => {
            return this.getRow({ inventory, index: index + 1 });
          })}
         </div> */}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("all inventries", state.rootReducer.inventory.inventories);

  return {
    inventory: state.rootReducer.inventory.inventories,
  };
};

export default withRouter(connect(mapStateToProps, null)(Inventory));
