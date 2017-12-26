import axios from 'axios';
import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	FETCH_MESSAGE
	 } from './types';

const ROOT_URL ='http://localhost:3090'; // this is the express server on port 3090 -- manully set to.

export function signinUser(formValues, redirectOnSuccess){
	// reduxThunk gives access to dispatch must return function
	// dispatch forwards actions to reducers
	// thunk : handle multiple actions inside creator

	// can run dev server and express server at same time on different tabs but they have to use different ports...
	return function(dispatch){
		createToken({
			formValues,
			dispatch,
			redirectOnSuccess,
			route: 'signin',
			errorMessage: 'Email and/or Password is incorrect',
		});
	};
};

export function signupUser(formValues, redirectOnSuccess){
	return function(dispatch) {
		createToken({
			formValues,
			dispatch,
			redirectOnSuccess,
			route: 'signup',
			errorMessage: 'Email and/or Password is incorrect',
		});
	};
};

export function createToken({ redirectOnSuccess, errorMessage, dispatch, route, formValues: {password, email}}){
	axios.post(`${ROOT_URL}/${route}`, {email, password})
	.then(response => {
		dispatch({type: AUTH_USER}); // update state to indicate user is authenticated -- same as returning action --> goes to reducer
		localStorage.setItem('token', response.data.token); // save token to be used to login & hit auth routes
		redirectOnSuccess(); // redirect user to /feature route
	})
	.catch(({response}) => {
		// { response } is hidden so you grab it and it contains everything for server...
		if(response.data && response.data.error){
			errorMessage = response.data.error;
		}
		dispatch(authError(errorMessage));
	});
};

export function signoutUser(){
	localStorage.removeItem('token'); // remove token on signout
	return {
		type: UNAUTH_USER,
	}
};

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error,
	}
};

export function fetchMessage(){
	return function(dispatch){
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token')} // attach tokens to header to get access to protect routes
		})
		.then((response) => {
			console.log('response', response.data.message);
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message,
			});
		})
		.catch(({response}) => {
			dispatch(authError(response));
		});
	}
}

// PASSWORD RESET -----
// Good question.  You could issue a POST request to a 'resetpasswordrequest' route on the API.  
// The server would then send an email to the email address on hand with a special link that contains a token (not a jwt token, just a random string of characters).  
// Clicking on the link would take you to the React/Redux app with - and this is important - that token in the URL.  In the react app, you could enter a new password and the app would make another POST to '/resetpassword' with the new password and the token.  
// If the token matches the one that was created for the password reset email, then go ahead and update the password.
// This exact flow is how the vast majority of web apps today handle password resetting.