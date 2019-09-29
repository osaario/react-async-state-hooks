import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { useAsyncConstant, useAsyncVariable } from "./hooks/useConstant"
import { Post } from "./types/Post"
import { Progress } from "./types/Async"
import { isError } from "util"

let num = 1
function App() {
  const [post, setPost] = useAsyncVariable(() => {
    return fetch("https://jsonplaceholder.typicde.com/posts/1").then(response =>
      response.json()
    ) as Promise<Post>
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ opacity: post.progress === "progressing" ? 0.5 : 1 }}>
          {post.data ? JSON.stringify(post.data) : "Loading"}
        </div>
        {isError(post.progress) &&
          "Error error" + JSON.stringify(post.progress)}
        <br></br>
        <button
          onClick={() => {
            setPost(
              () =>
                fetch(
                  "https://jsonplaceholder.typicode.com/posts/" + ++num
                ).then(response => response.json()) as Promise<Post>
            )
          }}
        >
          Btn
        </button>
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
