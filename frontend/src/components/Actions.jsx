import { Box, Fab} from "@mui/material";
import { useState } from "react";
import Check from '@mui/icons-material/Check';
import Save from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useEffect } from "react";


export const Actions = ({ params, rowId, setRowId, children }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        setTimeout( async () => {
            let result;
            if (children === 'warehouses'){
              const {capacity, inventory, _id} = params.row
              result = await axios.put(`http://localhost:9000/${children}/${_id}`, {capacity, inventory})
            }
            else if (children === 'items') {
              const { _id, name, UPC, component, cost, brand, imgUrl} = params.row
              result = await axios.put(`http://localhost:9000/${children}/${_id}`, {_id, name, UPC, component, cost, brand, imgUrl})           
            }
            if (result) {
                setSuccess(true);
                setRowId(null);
            }
            setLoading(false)
        }, 1500);
    };
    useEffect(() => {
        if (rowId === params.id && success) setSuccess(false);
      }, [rowId]);

    return (
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: theme.palette.success.main,
              '&:hover': { bgcolor: theme.palette.success.dark },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: theme.palette.success.main,
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    );
  };
  