import React ,{ Component } from'react';
import { NavLink } from 'react-router-dom';

class header extends Component {
    login = () =>{
        this.props.app.login({token:'123454',user:'login'});
    }
    logout = () =>{
        this.props.app.logout();
    }
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="index.html">Start Bootstrap</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="about.html">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/list">List</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

export default header;
