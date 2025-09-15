import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const PackageLookup: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Package Lookup
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Package lookup features will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PackageLookup;
