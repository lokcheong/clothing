import React from 'react';

import './signin-signup.styles.scss';

//components
import SignIn from '../../components/sign-in/sign-in.component.jsx';
import SignUp from '../../components/sign-up/sign-up.component.jsx';


const SignInSignUpPage = () => (
	<div className='signin-signup'>
		<SignIn />
		<SignUp />
	</div>
);

export default SignInSignUpPage;


