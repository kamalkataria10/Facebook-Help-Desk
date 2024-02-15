// Login.js

import React, { useState } from 'react';
import { Col,Row } from 'reactstrap';
import Conversations from './conversations';
import ChatsSection from './chats';
import Navigation from './navigation';
import ProfileDetails from './profileDetails';

const Dashboard = () => {

  const [chatId, setChatId] = useState(null);
  const [currentUser,setCurrentUser] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const setCurrentChatCustomer = (item) => {
     setChatId(item?.id);
     setCurrentUser(item?.participants?.data?.[1]?.id);
     setCurrentCustomer(item?.participants?.data?.[0]);
  }

  return (
    <> 
      <Row style={{background:"rgba(205,209,228,0.3"}}>
        <Col md="1" xs="12">
            <Navigation />
        </Col>
        <Col md="3" xs="12">
            <Conversations handleActiveChats={setCurrentChatCustomer}/>
        </Col>
        <Col md="5" xs="12">
            <ChatsSection chatId = {chatId} currentUserId={currentUser}
             currentCustomer={currentCustomer} />
        </Col>
        <Col md="3" xs="12">
            <ProfileDetails currentCustomer={currentCustomer} />
        </Col>
      </Row>
      {/* <h1>Hello</h1> */}
    </> 
  );
};

export default Dashboard;

