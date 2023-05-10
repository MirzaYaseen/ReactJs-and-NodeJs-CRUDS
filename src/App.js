import Books from './Books';
import React from 'react';
import {
  Typography,
} from "@mui/material";
const App = () => {
  return (
    <div >
      <Typography style={{ marginTop: 30, textAlign: "center", color:'#19A7CE'}} variant="h4">Welcome to the BxTracks Library</Typography>
      <Books />
    </div>
  );
};
export default App;
