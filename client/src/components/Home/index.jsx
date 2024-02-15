import React, { useEffect, useState } from 'react'
import './styles.modules.css';
import loader from '../../assets/images/loader.gif'
import { useNavigate } from 'react-router-dom';

const Home = ()=>{
  const [isConnected, setIsConnected]=useState(false);
  const [businessIntegrated , setbusinessIntegrated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const  navigate  = useNavigate();

  useEffect(()=>{
    
  })

  const handleBusinessIntegration = () => {
    setIsConnected(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  const removeIntegration = () => {
    setIsConnected(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }
  
  const goToDashboard = () => {
     navigate('/Dashboard');
  }

  return(
    <div className="centered-container">
      <h2>Facebook Page Integration</h2>    

      {isLoading && (
        <img style={{width:'60px' }} src={loader} alt="data loading"/>
      )}

      {!isConnected && (
      <div className='connectPageBtn'>
        <button  onClick={handleBusinessIntegration}>Connect Page</button>
      </div>)}

      {isConnected && !isLoading && (
        <div className='integrationBtns'>
          {/* <h3 className=''>Integrated Page : {businessIntegrated} </h3> */}
          <button className='deleteBtn' onClick={removeIntegration}>Delete Integration</button>
          <button onClick={goToDashboard}>Reply To Messages</button>
        </div>
      )}

    </div>
  )
}

export default Home

