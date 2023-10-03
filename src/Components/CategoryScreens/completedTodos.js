import React, { useEffect, useState } from 'react';
import TaskBar from './TaskBar';
import { API_PATH } from '../../Api/Api';
import './completedTodos.css'; // Import your CSS file for styling
import { fetchWithAuthorization } from '../../Auth/jwtAuth';

const CompletedTodos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuthorization(
          `${API_PATH}/categoryTodos/InActive/${userId}`,
          'GET',
          token
        );
  
        if (!response) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response;
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userId, token]);
  

  return (
    <div className="TodoListTable">
      <div className="screen-heading">Completed List</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.length > 0 ? (
          data.map((item) => (
            <TaskBar
              key={item.id}
              DateTime={item.completedByTime}
              Headline={item.todoHeadline}
              rowId={item.id}
              isActive={item.isActive}
              description={item.todoDescription}
            />
          ))
        ) : (
          <p>No TodoList Available</p>
        )
      )}
    </div>
  );
};

export default CompletedTodos;
