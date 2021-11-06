import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "./Components/Search";
import Results from "./Components/Results";
import CORE_API_KEY from "./apikey";
import { Route, Router, Routes} from "react-router";
import { Link } from "react-router-dom";

function App() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ display: "flex", flexDirection: "column" }}
      height="100vh"
    >
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Paper Search
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route path="/:encodedQuery" element={<Results />} />
      </Routes>
    </Box>
  );
}

export default App;
