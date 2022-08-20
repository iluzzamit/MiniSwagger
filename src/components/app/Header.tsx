import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Grid, Typography } from "@mui/material";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
    display: flex;
    flex-direction: row;
    align-items: center;
    

    .header-route {
        display: flex;
        flex-direction: row;
        align-items: center;
        .header-path {
            font-size: 1.7rem;
            margin-left: 1.3rem;
            font-weight: 600;
        }
    }
    .header-breadcrumbs {
        display: flex;
        flex-direction: row;
        align-items: center;
        .header-breadcrumbs-main-route,
        .header-breadcrumbs-secondary-route {
            font-weight: 700;
        }
        .breadcrumbs-navigation-arrow {
            font-size: 1rem;
        }
    }
`

export function Header({ method, api, path }: { method: string, api: string, path: string }) {
    const category = 'history'

    return (
        <StyledGrid container spacing={2}>
            <Grid item xs={12} className='header-route'>
                <Typography variant='h6' color='primary'>{method.toUpperCase()}</Typography>
                <Typography variant='h5' className='header-path' color='secondary'>{path.replace('{category}', category)}</Typography>
            </Grid>
            <Grid item xs={12} className='header-breadcrumbs'>
                <Typography variant='subtitle1' className='header-breadcrumbs-main-route' color='secondary'>All APIs</Typography>
                <KeyboardArrowRightIcon className='breadcrumbs-navigation-arrow'/>
                <Typography variant='subtitle1' className='header-breadcrumbs-secondary-route' color='secondary'>{api}</Typography>
                <KeyboardArrowRightIcon className='breadcrumbs-navigation-arrow'/>
                <Typography variant='subtitle1' color='secondary'>{path.replace('{category}', category)}</Typography>
            </Grid>
        </StyledGrid>
    );
}
