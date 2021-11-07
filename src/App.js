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
import ArticleView from "./Components/ArticleView";

function App() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ display: "flex", flexDirection: "column" }}
      height="100vh"
    >
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, color:"white" }}>
              Kerbal Search Program
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route path="/paper/:paperId" element={<ArticleView />} />
        <Route path="/search/:encodedQuery" element={<Results />} />
      </Routes>
    </Box>
  );
}

export default App;
