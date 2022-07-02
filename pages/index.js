import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { publicFetch } from "../util/fetcher";

import Layout from "../components/layout";
import QuestionWrapper from "../components/question/question-wrapper";
import QuestionStats from "../components/question/question-stats";
import QuestionSummary from "../components/question/question-summary";
import PageTitle from "../components/page-title";
import ButtonGroup from "../components/button-group";
import { Spinner } from "../components/icons";

const HomePage = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState(null);
  const [sortType, setSortType] = useState("Votes");

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get("/offer/all");
      console.log("ddd", data);
      setQuestions(data);
    };

    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`);
      setQuestions(data);
    };

    if (router.query.tag) {
      fetchQuestionByTag();
    } else {
      fetchQuestion();
    }
  }, [router.query.tag]);

  const handleSorting = () => {
    switch (sortType) {
      case "Votes":
        return (a, b) => b.like - a.like;
      case "Top 10":
        return (a, b) => b.views - a.views;
      case "Newest":
        return (a, b) => new Date(b.created) - new Date(a.created);
      default:
        break;
    }
  };

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : "Questions"} - Clone of
          Stackoverflow
        </title>
      </Head>

      <PageTitle
        title={
          router.query.tag ? `Ideas tagged [${router.query.tag}]` : "All Ideas"
        }
        button
        borderBottom={false}
      />

      <ButtonGroup
        borderBottom
        buttons={["Votes", "Top 10", "Newest"]}
        selected={sortType}
        setSelected={setSortType}
      />

      {!questions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {questions
        ?.sort(handleSorting())
        .map(
          ({
            id,
            votes,
            answers,
            like,
            title,
            description,
            categories,
            author,
            created_at,
            status_type,
          }) => (
            <QuestionWrapper key={id}>
              <QuestionStats
                // voteCount={votes.length}
                // answerCount={answers.length}
                view={like}
              />
              <QuestionSummary
                ideaId={id}
                title={title}
                tags={categories}
                author={author}
                createdTime={created_at}
                status_type={status_type}
              >
                {description}
              </QuestionSummary>
            </QuestionWrapper>
          )
        )}
    </Layout>
  );
};

export default HomePage;
