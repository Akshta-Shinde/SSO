import React from 'react';
import { Auth } from 'aws-amplify';
import DynamicImage from '../components/DynamicImage';
import { withRouter } from 'react-router-dom';

// import '../css/app.css';
// import '../css/main.css';
import '../css/style.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stage: 0,
          email: '',
          password: '',
          userObject: null
        };
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
    
    async onSubmitVerification(e) {
        e.preventDefault();
        try {
            const data = await Auth.confirmSignIn(
            this.state.userObject,
            this.state.code
            );
            console.log('Cognito User Data:', data);
            const session = await Auth.currentSession();
            // console.log('Cognito User Access Token:', session.getAccessToken().getJwtToken());
            console.log('Cognito User Identity Token:', session.getIdToken().getJwtToken());
            // console.log('Cognito User Refresh Token', session.getRefreshToken().getToken());
            this.setState({ stage: 0, email: '', password: '', code: '' });
            this.props.history.replace('/app');
        } catch (err) {
            alert(err.message);
            console.error('Auth.confirmSignIn(): ', err);
        }
    }

    onEmailChanged(e) {
        this.setState({ email: e.target.value.toLowerCase() });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onCodeChanged(e) {
        this.setState({ code: e.target.value });
    }

    isValidEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    renderSignIn() {
        const isValidEmail = this.isValidEmail(this.state.email);
        const isValidPassword = this.state.password.length > 1;

        return(
            <div>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta http-equiv="Content-Language" content="en" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>EMIZA - Login</title>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
                <meta name="description" content="This is an example dashboard created using build-in elements and components." />
                <meta name="msapplication-tap-highlight" content="no" />

                <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
                <script src="login-js/amazon-cognito-auth.min.js"></script>
                <script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>
                <script src="login-js/amazon-cognito-identity.min.js"></script>
            </head>

            <body>
                <div class="app-container body-tabs-shadow fixed-sidebar fixed-header">

                    <div class="container login-container">
                        <div class="row">
                            <div class="col-md-6 login-form-1">
                                <img src="./assets/images/loginLogo1.jpg" class="img img-responsive"/>
                                <div class="row">
                                    <div class="col-md-3" style={{color: '#00cc7f'}}>Evolve. </div>
                                    <div class="col-md-3" style={{color: '#20b7e8'}}>Enable. </div>
                                    <div class="col-md-3" style={{color: '#00819d'}}>Empower</div>
                                </div>   
                            </div>

                            <div class="col-md-6 login-form-2">

                                <div class="logoImg">
                                    <img src="./assets/images/logo.jpg" class="img img-responsive" />
                                </div>

                                <form id="registrationForm" onSubmit={(e) => this.onSubmitForm(e)}>
                                    <input className={isValidEmail?'valid':'invalid'} type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.onEmailChanged(e)}/>
                                    <input className={isValidPassword?'valid':'invalid'} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.onPasswordChanged(e)}/>
                                    <input disabled={!(isValidEmail && isValidPassword)} type="submit" value="Let's Ryde"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
          </div>
        );

    }
    
    renderConfirm() {
        const isValidEmail = this.isValidEmail(this.state.email);
        const isValidCode = this.state.code.length === 6;

        return (
          <div className="app">
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta http-equiv="Content-Language" content="en" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>EMIZA - Login</title>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
                <meta name="description" content="This is an example dashboard created using build-in elements and components." />
                <meta name="msapplication-tap-highlight" content="no" />

                <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
                <script src="login-js/amazon-cognito-auth.min.js"></script>
                <script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>
                <script src="login-js/amazon-cognito-identity.min.js"></script>
            </head>

            <body>
                <div class="app-container body-tabs-shadow fixed-sidebar fixed-header">

                    <div class="container login-container">
                        <div class="row">
                            <div class="col-md-6 login-form-1">
                                <img src="./assets/images/loginLogo1.jpg" class="img img-responsive"/>
                                <div class="row">
                                    <div class="col-md-3" style={{color: '#00cc7f'}}>Evolve. </div>
                                    <div class="col-md-3" style={{color: '#20b7e8'}}>Enable. </div>
                                    <div class="col-md-3" style={{color: '#00819d'}}>Empower</div>
                                </div>   
                            </div>

                            <div class="col-md-6 login-form-2">

                                <div class="logoImg">
                                    <img src="./assets/images/logo.jpg" class="img img-responsive" />
                                </div>

                                <form id="verifyForm" onSubmit={(e) => this.onSubmitVerification(e)}>
                                    <input className={isValidEmail?'valid':'invalid'} type="email" placeholder="Email" value={this.state.email}/>
                                    <input className={isValidCode?'valid':'invalid'} type="text" placeholder="Verification Code" value={this.state.code} onChange={(e) => this.onCodeChanged(e)}/>
                                    <input disabled={!(isValidCode&&isValidEmail)} type="submit" value="Verify"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
          </div>
        );
    }
    render() {
        return this.renderSignIn();
    }
}

export default SignIn;