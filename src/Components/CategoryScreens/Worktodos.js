import React, { useEffect, useState } from 'react';
import TaskBar from './TaskBar';
import { API_PATH } from '../../Api/Api';
import './DailyTodos.css';
import jwtDecode from 'jwt-decode';
import { fetchWithAuthorization } from '../../Auth/jwtAuth';

const WorkTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const categoryId = 3;

  const token = localStorage.getItem('token');

  
  const logoutUser = () => {
    localStorage.clear();
    window.location.href = '/login';
};

  const isTokenExpired = (token) => {
    if (!token) return true; // Token is considered expired if not present
    try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp) {
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        }
        return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

useEffect(() => {
  const fetchCategoryTodos = async () => {
    try {
      if (!token || isTokenExpired(token)) {
        logoutUser();
        throw new Error('Token expired');
      }

      const response = await fetchWithAuthorization(
        `${API_PATH}/categoryTodos/?userId=${userId}&categoryId=${categoryId}`,
        'GET',
        token
      );

      if (!response) {
        throw new Error('Failed to fetch data');
      }

      const data = await response;
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchCategoryTodos();
}, [categoryId, userId, token]);


  return (
    <div className='TodoListTable'>
      <div className="screen-heading">Work List</div>
      {loading ? (
        <p>Loading...</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <TaskBar
            key={todo.id}
            DateTime={todo.completedByTime}
            Headline={todo.todoHeadline}
            rowId={todo.id}
            isActive={todo.isActive}
            description={todo.todoDescription}
            CategoryId={categoryId}
          />
        ))
      ) : (
        <p>No TodoList Available</p>
      )}
    </div>
  );
};

export default WorkTodos;
