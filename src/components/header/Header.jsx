import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import GalleryCarousel from '../gallery/Gallery'

import ContactUs from '../contact/ContactUs'

export default function Header() {
  return (
    <>
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to={'/home'}>
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
        <div>
          <Routes>
            <Route path="/aboutus" element={<GalleryCarousel />} />
            <Route path="/gallery" element={<GalleryCarousel />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
