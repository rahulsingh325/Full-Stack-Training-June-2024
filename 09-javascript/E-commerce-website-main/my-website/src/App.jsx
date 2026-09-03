// import required routers
import { RouterProvider } from 'react-router-dom'
import { ProtectedRouter } from './routes/ProtectedRouter'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

// import require store reducers and provider
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={ProtectedRouter} />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Provider>
  )
}

export default App
