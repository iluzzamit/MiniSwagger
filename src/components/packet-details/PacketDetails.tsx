import { DataTable } from "./DataTable";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Types } from "../app/App";
import { Search } from "./Search";
import React from 'react';

const StyledGrid = styled(Grid)`
    margin-bottom: 2rem;
`

export function PacketDetails({ data, type, setData }: { data: any, type: Types, setData: Function }) {
    const [search, setSearch] = React.useState({ text: '', pii: false })

    const onDataChange = (changedData: any) => {
        setData({ ...data, ...changedData })
    }

    // filtering data
    let filteredData: any = {}
    if(search.text !== '' || search.pii) {
        Object.entries(data[type]).forEach(([key, value]: [key: string, value: any]) => {
            if(search.pii) {
                value = value.filter((item: any) => item.pii)
            }
            if(search.text !== '') {
                value = value.filter((item: any) => item.name.includes(search.text.toLowerCase()) || item.type.includes(search.text.toLowerCase()))
            }
            filteredData[key] = value
        })
    } else {
        filteredData = data[type]
    }
    
    return (
        <StyledGrid container>
            <Grid item xs={12}>
                <Search search={search} setSearch={setSearch} />
                <DataTable data={filteredData} type={type} onDataChange={onDataChange} />
            </Grid>
        </StyledGrid>
    );
}
