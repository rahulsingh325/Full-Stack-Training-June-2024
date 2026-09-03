import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { Router } from "./routes/Router"
import { store } from "./store/store"

function App() {

  return (
    <Provider store={store}>
        <RouterProvider router={Router} />
    </Provider>
  )
}

export default App
