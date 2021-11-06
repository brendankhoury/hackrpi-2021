import {
  Button,
  Card,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router";
import CORE_API_KEY from "../apikey";
import { Link } from "react-router-dom";

export default function Results(props) {
  //   const queryResults = props.queryResults;
  const { encodedQuery } = useParams();
  const query = decodeURIComponent(encodedQuery);
  const [queryResults, setQueryResults] = useState(null);

  const [searchBoxText, setSearchBoxText] = useState(query);

  const DESCRIPTION_LENGTH = 200;

  useEffect(() => {
    console.log("Searching: " + query);
    var parameters = {
      api_key: CORE_API_KEY,
      q: query,
    };
    var url = new URL("https://api.core.ac.uk/v3/search/works/");
    for (let p in parameters) {
      url.searchParams.append(p, parameters[p]);
    }
    console.log(url);
    fetch(url)
      .then((result) => {
        return result.text();
      })
      .then((response) => {
        setQueryResults(JSON.parse(response));
      });
  }, [query, setQueryResults]);

  console.log(query);
  console.log(queryResults);
  return (
    <Grid container>
      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12}>
            <div style={{ display: "flex", width: "100%", marginTop: "10px" }}>
              <TextField
                style={{
                  flexGrow: 1,
                  borderTopRightRadius: "0%",
                  borderBottomRightRadius: "0%",
                }}
                defaultValue={query}
                onChange={(event) => {
                  encodeURIComponent(setSearchBoxText(event.target.value));
                }}
              ></TextField>
              <Link to={"/" + searchBoxText}>
                <Button

                  variant="contained"
                  style={{
                    borderTopLeftRadius: "0%",
                    borderBottomLeftRadius: "0%",
										height:"100%"
                  }}
									onClick={()=>{}}
                >
                  <SearchIcon />
                </Button>
              </Link>
            </div>
          </Grid>
          {queryResults ? (
            queryResults.results.map((article, key) => {
              const articleTitle = article.title
                ? article.title
                : "Title not found";

              if (
                article.abstract &&
                article.abstract.length >= DESCRIPTION_LENGTH
              ) {
                var articleContent =
                  article.abstract.substring(0, DESCRIPTION_LENGTH) + "...";
              } else if (article.abstract) {
                var articleContent = article.abstract;
              } else if (
                article.fullText &&
                article.fullText.length >= DESCRIPTION_LENGTH
              ) {
                var articleContent =
                  article.fullText.substring(0, DESCRIPTION_LENGTH) + "...";
              } else if (article.fullText) {
                var articleContent = article.fullText;
              } else {
                var articleContent = "No description was found :(";
              }
              return (
                <Grid item xs={12} key={key} style={{ marginTop: "10px" }}>
                  <Paper elevation={2} style={{ padding: "3px" }}>
                    <Typography variant="h5">{articleTitle}</Typography>
                    <Typography variant="h7">{articleContent}</Typography>
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <h1>wait</h1>
          )}
        </Grid>
      </Grid>
      <Grid item xs={0} md={2} />
    </Grid>
  );
}
