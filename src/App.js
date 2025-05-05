import React from 'react';
import Navbar from './components/Navbar.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App(){
  const user=useSelector(store=>store.auth.user)
  return (
    <div>
      <Navbar />
      <div
        className="Container d-flex justify-content-center align-items-center py-5"
        style={{textAlign: 'center',}}>
        <div className='py-5'>
          <h1>HydrateToday</h1>
          <p className="container"style={{textAlign:"center"}}>
            Welcome to your personalized hydration tracker! Our goal is to help you stay hydrated throughout the day by easily tracking your water intake.<br/> Whether you're aiming for better health, more energy, or improved focus, our app helps you reach your daily hydration goals.
            <br/>Stay on top of your water intake with simple tracking, helpful reminders, and insightful progress reports. <br/>Let's drink to a healthier you!
            
            
          </p>

          {user?
          <>
          <Link to="/view/" className='btn btn-primary'>Track Here</Link></>:

          <>
          <Link to="/signup/" className='btn btn-success'>Signup</Link>
          <Link to="/login/" className='btn btn-outline-success mx-5'>Login</Link></>}
          <br/>
        
        </div>
        
      </div>
    </div>
  );
};

export default App;
