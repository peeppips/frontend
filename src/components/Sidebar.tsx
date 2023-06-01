import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SidebarNav: React.FC = () => {
    return (
      <Col md={4}>
        <ListGroup >
          <ListGroup.Item>
            <Link to="/host-bots">My Projects</Link>
          </ListGroup.Item>
  
          <ListGroup.Item>
            <Link to="/my-referrals">My Referrals</Link>
          </ListGroup.Item>
  
          <ListGroup.Item>
            <Link to="/my-profile">My Profile</Link>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    );
  };
  

  export default SidebarNav;
