import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Link className='navbar-brand' to='/'>TodoStream</Link>
          <Nav className="float-end">
            <Link className={`nav-link mx-1 ${location.pathname === '/' && 'bg-primary text-light rounded'}`} to='/'>Home</Link>
            <Link className={`nav-link mx-1 ${location.pathname === '/todo' && 'bg-primary text-light rounded'}`} to='/todo'>Todo</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
