import React, { useState, useEffect,useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { navigate, A, useRoutes } from 'hookrouter';


import AppProvider from './AppProvider.js'; 
import { AppContext } from './AppProvider.js';

const StyledApp = styled.div`
`;
import { Login } from './Login.js';
import { Admin } from './Admin.js';
import { Public } from './Public.js';
import { Dashboard } from './Dashboard.js';
function App() {

	const routes = {
                '/': () => <Public />,
                '/login': () => <Login />,
		'/admin': () => <Admin />,
                '/dashboard' : () => <Dashboard />,
	}

const routeResult = useRoutes(routes);
const handleRoute = (r) => { navigate(r); }
	return(
		<AppProvider>
			<AppContext.Consumer>
				{({  }) => (			
					<StyledApp>
                                            { routeResult }
					</StyledApp>
				)}
			</AppContext.Consumer>
		</AppProvider>
	)
}

if (document.getElementById('react_root')) {
    ReactDOM.render (<App />, document.getElementById('react_root'));
}
