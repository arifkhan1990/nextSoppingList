import React, { useState, useReducer } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useAddItemMutation } from '../redux/slice/itemSlice';

const modalReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};
const ItemModal = () => {
  const isAuthenticated = true;
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useReducer(modalReducer, {});
  const [addItem, { isSuccess, isError, isLoading }] = useAddItemMutation();

  const handleToggle = () => setModal(!modal);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length == 0)
      return console.log("Don't have For data");

    try {
      await addItem(formData);
    } catch (err) {
      console.error('Failed to save the post', err);
    }
    // console.log(formData);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={6}>
                <Label for='item_name'>Item Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add shopping item'
                  onChange={setFormData}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='category'>Category</Label>
                  <Input
                    type='text'
                    name='category'
                    id='category'
                    placeholder='Add shopping item category'
                    onChange={setFormData}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for='price'>Price</Label>
                <Input
                  type='number'
                  name='price'
                  id='price'
                  defaultValue={0}
                  onChange={setFormData}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='item_image'>Image</Label>
                  <Input
                    type='file'
                    name='item_image'
                    id='item_image'
                    placeholder='Add shopping item Image'
                    onChange={setFormData}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                {isLoading ? 'Submiting...' : 'Add Item'}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
