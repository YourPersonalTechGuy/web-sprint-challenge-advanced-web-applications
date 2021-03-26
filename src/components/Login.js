import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    creds:{
      username: "",
      password: ""
    },
    error: ""
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  handleChange = (e) => {
    this.setState({
      creds:{
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    })
  }

  componentDidMount(){
    return localStorage.getItem("token") ? this.props.history.push("/bubblepage") : null
  }

  submitLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", this.state.creds)
      .then((res)=>{
          localStorage.setItem("token", res.data.payload)
          this.props.history.push("/bubblepage")
          this.setState({
            ...this.state,
            error: ""
          })
      })
      .catch((err)=>{
          console.log(err.response)
          this.setState({
            ...this.state,
            error: "Username or Password not valid."
          })
      })
  }

  // useEffect(()=>{
  //   // make a post request to retrieve a token from the api
  //   // when you have handled the token, navigate to the BubblePage route
  //   console.log(setCreds)
  // },[]);
  render(){
    return (
      <>
        <div className="login-form-container">
          {this.state.error && <h2>{this.state.error}</h2>}
          <form onSubmit={this.submitLogin}>
              <label>Username
                <input
                    type="text"
                    name="username"
                    value={this.state.creds.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                />
              </label>
  
              <label>Password
                <input
                    type="password"
                    name="password"
                    value={this.state.creds.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                />
              </label>
  
              <button>Login</button>
          </form>
        </div>
      </>
    );
  }
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.