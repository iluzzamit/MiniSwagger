import { createTheme } from '@mui/material/styles';

export const primaryColor ='#ba68c8'
export const secondaryColor ='#6a1b9a'

export const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor
        },
        secondary: {
            main: secondaryColor
        }
    }
});