import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import GalleryCarousel from '../gallery/Gallery'

import ContactUs from '../contact/ContactUs'
import Clouds from '../clouds/Clouds'

export default function Header() {
  
  return (
    <>
        <div>
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
        </div>
    </>
  )
}
