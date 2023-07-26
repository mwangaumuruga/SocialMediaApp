import './App.css';
import { useState } from 'react'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Rightbar from './components/Rightbar/Rightbar'
import Userprofile from './Pages/Userprofile/Userprofile';
import Chat from './components/Chat/chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
const queryClient = new QueryClient();
function App() {
  const user = useSelector((state) => state?.user?.user?.data.username)
  // const user = true;
  const Layout = () => {
    return (
      // <QueryClientProvider client={queryClient}>
      <div className='theme-dark'>
        <Navbar />
        <div className='bars'>
          <Sidebar />
          <div className='mainCt'>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
      // </QueryClientProvider>
    )
  }

  const PrtRoute = ({ children }) => {
    if (!user) {
      return <Navigate to='/login' />
    }
    return children
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrtRoute>
          <Layout />
        </PrtRoute>
      ),
      children: [{
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Userprofile />
      },
      ]
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chat",
      element: <Chat />
    }
  ]);


  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
