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
import { Link } from "react-router-dom";
import { border } from "@mui/system";

export default function ResultsAdvanced(props) {
  //   const queryResults = props.queryResults;
  const { encodedQuery } = useParams();
  const query = decodeURIComponent(encodedQuery);
  const [queryResults, setQueryResults] = useState(null);

  const [searchBoxText, setSearchBoxText] = useState(query);

  const DESCRIPTION_LENGTH = 200;

  useEffect(() => {
    const apiURL =
      "https://us-central1-hackrpi2021.cloudfunctions.net/searchDB?query=";
    var url = new URL("http://localhost:8080/?query=" + query);

    fetch(url)
      .then((result) => {
        return result.text();
      })
      .then((response) => {
        console.log(response);
        setQueryResults(JSON.parse(response));
      });
  }, [query, setQueryResults]);

  console.info(queryResults);

  return (
    <Grid container>
      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Grid container>
          <Paper
            style={{
              padding: "10px",
              backgroundColor: "#FFFD",
              width: "100%",
              marginBottom: "25px",
            }}
          >
            <Grid item xs={12}>
              <div
                style={{ display: "flex", width: "100%", marginTop: "10px" }}
              >
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
                <Link to={"/search/" + searchBoxText}>
                  <Button
                    disabled={searchBoxText.length == 0}
                    variant="contained"
                    style={{
                      borderTopLeftRadius: "0%",
                      borderBottomLeftRadius: "0%",
                      height: "100%",
                    }}
                    onClick={() => {
                      setQueryResults(null);
                    }}
                  >
                    <SearchIcon />
                  </Button>
                </Link>
              </div>
            </Grid>
            {queryResults ? (
              queryResults.map((article, key) => {
                if (article != null) {
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
                      <Paper
                        elevation={0}
                        style={{
                          padding: "6px",
                          border: "1px solid #0002",
                          backgroundColor: "#FFF7",
                        }}
                      >
                        <a href={article.downloadUrl}>
                          <Typography variant="h5">{articleTitle}</Typography>
                        </a>
                        <Typography variant="h7">{articleContent}</Typography>
                      </Paper>
                    </Grid>
                  );
                } else {
                  return (<span></span>);
                }
              })
            ) : (
              <h1>wait</h1>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={0} md={2} />
    </Grid>
  );
}
