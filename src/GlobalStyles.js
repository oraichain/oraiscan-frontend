import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --header-height: 65px;
	  --app-bg: ${({theme}) => theme.data.backgroundColor};
    --text-color: ${({theme}) => theme.data.textColor}
  }
`;
