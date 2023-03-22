import React from 'react'
import { Container } from 'reactstrap'
import UserList from '../../components/UserList'
import {
    useGetUsersInfoQuery
  } from "../../redux/slice/userSlice";

const index = () => {
    const {data, isLoading} = useGetUsersInfoQuery();
  return (
    <div>
        <Container>
            <div className='m-5 d-flex justify-content-center'>
            <UserList data={data} isLoading={isLoading}/>
            </div>
        </Container>
    </div>
  )
}


export default index;