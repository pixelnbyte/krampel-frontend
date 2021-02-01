import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

function PrivateRoute({ component: Component, status, ...rest }) {
	const { authTokens } = useAuth();

	return(
		<Route {...rest} render={(props) => (authTokens == 'admin') ? (
			(status) ? (
				<Component status={status} {...props} />
			) : (
				<Component {...props} />
			)
		) : (
			<Redirect to={{ pathname: "/" }} />
		)} />
	);
}

export default PrivateRoute;