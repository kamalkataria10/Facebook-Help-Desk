import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import './styles.modules.css';
import refreshIcon from '../../assets/images/refreshIcon.svg';
import axios from 'axios';
import { access_token } from '../../Utils/constants';
import {timeAgo} from '../../Utils/helper.js';
import loader from '../../assets/images/loader.gif'


const Conversations = ({ handleActiveChats }) => {
  const [conversations, setConversations] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading , setIsLoading] = useState(false);

  async function fetchConversations() {
    try {
      const url = "https://graph.facebook.com/v19.0/me/conversations?fields=participants,id";
      const permissions = "pages_messaging,read_mailbox,read_page_mailbox";
      const params = {
        permissions,
        access_token,
      };
      const response = await axios.get(url, { params });
      const conversationData = response?.data?.data;
      setConversations(conversationData);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchConversationDetails(item) {
    setIsLoading(true);
    try {
      const url = `https://graph.facebook.com/v19.0/${item?.id}/messages?fields=from,message,created_time`;
      const permissions = "pages_messaging,read_mailbox,read_page_mailbox";
      const params = {
        permissions,
        access_token,
      };
      const response = await axios.get(url, { params });
      const conversationData = response?.data?.data;

      const dataObj = {
        clientName: item?.participants?.data?.[0]?.name,
        msgType: 'Facebook DM',
        msg: conversationData?.[0]?.message,
        subject: 'Awesome Product',
        time: conversationData?.[0]?.created_time,
        id: item?.id,
        participants : item?.participants
      };
      let isDuplicate=false;
      displayData?.forEach((currData)=>{
         if(currData?.id==dataObj?.id)isDuplicate=true;
      })
      setIsLoading(false);
      console.log("display Data", displayData);
      if(!isDuplicate)setDisplayData(prevData => [...prevData, dataObj]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      const fetchData = async () => {
        const promises = conversations.map(item => fetchConversationDetails(item));
        await Promise.all(promises);
      };
      fetchData();
      setDisplayData([]);
    }
  }, [conversations]);

  const setActiveChats = (item) => {
    setCurrentChatId(item?.id);
    handleActiveChats(item);
  }

  if(isLoading){
    return (
      <>
      <div className='conversationHeader'>
        <h3>Conversations</h3>
        <button onClick = {fetchConversations} className='refreshBtn'><img src={refreshIcon} alt="Refresh Icon" /></button>
      </div>
      <div className='loaderImg' >
      <img style={{width:"200px", height:"120px"}} src = {loader} />
      </div>
      </>)
      
  }

  return (
    <div className='containers'>
      <div className='conversationHeader'>
        <h3>Conversations</h3>
        <button onClick = {fetchConversations} className='refreshBtn'><img src={refreshIcon} alt="Refresh Icon" /></button>
      </div>

      {displayData?.map((item, index) => (
        <div
          className={`conversationItem ${item.id === currentChatId ? 'currentConversation' : ''}`}
          onClick={() => setActiveChats(item)}
          key={item?.id}
        >
          <Row>
            <Col className='checkBox' md="1" xs="1">
              <input type='checkbox' />
            </Col>
            <Col md="8" xs="8">
              <Row className='pl5 body-1-strong'>{item?.clientName}</Row>
              <Row className='pl5 body-2'>{item?.msgType}</Row>
            </Col>
            <Col md="3" xs="3">
              <span className='text'>{timeAgo(item?.time)}</span>
            </Col>
          </Row>
          <Row className='itemContent'>
            <Col md="12" xs="12">
              <Row className='label'>{item?.subject}</Row>
              <Row className='text'>{item?.msg}</Row>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
