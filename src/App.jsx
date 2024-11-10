import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/pages/Home/Home"

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
          path: "",
          index: true,
          element:<Home/>
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App