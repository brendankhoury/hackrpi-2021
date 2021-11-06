import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Takes in a search(string: query) function in props
export default function Search(props) {
  const [query, setQuery] = React.useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Box m="auto">
        <div style={{ minWidth: "200px", width: "50vw" }}>
          <Typography variant="h6">Find related articles:</Typography>
          <TextField
            multiline
            placeholder="Enter article text..."
            fullWidth
            onChange={(event) => {
              setQuery(encodeURIComponent(event.target.value));
            }}
          />
          <Link to={"/search/" + query}>
            <Button variant="contained" fullWidth style={{ marginTop: "15px" }}>
              Search!
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
}
