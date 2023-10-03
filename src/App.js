import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import DailyTodos from './Components/CategoryScreens/DailyTodos';
import PriorityTodos from './Components/CategoryScreens/PriorityTodos';
import WorkTodos from './Components/CategoryScreens/Worktodos';
import ProjectTodos from './Components/CategoryScreens/ProjectTodos';
import PersonalTodos from './Components/CategoryScreens/PersonalTodos';
import Loginpage from './Components/loginpage';
import SignupForm from './Components/Signup';
import CompletedTodos from './Components/CategoryScreens/completedTodos';
import CreateTodo from './Components/CreateTodo';
import { ProtectedRoute } from './Components/ProtectedRoute';
import AllTodos from './Components/CategoryScreens/AllTodos';
import Layout from './Components/CategoryScreens/Layout'

// Define a function to create protected route elements
const createProtectedRouteElement = (component) => (
  <Layout>
  <ProtectedRoute>{component}</ProtectedRoute>
  </Layout>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: createProtectedRouteElement(<AllTodos />),
    },
    {
      path: '/PriorityTodos',
      element: createProtectedRouteElement(<PriorityTodos />),
    },
    {
      path: '/DailyTodos',
      element: createProtectedRouteElement(<DailyTodos />),
    },
    {
      path: '/WorkTodos',
      element: createProtectedRouteElement(<WorkTodos />),
    },
    {
      path: '/ProjectTodos',
      element: createProtectedRouteElement(<ProjectTodos />),
    },
    {
      path: '/PersonalTodos',
      element: createProtectedRouteElement(<PersonalTodos />),
    },
    {
      path: '/CompletedTodos',
      element: createProtectedRouteElement(<CompletedTodos />),
    },
    {
      path: '/CreateTodo',
      element: createProtectedRouteElement(<CreateTodo />),
    },
    {
      path: '/login',
      element: <Loginpage />,
    },
    {
      path: '/register',
      element: <SignupForm />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
