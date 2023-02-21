import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemData from '../constaint/data.json';
import Image from 'next/image';
import { BsFillTrashFill, BsWrench } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import {
  useGetItemsQuery,
  useDeleteItemMutation,
} from '../redux/slice/itemSlice';

import UpdateItemModal from './UpdateItemModal';
import ItemModal from './ItemModal';

const ShoppingList = ({ users }) => {
  const [updateModal, setUpdatedModal] = useState('');
  const { data, isLoading, isSuccess, isError } = useGetItemsQuery();

  console.log({ updateModal });
  const [deleteItem, { success, error }] = useDeleteItemMutation();
  console.log(useDeleteItemMutation());
  const items2 = ItemData;
  const isAuthenticated = true;

  const handleDelete = async (id) => {
    try {
      await deleteItem({ id });
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  const handleUpdate = async (e) => {
    setUpdatedModal('');
    setUpdatedModal(e);
  };

  return (
    <Container>
      <ItemModal />
      {isError ? (
        <h4 className='text-center m-auto'>Oh no, there was an error</h4>
      ) : isLoading ? (
        <h1 className='text-center m-auto'>Loading...</h1>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Image</th> */}
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                {/* <td>
              <Image src={item.image} alt="" width={40} height={40} />
            </td> */}
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => handleDelete(item._id)}
                  >
                    <BsFillTrashFill />
                  </Button>{' '}
                  <Button
                    className='edit-btn '
                    color='info'
                    size='sm'
                    onClick={() => handleUpdate(item._id)}
                  >
                    <BsWrench />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {updateModal && <UpdateItemModal itemId={updateModal} open={true} />}
    </Container>
  );
};

export default ShoppingList;
