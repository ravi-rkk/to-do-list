import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateTodo() {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = `http://localhost:8080/api/v1/tasks/${id}`;
 // api

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setTitle(response.data.task_name);// match backend field
      })
      .catch((error) => {
        console.error('Error fetching todo', error);
      });
  }, [API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(API_URL, { task_name:title,is_done:false })
      .then(() => {
        alert('Todo updated successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating todo', error);
      });
  };

  return (
    <div className="container mt-4">
      <h3>Update Todo</h3>
      <form onSubmit={handleSubmit}>
      <div className=" card mb-3" style={{backgroundColor:"#d0b49f"}}>
          <label htmlFor="title" className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
}