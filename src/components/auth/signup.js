import React , { Component } from 'react';
import {reduxForm, Field } from 'redux-form';
import {connect } from 'react-redux';
import * as actions from '../../actions';


// could just put action on button click w/ same action but this always custom bye page & anytime you go to signout it will log you out!

class Signup extends Component {
	submitSignup(formProps){
		console.log('submitting');
		// call action creator to signup the user
		 this.props.signupUser(formProps, ()=>{
			this.props.history.push('/feature');
		});
	}

	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>oops</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	// && && --> if all are true then return last
	// field is prop here so we pull off relavent fields we want...
	renderField({input, type, label, meta: {error, touched}}){
		return (
			<div className="field-group">
				<label htmlFor={input.name}>{label}</label>
				<input className="form-control"
				{...input}
				type={type} />
				{touched && error && <div className="error">{error}</div>}
			</div>
		);
	}

	render(){
		const { handleSubmit, submitting, pristine} = this.props; // submitting has to have promise to work
		return (
			<form onSubmit={handleSubmit(this.submitSignup.bind(this))}>
				<Field className="field-group"
					name="email"
					type="email"
					label="Email"
					component={this.renderField}
				></Field>
				<Field 
					name="password"
					type="password"
					label="Password"
					component={this.renderField}
				></Field>
				<Field className="field-group"
					name="passwordConfirm"
					type="password"
					label="Confirm Password"
					component={this.renderField}
				></Field>
				{this.renderAlert()}
				<button type="submit" className="btn btn-primary" disabled={submitting} >Sign up!</button>
			</form>
		);
	}
};

function validate(values){
	const errors = {};
	if(values.password !== values.passwordConfirm){
		errors.password = 'Passwords must match';
	}
	if(!values.email){
		errors.email = 'Email is required';
	}
	if(!values.password){
		errors.password = 'Password is required';
	}
	if(!values.passwordConfirm){
		errors.passwordConfirm = 'Confirm Password is required';
	}

	return errors;
};

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
};

export default reduxForm({
	validate,
	form: 'Signup'
})(connect(mapStateToProps, actions)(Signup));
