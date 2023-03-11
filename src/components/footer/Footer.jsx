import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function Footer() {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Dolly Angels
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Footer
