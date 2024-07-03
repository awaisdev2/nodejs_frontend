import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return <div className="container-fluid bg-light text-center py-5">
  <div className="row justify-content-center align-items-center" style={{height: '78vh'}}>
    <div className="col-md-8">
      <h1 className="display-4 fw-bold">A better online to-do list app for work</h1>
      <p className="lead">TodoStream makes it easier for everyone to plan their work by using online to-do lists.</p>
      <Link to="/todo" className="btn btn-dark btn-lg">Get started</Link>
    </div>
  </div>
</div>
}

export default Home;
