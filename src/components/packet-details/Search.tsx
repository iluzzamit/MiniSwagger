import { Divider, Grid, Typography } from "@mui/material";
import { secondaryColor } from '../../config/theme';
import SearchIcon from '@mui/icons-material/Search';
import React, { ChangeEventHandler } from 'react';
import { Container } from '@mui/system';
import styled from "styled-components";

const StyledGrid = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: center;

    .search-box {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 5px;
        margin: 3rem auto auto auto;
        background: white;
        width: 100rem;

        display: flex;
        flex-direction: row;
        align-items: center;

        .search-input {
            border: 0;
            outline-width: 0;
            flex-grow: 1;
        }

        .search-box-divider {
            margin: 0 2rem;
        }

        .pii-checkbox-text {
            font-size: 0.75rem;
        }

        .apply-btn {
            background: ${secondaryColor};
            padding: 1rem 3rem;
            margin: 0 0 0 2rem;
            cursor: pointer;
            height: 100%;
            border: 0;

            color: white;
            font-weight: 600;
        }

        .search-icon {
            padding: 0 0.7rem;
        }

        .reset-filter {
            position: absolute;
            right: 0;
            margin: 4.5rem 10rem 0 0;
            font-size: 14px;
            cursor: pointer;
        }
    }
`

export function Search({ search, setSearch }: { search: { text: string, pii: boolean }, setSearch: Function }) {
    const [tempSearch, setTempSearch] = React.useState({ ...search })

    const resetFilter = () => {
        const defaultValue = { text: '', pii: false}

        setTempSearch(defaultValue)
        setSearch(defaultValue)
    }

    return (
        <StyledGrid maxWidth={false}>
            <Grid container className='search-box'>
                <SearchIcon className='search-icon' />
                <input
                    placeholder='Search'
                    className='search-input'
                    value={tempSearch.text}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setTempSearch({ ...search, text: e.currentTarget.value })}
                />
                <Divider className='search-box-divider' orientation="vertical" flexItem />
                <input
                    type="checkbox"
                    checked={tempSearch.pii}
                    onClick={() => setTempSearch({ ...search, pii: !search.pii })}
                />
                <Typography className='pii-checkbox-text'>Show only PII</Typography>
                <button onClick={() => setSearch(tempSearch)} className='apply-btn'>Apply</button>
                <Typography color='secondary' className='reset-filter' onClick={resetFilter}>Reset Filter</Typography>
            </Grid>
        </StyledGrid>
    );
}
