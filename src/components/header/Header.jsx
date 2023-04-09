import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import {  Link } from 'react-router-dom'
import "./header.css"


export default function Header() {
  
  return (
    <>
<div>
<header>
      <nav>
        <a className='logo' href="/">Dolly Angels</a>
        <ul>
          
          <li ><a href="/about">About Us</a></li>
          <li ><a href="/gallery">Gallery</a></li>
          <li ><a href="/contact">Enquiry</a></li>
        </ul>
      </nav>
    </header>
    </div>
        {/* <div>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand as={Link} to={'home'}>
                Dolly Angels School
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to={'/aboutus'}>
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to={'/gallery'}>
                  Gallery
                </Nav.Link>
                <Nav.Link as={Link} to={'/contact'}>
                  Enquiry
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div> */}
    </>
  )
}
