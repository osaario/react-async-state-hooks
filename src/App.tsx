import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { useAsyncConstant, useAsyncVariable } from "./hooks/useConstant"
import { Post } from "./types/Post"

function App() {
  const [post, setPost] = useAsyncVariable(() => {
    return fetch("https://jsonplaceholder.typicode.com/posts/1").then(
      response => response.json()
    ) as Promise<Post>
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {post.data ? JSON.stringify(post.data) : "Loading"}
        <br></br>
        <button
          onClick={() => {
            setPost(
              () =>
                fetch("https://jsonplaceholder.typicode.com/posts/2").then(
                  response => response.json()
                ) as Promise<Post>
            )
          }}
        >
          Btn
        </button>
        {post.progress}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
