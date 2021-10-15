import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ArticleBox } from "../../components/article/ArticleBox";
import { Layout } from "../../components/layout/Layout";
import axiosInstance from "../../helpers/axios/axiosInstance";
import { Article } from "../../interfaces/Article";

interface ArticleProps {
  article: Article;
}

const ViewArticle: NextPage<ArticleProps> = ({ article }) => {
  console.log(article);
  return (
    <Layout>
      <ArticleBox article={article} />
    </Layout>
  );
};

// const fetcher = (url: string) =>
//   axiosInstance()
//     .get(url)
//     .then((res) => res.data);
// function Profile() {
//   const { data, error } = useSWR('/api/user', fetcher)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const articles = await axiosInstance()
    .get(`/v1/article/`)
    .then((res) => res.data);

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article: Article) => ({
    params: { id: article.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await axiosInstance()
    .get(`/v1/article/${params.id}`)
    .then((res) => res.data);

  return {
    props: {
      article: data,
    },
  };
};

export default ViewArticle;
