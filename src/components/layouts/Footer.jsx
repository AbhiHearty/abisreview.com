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
    const today = new Date();
    return (
      <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">Copyright &copy; {today.getFullYear()} abhisreview.com</p>
      </div>
    </footer>
    );
  }
}

export default header;
