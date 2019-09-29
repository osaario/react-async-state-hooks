import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { useAsyncConstant } from "./hooks/useConstant"

function App() {
  const { data, progress } = useAsyncConstant(() => {
    return fetch("https://jsonplaceholder.typicode.com/posts/1").then(
      response => response.json()
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data ? JSON.stringify(data) : "Loading"}
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
