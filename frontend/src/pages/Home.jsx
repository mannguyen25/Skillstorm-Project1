import { Box, Typography, Slide } from "@mui/material";
import { useTheme } from "@emotion/react";
export const Home = () => {
    const theme = useTheme();
    return (
        <Slide mountOnEnter unmountOnExit in={true} direction='up'
        
        style={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}
        >
            <Box
            sx={{
                minWidth: 500,
                mt: 40,
                mx: 20,
                textAlign: "left",
                border: `2px solid ${theme.palette.mode === 'dark'? '#fff': '#000'}`,
                borderRadius: '3%',
                padding: 10,
                boxShadow: `-4px 6px 0px 2px ${theme.palette.mode === 'dark'? '#fff': '#000'}`,   
            }}
            >
                <Typography variant="h2">
                    Welcome to the Inventory Management System.
                </Typography>        
            </Box>
        </Slide>
    )
}