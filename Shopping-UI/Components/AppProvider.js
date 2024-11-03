import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { navigate } from 'hookrouter'; 
export const AppContext = createContext();
export default function(props) {
return(
		<AppContext.Provider value={{  }}>
			{props.children}
		</AppContext.Provider>
	)
}


