import React, { Component } from 'react';
import $ from 'jquery';
import {firebase} from '../../components/firebase';

class PageComponent extends Component {
    componentWillMount(){
        let comp = this;
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                comp.props.history.push('/add-post');
            } else {
                
            }
          })
    }
    submit = (e) => {
        e.preventDefault();
        let loginArray = $(e.target).serializeArray();
        firebase.auth().signInWithEmailAndPassword(loginArray[0].value, loginArray[1].value).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
            // ...
          })
    }
    render() {
        return (<div class="container">
                <div class="col-sm-12" style={{height:'80vh'}}>
                    <div class="row">
                        <div class="col-sm-8"></div>
                        <div class="col-sm-4">
                            <form class="form-signin my-4" onSubmit={this.submit}>
                                <h2 class="form-signin-heading">Please sign in</h2>
                                <label for="inputEmail" class="sr-only">Email address</label>
                                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                                <label for="inputPassword" class="sr-only">Password</label>
                                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default PageComponent;