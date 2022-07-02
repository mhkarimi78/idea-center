import React from 'react';
import Head from 'next/head'

import QuestionAskView from '../../components/question-ask-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/question-ask-view/question-form'

const Share = () => {
  return (
    <div>
      <Head>
        <title>Share your Idea - Idea Center</title>
      </Head>

      <Header />
      <QuestionAskView>
        <QuestionForm />
      </QuestionAskView>
    </div>
  )
}

export default Share
