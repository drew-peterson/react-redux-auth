import React , { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
	class Authentication extends Component {

		componentWillMount(){
			if(!this.props.authenticated){
				this.props.history.push('/');
			}
		}

		// while on component and reRender -- on click signup run this function
		// nextprops is the updatedProps comming in basically this.props
		componentWillUpdate(nextProps){	
			if(!nextProps.authenticated){
				nextProps.history.push('/');
			}
		}

		render(){
			return <ComposedComponent {...this.props}/>
		}
	};
	function mapStateToProps(state){
		return {authenticated: state.auth.authenticated};
	};
	return connect(mapStateToProps)(Authentication); // connect Authentication to state...
};