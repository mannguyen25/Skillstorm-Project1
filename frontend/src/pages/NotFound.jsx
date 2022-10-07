import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
export const NotFound = () => {
    const theme = useTheme();
    return (
        <Box
        sx={{
            margin: 0,
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: "center"
        }}
        >
            <Typography variant="h2">
                Page Not Found
            </Typography>
        </Box>
    )
}