# Learn React & Redux with me

In this folder, I will be adding all the code and readings I've came across while learning these tools. 
Please feel free to add or comment 😊

# Comments 

To put comments inside JSX, you use the syntax {/* */} to wrap around the comment text.

# Rendering 

ReactDOM offers a simple method to render React elements to the DOM which looks like this: ReactDOM.render(componentToRender, targetNode), where the first argument is the React element or component that you want to render, and the second argument is the DOM node that you want to render the component to.

# Components

There are two ways to create a React component. The first way is to use a JavaScript function. Defining a component in this way creates a stateless functional component. think of a stateless component as one that can receive data and render it, but does not manage or track changes to that data.

A stateless functional component is any function you write which accepts props and returns JSX. 
A stateless component, on the other hand, is a class that extends React.Component, but does not use internal state (covered in the next challenge). 
Finally, a stateful component is a class component that does maintain its own internal state. You may see stateful components referred to simply as components or React components.

# Props

 In React, you can pass props, or properties, to child components. Say you have an App component which renders
 a child component called Welcome which is a stateless functional component.
