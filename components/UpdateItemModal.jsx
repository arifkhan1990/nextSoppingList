import React, { useState, useReducer, useEffect } from 'react';
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

import { useSelector } from 'react-redux';
import {
  useGetItemQuery,
  useUpdateItemMutation,
} from '../redux/slice/itemSlice';
const modalReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};
const UpdateItemModal = ({ itemId, open }) => {
  console.log({ itemId, open });
  const isAuthenticated = true;
  const [modal, setModal] = useState(false);
  const { data, error, isLoading } = useGetItemQuery(itemId);
  const [previousData, setPreviousData] = useState(data?.item);
  const [formData, setFormData] = useReducer(modalReducer, data?.item);

  useEffect(() => {
    setModal(open);
    setPreviousData(null);
  }, [itemId, open]);

  useEffect(() => {
    setPreviousData(data?.item);
  }, [modal, data?.item]);

  console.log({ data });
  const [updateItem, { isPending, isError, isSuccess }] =
    useUpdateItemMutation();
  const handleToggle = () => setModal(!modal);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length == 0)
      return console.log("Don't have For data");
    console.log(formData);
    try {
      await updateItem(formData, itemId);
    } catch (err) {
      console.error('Failed to save the post', err);
    }
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Update Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={6}>
                <Label for='item_name'>Item Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  value={previousData?.name}
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
                    value={previousData?.category}
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
                  value={previousData?.price || 0}
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
                {isPending ? 'Updateting...' : 'Update Item'}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateItemModal;
