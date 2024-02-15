import React from 'react'
import './styles.modules.css';
import richPanelIcon from '../../assets/images/richPanelIcon.png';
import dashBoardIcon from '../../assets/images/dashBoardIcon.jpeg';
import profileIcon from '../../assets/images/profileIcon.png';
import tradingIcon from '../../assets/images/tradingGraphIcon.png';
import customerIcon from '../../assets/images/customer.jpeg'

import {Row} from 'reactstrap';

const Navigation =()=> {
  return (
    <div className='containers' style={{background:"lightblue"}}>
       <Row>
          <img className = 'navIcon' src={richPanelIcon} />
       </Row>
       <Row>
          <img className = 'navIcon'  src={dashBoardIcon} />
       </Row>
       <Row>
          <img className = 'navIcon'  src={profileIcon} />
       </Row>
       <Row>
          <img className='navIcon' src = {tradingIcon} />
       </Row>
       <Row style={{position: 'relative' ,
    bottom: '-430px'}}>
          <img style={{borderRadius:"50%"}} className='navIcon' src = {customerIcon} />
       </Row>
    </div>
  )
}

export default Navigation