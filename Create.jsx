import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateTodo() {
  const [title, setTitle] = useState('');
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const API_URL = 'http://localhost:8080/api/v1/tasks'; // api

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API_URL, {  

        task_name:title,
        is_done:isDone
     })
      .then(() => {
        alert('Task created successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating task', error);
      });
  };

  return (
    <div className="container mt-4" >
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className=" card mb-3" style={{backgroundColor:"#d0b49f"}}>
          <label htmlFor="title" className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}