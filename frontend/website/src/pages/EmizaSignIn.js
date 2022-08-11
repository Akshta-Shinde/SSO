/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import { useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import DynamicImage from '../components/DynamicImage';
import EmailSignUp from '../components/EmailSignUp';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import logoImg from './loginLogo1.jpg';
import SignInWithGoogle from './SignInWithGoogle';

import '../css/main.css';
import '../css/style.css';

// const CognitoSignIn = ({uEmail}) => (
//     <div class="app-container body-tabs-shadow fixed-sidebar fixed-header">

//       <div class="container login-container">
//           <div class="row">
//               <div class="col-md-6 login-form-1">
//                   <img src="loginLogo1.jpg" class="img img-responsive"/>
//                   <div class="row">
//                       <div class="col-md-3 evole-txt">Evolve. </div>
//                       <div class="col-md-3 enable-txt">Enable. </div>
//                       <div class="col-md-3 empower-txt">Empower</div>
//                   </div>   
//               </div>

//               <div class="col-md-6 login-form-2">

//                   <div class="logoImg">
//                       <img src="https://emizainc.com//wp-content/uploads/2020/10/Emiza-1-color-White@4x.svg" class="img img-responsive" />
//                   </div>

//                   <form id="registrationForm" onSubmit={(e) => this.onSubmitForm(e)}>
//                       <input type="text" placeholder="Email" value={this.state.email}/>
//                       <input type="password" placeholder="Password" value={this.state.password}/>
//                       <input type="submit" class="btnSubmit" value="SignIn"/>
//                   </form>
//               </div>
//           </div>
//       </div>
//   </div>
// );

// const EmizaSignIn = ({uEmail}) => {
//   return (
//     <div>
//         <p>This is working</p>
//       {window.location.href}
//     </div>
//   );
// };

class EmizaSignIn extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        stage: 0,
        email: '',
        password: '',
        userObject: null
      };
  }

  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onEmailChanged(e) {
    this.setState({ email: e.target.value.toLowerCase() });
  }

  onPasswordChanged(e) {
      this.setState({ password: e.target.value });
  }

  async onSubmitForm(e) {
    e.preventDefault();
    try {
        const userObject = await Auth.signIn(
            this.state.email.replace(/[@.]/g, '|'),
            this.state.password
        );
        console.log('userObject', userObject);
        if (userObject.challengeName) {
            // Auth challenges are pending prior to token issuance
            this.setState({ userObject, stage: 1 });
        } else {
            // No remaining auth challenges need to be satisfied
            const session = await Auth.currentSession();
            // console.log('Cognito User Access Token:', session.getAccessToken().getJwtToken());
            console.log('Cognito User Identity Token:', session.getIdToken().getJwtToken());
            // console.log('Cognito User Refresh Token', session.getRefreshToken().getToken());
            this.setState({ stage: 0, email: '', password: '', code: '' });
            this.props.history.replace('/app');
        }
    } catch (err) {
        alert(err.message);
        console.error('Auth.signIn(): ', err);
    }
  }

  CognitoSignIn() {
    const isValidEmail = this.isValidEmail(this.state.email);
    const isValidPassword = this.state.password.length > 1;

    return(
      <div class="app-container body-tabs-shadow fixed-sidebar fixed-header">
        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <img src={logoImg} class="img img-responsive"/>
                    <div class="row">
                        <div class="col-md-3 evole-txt">Evolve. </div>
                        <div class="col-md-3 enable-txt">Enable. </div>
                        <div class="col-md-3 empower-txt">Empower</div>
                    </div>   
                </div>

                <div class="col-md-6 login-form-2">

                    <div class="logoImg">
                        <img src="https://emizainc.com//wp-content/uploads/2020/10/Emiza-1-color-White@4x.svg" class="img img-responsive" />
                    </div>

                    <form id="registrationForm" onSubmit={(e) => this.onSubmitForm(e)}>
                      <div class="form-group">
                        <input class="form-control" type="email" name="email" placeholder="Email Address"
                          value={this.state.email} onChange={(e) => this.onEmailChanged(e)} required autoFocus/>
                      </div>
                      <div class="form-group">
                          <input class="form-control" type="password" placeholder="Password"
                              name="password" value={this.state.password} onChange={(e) => this.onPasswordChanged(e)} required />
                      </div>
                      <div class="form-group">
                          <input type="submit" class="btnSubmit" value="Sign in"/>
                          {/* <button class="btnSubmit" onClick={() => {Auth.federatedSignIn({ provider: 'Google' })}}>Continue with Google</button> */}
                          <SignInWithGoogle />
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
  }

  render() {
    return this.CognitoSignIn();
}
}

export default EmizaSignIn;
