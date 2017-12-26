import React , { Component } from 'react';
import {reduxForm, Field } from 'redux-form';
import {connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

	submitSignin({email, password}){
		// log user in...
		this.props.signinUser({email, password}, () => {
			this.props.history.push('/feature');
		});
	}

	renderField({input, type, label, meta: { error, touched }}){ 
		const inputError = `form-group ${touched && error ? 'has-danger' : ''}`
		return(	
			<div className={inputError} >
				<label htmlFor={input.name}>{label}</label>
				<input className="form-control"
					type={type}
					{...input}
				/>
				<div className="text-help">{touched ? error : ''}</div>
			</div>
		);
	}

	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger"><strong>Oops!</strong> {this.props.errorMessage}</div>
			);
		}
	}

	render(){
		const { handleSubmit } = this.props; // from redux-form
		return(
			// onsubmit is for reduxForm is always like this... automatiicaly passes values
			<form onSubmit={handleSubmit(this.submitSignin.bind(this))}> 
				<Field 
					name="email"
					label="Email"
					type="email"
					component={this.renderField}
				/>
				<Field 
					name="password"
					type="password"
					label="Password" // as props on field in renderField!
					component={this.renderField}
				/>
				{this.renderAlert()}
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
};

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
}

export default reduxForm({
	form: 'Signin'
})(connect(mapStateToProps, actions)(Signin));




