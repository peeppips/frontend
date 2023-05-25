import {  List, Typography } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import SidebarNav from '../components/Sidebar';

const HostBotScreen: React.FC = () => {
    return (
      
        <div className="container">
         <Row>
           
         <SidebarNav />
            <Col md={8}>
                My Projects

                <List  bordered>

                <List.Item>
                    <Typography.Text>
                        <Link to="/my-project/new">
                           New Project
                        </Link>
                        </Typography.Text> 
                    </List.Item>
                    
                    <List.Item>
                    <Typography.Text>
                        <Link to="/my-project/adsd">
                           Diamond
                        </Link>
                        </Typography.Text> 
                    </List.Item>

                    <List.Item>
                    <Typography.Text>
                        <Link to="/my-project/sad">
                            Hallo
                        </Link>
                        </Typography.Text> 
                    </List.Item>

                    
        </List>

            </Col>
         </Row>
  
        </div>
     
    );
  };

  
  export default HostBotScreen;
