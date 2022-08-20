import { Grid, Typography } from "@mui/material";
import { Types } from "./App";

export function Navigator({ currentTab, setCurrentTab }: { currentTab: Types, setCurrentTab: Function }) {
  return (
    <Grid className='tabs' item xs={12}>
      <Grid className={`tab ${currentTab === Types.REQUEST && 'selected-tab'}`} onClick={() => setCurrentTab(Types.REQUEST)} item xs={1}>
        <Typography color={currentTab === Types.REQUEST ? 'secondary' : 'none'}>Request</Typography>
      </Grid>
      <Grid className={`tab ${currentTab === Types.RESPONSE && 'selected-tab'}`} onClick={() => setCurrentTab(Types.RESPONSE)} item xs={1}>
        <Typography color={currentTab === Types.RESPONSE ? 'secondary' : 'none'}>Response</Typography>
      </Grid>
    </Grid>
  );
}
