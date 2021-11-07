import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Takes in a search(string: query) function in props
export default function Search(props) {
  const [query, setQuery] = React.useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Box m="auto">
        <Paper style={{ minWidth: "200px", width: "50vw", padding:"13px" }}>
          <div style={{ display: "flex", width: "100%" }}>
            {/* <img style={{ flex: 1 }} src="/moon.jpg" width="20%" /> */}
          </div>
          <Typography variant="h6">Find research paper:</Typography>
          <TextField
            multiline
            placeholder="Enter article text..."
            fullWidth
            onChange={(event) => {
              setQuery(encodeURIComponent(event.target.value));
            }}
          />
          <Link to={"/search/" + query}>
            <Button
              variant="contained"
              disabled={query.length == 0}
              fullWidth
              style={{ marginTop: "15px" }}
            >
              Search!
            </Button>
          </Link>
        </Paper>
      </Box>
    </div>
  );
}
