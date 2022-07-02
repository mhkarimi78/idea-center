import React from 'react'

import TopPageTitle from '../components/page-title'

export default {
  title: 'Page Title'
}

export const PageTitle = () => (
  <TopPageTitle title="Share Ideas">
    lorem ipsum dolor sit amet, consectetur adip Lorem ipsum, dolor sit amet
    consectetur adipisicing elit. Debitis odit dolorum cum ipsa blanditiis
    deserunt nesciunt eaque veritatis corporis. Commodi repellat non inventore
    sapiente voluptatum tempora omnis magni! Dolores, delectus?
  </TopPageTitle>
)

export const WithButton = () => (
  <TopPageTitle title="Share Ideas" button>
    lorem ipsum dolor sit amet, consectetur adip Lorem ipsum, dolor sit amet
  </TopPageTitle>
)

export const NoBorder = () => (
  <TopPageTitle title="Share Ideas" borderBottom={false}>
    lorem ipsum dolor sit amet, consectetur adip Lorem ipsum, dolor sit amet
    consectetur adipisicing elit. Debitis odit dolorum cum ipsa blanditiis
    deserunt nesciunt eaque veritatis corporis. Commodi repellat non inventore
    sapiente voluptatum tempora omnis magni! Dolores, delectus?
  </TopPageTitle>
)
