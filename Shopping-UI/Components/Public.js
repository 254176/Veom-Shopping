import React from 'react';
import styled from 'styled-components';


const StyledPublic = styled.div`
	
`;

import { Header } from './Header.js';
import { Footer } from './Footer.js';


export function Public() {
	return(
		<StyledPublic>
                     <Header />
                     <Footer />	
		</StyledPublic>
	)
}
