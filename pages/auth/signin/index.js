import React from 'react'
import { Container } from 'reactstrap'
import Login from '../../../components/auth/Login'

const index = () => {
  return (
    <div>
        <Container>
            <div className='m-5 d-flex justify-content-center'>
                <Login />
            </div>
        </Container>
    </div>
  )
}

export default index