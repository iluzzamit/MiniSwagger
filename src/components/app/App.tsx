import { primaryColor, theme as defaultTheme } from "../../config/theme";
import { Container, Divider, ThemeProvider } from "@mui/material";
import { PacketDetails } from "../packet-details/PacketDetails";
import { Navigator } from "./Navigator";
import originalData from '../../mock/fe_data.json';
import styled from "styled-components";
import { Header } from "./Header";
import React from "react";

const StyledHeader = styled(Container)`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 5px;
  padding-top: 2rem;

  .header-divider {
    margin: 1rem 0;
  }
  .tabs {
    display: flex;
  }
  .tab {
    padding: 0.2rem 2rem;
    cursor: pointer;
  }
  .selected-tab {
    border-bottom: 3px solid ${primaryColor};
    
    .MuiTypography-body1 {
      font-weight: 700;
    }
  }
`

export const enum Types {
  REQUEST = 'request',
  RESPONSE = 'response'
}

const App = () => {
  const [data, setData] = React.useState(originalData)
  const [currentTab, setCurrentTab] = React.useState<Types>(Types.REQUEST);
  const { method, api, path } = data;

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledHeader maxWidth={false}>
        <Header method={method} api={api} path={path} />
        <Divider className='header-divider' />
        <Navigator currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </StyledHeader>
      <PacketDetails key={currentTab} type={currentTab} data={JSON.parse(JSON.stringify(data))} setData={setData} />
    </ThemeProvider>
  );
}

export default App;
