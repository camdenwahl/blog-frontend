import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Navigation from './Navigation.jsx'
import Blog from './Blog.jsx'
import Landing from './Landing.jsx'


const router = createBrowserRouter([
  
  {
    path: "/",
    element: 
    <>
    <Navigation/>
    <Landing/>
    </>
  },
  {
    path: "/blogs",
    element: 
    <>
    <Navigation />
    <Home />
    </>
  },
  {
    path: "/blogs/:name",
    element: 
    <>
    <Navigation />
    <Blog />
    </>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router}/>
)
