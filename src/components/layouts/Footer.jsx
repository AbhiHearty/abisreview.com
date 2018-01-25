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
      <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">Copyright © Your Website 2018</p>
      </div>
    </footer>
    );
  }
}

export default header;
