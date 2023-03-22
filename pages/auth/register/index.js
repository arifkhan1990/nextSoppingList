import React from 'react'
import { Container } from 'reactstrap'
import Register from '../../../components/auth/Register'

const index = () => {
  return (
    <div>
        <Container>
            <div className='m-5 d-flex justify-content-center'>
                <Register />
            </div>
        </Container>
    </div>
  )
}

export default index