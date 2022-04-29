// Basic template for react w/ html

import React from 'react'
import ReactDOM from 'react-dom'

function MyFunc() {
  return (
    <div>
      <h1>Title</h1>
      <p>This is a paragraph</p>
      <ul>
        <li>List item</li>
        <li>second item</li>
        <li>last item</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<MyFunc />, document.getElementById('root'))
