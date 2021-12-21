import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
      <Navbar className="bar" fixed="top" variant="dark">
          <Container>
              <Navbar.Brand >
                  Notes App
              </Navbar.Brand>
          </Container>
      </Navbar>
  );
};

export default Header;
