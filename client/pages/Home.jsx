import React from 'react'
import { Link } from 'react-router'

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="all-trails">All Trails page</Link>
    <Link to="search">Search page</Link>
  </div>
)

export default Home
