import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


// could just put action on button click w/ same action but this always custom bye page & anytime you go to signout it will log you

class Signout extends Component {
	componentWillMount(){
		this.props.signoutUser();
	}
	render(){
		return (
			<div>Sorry to see you go.....</div>
		);
	}
};

export default connect(null, actions)(Signout);