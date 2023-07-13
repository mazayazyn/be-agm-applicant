import { createTheme } from "@mui/material";

export default createTheme({
    typography: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeightLight: 400,
        h1: {
          fontFamily: 'Open Sans',
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: '0em',
        },
        h2: {
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '0em',
          fontFamily: 'Open Sans',
        },
        h3: {
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '0em',
        },
        body1: {
          fontFamily: 'Open Sans',
          letterSpacing: '0em',
          lineHeight: 1.5,
          fontSize: 16,
        },
        body2: {
          fontFamily: 'Open Sans',
          letterSpacing: '0em',
          lineHeight: 1.5,
          fontSize: 16,
        },
        button: {
          fontFamily: 'Open Sans',
          fontWeight: 400,
          letterSpacing: '0em',
          lineHeight: 1.5,
        },
    },

    palette: {
        type: 'light',
        primary: {
            main: '#233C67',
            light: '#454ade',
            dark: '#152347',
        },

        secondary: {
            main: '#141414',
            light: '#DDD3C5',
            dark: '#353535',
            contrastText: '#fffef2',
        },

        background: {
            default: '#ffffff',
        },

        error: {
            main: '#e9322e',
        },

        success: {
            main: '#0B6732',
        },

        warning: {
            main: '#eec643',
        },

        divider: 'rgba(101,104,107,0.5)',

        text: {
            primary: '#141414',
        },
    },

    overrides: {
        MuiDialogActions: {
            root: {
                padding: "8px 24px 16px 24px",
            },
        },
        MuiButton: {
            root: {
                fontWeight: 600,
                textTransform: "none",
                color: "#233C67",
                padding: "6px 24px",
            },
            outlined: {
                borderRadius: "35px",
                borderColor: '#233C67',
                padding: "6px 20px",
            },
        },
        MuiSelect: {
            filled: {
                padding: "15px 0 15px 15px",
            },
        },
        MuiFilledInput: {
            input: {
                height: "49px",
                padding: "0px 0 0 10px",
            },
        },
    },

    shape: {
        borderRadius: 2,
    },
});
