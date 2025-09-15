import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const HomeCollection: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Home Collection Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Home collection management features will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomeCollection;
