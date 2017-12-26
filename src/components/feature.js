import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentDidMount(){
		this.props.fetchMessage();
	}

	renderMessage(){
		if(this.props.message){
			return (
				<div>{this.props.message}</div>
			);
		}
	}

	render(){
		return (
			<div>
				<h2>Feature here</h2>
				{this.renderMessage()}
			</div>
		);
	}
};

function mapStateToProps(state){
	return {message: state.auth.message};
}

export default connect(mapStateToProps, actions)(Feature);