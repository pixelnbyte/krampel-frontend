import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

function PrivateRoute({ component: Component, status, ...rest }) {
	const { authTokens } = useAuth();

	return(
		<Route {...rest} render={(props) => authTokens ? (
			(status) ? (
				<Component status={status} {...props} />
			) : (
				<Component {...props} />
			)
		) : (
			<Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
		)} />
	);
}

export default PrivateRoute;