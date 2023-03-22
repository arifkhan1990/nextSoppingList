import React from 'react'
import { Container } from 'reactstrap'
import UpdateItem from '../../../components/UpdateItem'
import { useRouter } from 'next/router'

const editItem = () => {
  const { query } = useRouter()
  return (
    <div>
        <Container>
            <div className='m-5 d-flex justify-content-center'>
            <UpdateItem itemId={query.id}/>
            </div>
        </Container>
    </div>
  )
}

export default editItem;