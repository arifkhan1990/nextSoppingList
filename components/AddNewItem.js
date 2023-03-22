
import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import AddItemText from "../constaint/enum/addItem";
import useItemModalHook from "../BusinessLogic/useAddItemHook";

const AddNewItem = () => {
  const {
    handleOnSubmit,
    handleChange,
    imageUpload,
    isLoading } = useItemModalHook();
  return (
    <div className="offset-col-3 col-6 ">
      <div className="mt-5 mb-5 items-center">
        <h2 className="">{AddItemText.Add_To_Shopping_List}</h2>
      </div>

          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={6}>
                <Label for="item_name">{AddItemText.Item_Name}</Label>
                <Input
                  type="text"
                  name="item_name"
                  id="item_name"
                  placeholder="Add shopping item"
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="category">{AddItemText.Category}</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Add shopping item category"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="price">{AddItemText.Price}</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="item_image">{AddItemText.Image}</Label>
                  <Input
                    type="file"
                    name="item_image"
                    id="item_image"
                    placeholder="Add shopping item Image"
                    onChange={imageUpload}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {isLoading ? AddItemText.Submiting : AddItemText.Add_Item}
              </Button>
            </FormGroup>
          </Form>
    </div>
  );
};

export default AddNewItem;
