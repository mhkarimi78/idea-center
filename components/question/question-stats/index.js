import React from 'react'

import styles from './question-stats.module.css'

const QuestionStats = ({ voteCount, answerCount, view }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{view}</span>
        <p>likes</p>
      </div>
      {/* <div className={styles.answer}>
        <span>{answerCount}</span>
        <p>answers</p>
      </div> */}
      {/* <p className={styles.view}>{view} likes</p> */}
    </div>
  )
}

export default QuestionStats
