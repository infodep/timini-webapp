import { Grid } from "@mui/material";
import { Article } from "../../interfaces/Article";

interface Props {
  article: Article;
}

export const ArticleBox = ({ article }: Props): JSX.Element => {
  return (
    <Grid className="article" key={article.id}>
      <h1>{article.title}</h1>
      <p>
        {article.text}
        created by: {article.creator_id}
      </p>
    </Grid>
  );
};
