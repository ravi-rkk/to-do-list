import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

export default function Todo() {
  const [lists, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/tasks`) //  API endpoint
      .then(response => {
        console.log("fetch tasks:", response.data);
        setList(response.data);
      })
      .catch(error => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/tasks/${id}`)
      .then(() => {
        setList((prevList) => prevList.filter((item) => item.id !== id)); // Update local state
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  const handleCreateTask = () => {
    navigate("/create");
  };

  return (
    <div className="todo-wrapper">
    <div className="container mt-4">
    <div className="container mt-4" > 
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>To-Do List</h3>
        <button className="btn btn-primary" onClick={handleCreateTask}>
          + Create Task
        </button>
      </div>

      {lists.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        lists.map((item) => (
          <div className="card mb-3" key={item.id} style={{backgroundColor:"#d0b49f"}}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">{item.task_name}</h5>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleUpdate(item.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
    </div>
  );
}
