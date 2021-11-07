import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CORE_API_KEY from "../apikey";

export default function ArticleView() {
  const [articleData, setArticleData] = useState(null);
  const [articleText, setArticleText] = useState("");
  const { paperId } = useParams();
  useEffect(() => {
    var parameters = {
      api_key: CORE_API_KEY,
    };

    var url = new URL("https://api.core.ac.uk/v3/works/" + paperId);
    for (let p in parameters) {
      url.searchParams.append(p, parameters[p]);
    }

    fetch(url)
      .then((result) => {
        return result.text();
      })
      .then((response) => {
        let data = JSON.parse(response);
        console.log(data);
        let text = data.fullText.split("\n");
        console.log(text);
        setArticleData(JSON.parse(response));
        setArticleText(text);
      });
  }, [paperId]);
  return (
    <Grid container>
      <Grid item xs={0} md={2} />
      <Grid item xs={12} md={8}>
        {articleText ? (
          <Paper>
            {articleText.map((data) => (
              <Typography>{data}</Typography>
            ))}
          </Paper>
        ) : (
          <h1>Nothing here yet</h1>
        )}
      </Grid>
      <Grid item xs={0} md={2} />
    </Grid>
  );
}
