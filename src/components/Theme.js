import { createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#a40000'
        },
        secondary: {
            main: '#ffffff'
        },
        text: {
            primary: '#ffffff'
        },
        background: {
            button: '#ffffff',
            paper: '#a40000'
        }
    },
    typography: {
        allVariants: {
            color: 'white'
        }
    },
    button: {
        allVariants: {
            backgroundColor: 'white'
        }
    }
})

export { theme }