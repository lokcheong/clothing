import React from 'react';

import './sign-in.styles.scss';

//components
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

//firebase authentications
import {signInWithGoogle} from '../../firebase/firebase.utils.js';


class SignIn extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          email: '',
          password: ''
      }
  };

  handleSubmit = event => {
      //prevent default form submit from firing
      event.preventDefault();

      this.setState({ email: '', password: '' });
  };

  handleChange = event => {
  	//the input elemnts is the event.target
  	const { value, name} = event.target;

  	//[name]: value
		// wrappng a variable with Array brackets and used in object allows setting the "key" of the property within the object dynamically.
		// so in this case, if the name is "email", then it will setState email : value;
		// this is very useful when we have multiple places triggering setState from similar object just with different name:value pair needed.
  	this.setState({[name] : value});

  };


  //instead of using default input component,
  //we build our own input wrapper called FormInput
  //which allows us to re-use input component with customised styles,changes, etc

  //we also use custom button instead of input->type="submit"
  //this allows it to still trigger the form onSubmit action
  //but allow us with more controls on button props
  render() {
    return (
    	<div className='sign-in'>
				<h2> I already have an account </h2>
				<span> Sign in with your email and password </span>

				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name="email" 
						type="email"
						label="email" 
						value={this.state.email} 
						handleChange={this.handleChange} 
						required 
					/>
					<FormInput 
						name="password" 
						type="password"
						label="password" 
						value={this.state.password}
						handleChange={this.handleChange} 
						required 
					/>

					<div className='buttons'>
						<CustomButton type='submit'>
							Sign Up
						</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign In With Google
						</CustomButton>
					</div>
					
				</form>

			</div>
    );
  }
}

export default SignIn;