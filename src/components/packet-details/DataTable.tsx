import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import { Divider, Grid, Typography } from "@mui/material";
import { secondaryColor } from '../../config/theme';
import { Container } from '@mui/system';
import styled from "styled-components";
import React from "react";

const StyledGrid = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    .data-table {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 5px;
        margin: 3rem auto auto auto;
        padding: 0.3rem 0;
        background: white;
        width: 100rem;

        display: flex;
        flex-direction: row;
        align-items: center;

        .columns {
            margin-left: 5rem;
            .column-header {
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }
`

export function DataTable({ data, onDataChange, type }: { data: any[], onDataChange: Function, type: string }) {
    const onSectionChange = (sectionName: string, sectionValue: any[]) => {
        onDataChange({ ...data, [sectionName]: sectionValue });
    }

    return (
        <StyledGrid maxWidth={false}>
            <Grid container className='data-table'>
                <Grid className='columns' container item xs={12}>
                    <Grid item xs={3}>
                        <Typography color='primary' className='column-header'>Name</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography color='primary' className='column-header'>PII</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='primary' className='column-header'>Mask</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography color='primary' className='column-header'>Type</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                {Object.entries(data).map(([name, value]) => {
                    return (
                        <DataSection key={name} sectionName={name} sectionValue={value} onSectionChange={onSectionChange} isOpen={value.length > 0} />
                    )
                })}
            </Grid>
        </StyledGrid>
    );
}


const StyledSection = styled(Grid)`
    .section-item {
        margin: 1rem;
        display: flex;
        align-items: center;
        .section-btn-toggle-view {
            background: #eeeeee;
            border-radius: 100%;
            font-size: 1rem;
            cursor: pointer;
        }
        .section-btn-title {
            font-weight: 600;
            font-size: 0.9rem;
            margin-left: 0.5rem;
        }
    }

    
    .data-row {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 5px;
        background: white;
        padding: 1rem 0;
        margin: 0 1rem;
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        .row-title {
            margin-left: 4rem;
        }
        
        .row-btn {
            margin-left: 2.8rem;
            min-width: 90px;
            background: white;
        }
        .btn-text {
                font-size: 0.7rem;
                font-weight: 600;
                cursor: pointer;
        }

        .pii {
            border: 1px solid #12296d;
            .btn-text {
                color: #12296d;
            }
        }

        .pii-filled {
            background:#12296d;
            border: unset;
            .btn-text {
                color: white;
            }
        }

        .masked {
            border: 1px solid ${secondaryColor};
        }
        
        .masked-filled {
            background:${secondaryColor};
            border: unset;
            .btn-text {
                color: white;
            }
        }

        .row-type {
            margin-left: 2rem;
            min-width: 90px;
            background: #cee5ec;
            color: #57a6c0;
            border: unset;
        }


    }
`


const titles: { [key: string]: string } = {
    urlParams: 'URL Parameters',
    headers: 'Headers',
    body: 'Body',
    queryParams: 'Query Parameters',
}


export function DataSection({ sectionName, sectionValue, onSectionChange, isOpen }: { sectionName: string, sectionValue: any[], onSectionChange: Function, isOpen: boolean }) {
    const [open, setOpen] = React.useState(isOpen)

    const onPIIChange = (index: number, value: boolean) => {
        sectionValue[index].pii = value;
        onSectionChange(sectionName, sectionValue);
    }

    const onMaskedChange = (index: number, value: boolean) => {
        sectionValue[index].masked = value;
        onSectionChange(sectionName, sectionValue);
    }

    return (
        <StyledSection container item xs={12}>
            <Grid className='section-item' item xs={12}>
                {open ? <ArrowDropDownSharpIcon color='secondary' className='section-btn-toggle-view' onClick={() => setOpen(false)} /> :
                    <ArrowRightSharpIcon color='secondary' className='section-btn-toggle-view' onClick={() => setOpen(true)} />}
                <Typography className='section-btn-title'>{titles[sectionName]}</Typography>
            </Grid>
            {open && sectionValue.map((data: { name: string, pii: string, masked: string, type: string }, index: number) => (
                <Grid key={data.name} container className='data-row' item xs={12}>
                    <Grid item xs={3}>
                        <Typography className='row-title'>{data.name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <button onClick={() => onPIIChange(index, !data.pii)} className={`row-btn pii${data.pii ? '-filled' : ''}`}>
                            <Typography className='btn-text'>PII</Typography>
                        </button>
                    </Grid>
                    <Grid item xs={4}>
                        <button onClick={() => onMaskedChange(index, !data.masked)} className={`row-btn masked${data.masked ? '-filled' : ''}`}>
                            <Typography className='btn-text' color='secondary'>MASKED</Typography>
                        </button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className={`row-type`}>
                            <Typography className='btn-text'>{data.type.toUpperCase()}</Typography>
                        </button>
                    </Grid>
                </Grid>
            ))}
        </StyledSection>
    )
}