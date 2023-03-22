import React from 'react'
import { Container } from 'reactstrap'
import Item from '../../../components/AddNewItem'

const index = () => {
  return (
    <div>
        <Container>
            <div className='m-5 d-flex justify-content-center'>
            <Item />
            </div>
        </Container>
    </div>
  )
}

export default index;