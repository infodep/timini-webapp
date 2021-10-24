import { NextPage, GetServerSideProps } from "next";
import useSWR from "swr";
import { ArticleBox } from "../../components/article/ArticleBox";
import { Layout } from "../../components/layout/Layout";
import axiosInstance from "../../helpers/axios/axiosInstance";
import { Article } from "../../interfaces/Article";

interface ArticleProps {
  articles: Article[];
}

const Articles: NextPage<ArticleProps> = ({ articles }) => {
  const { data } = useSWR<Article[]>("/v1/article/", { fallbackData: articles });
  return (
    <Layout>
      {data?.map((article, index) => (
        <ArticleBox article={article} key={index} />
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axiosInstance()
    .get("/v1/article/")
    .then((res) => res.data);

  return {
    props: {
      articles: data,
    },
  };
};

export default Articles;
