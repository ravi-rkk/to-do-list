const db = require('../db');

// CREATE TASK
const createTask = async (req, res) => {
  let conn;
  try {
    const { task_name, is_done } = req.body;

    if (!task_name || typeof is_done === 'undefined') {
      return res.status(400).json({ error: 'task_name and is_done are required' });
    }

    conn = await db.getConnection();
    const query = 'INSERT INTO TASK (task_name, is_done) VALUES (?, ?)';
    const [result] = await conn.execute(query, [task_name, is_done]);

    res.status(201).json({ message: 'Task created', id: result.insertId });
  } catch (err) {
    console.error('Failed to create task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  } finally {
    if (conn) conn.release();
  }
};

// GET ALL TASKS
const fetchTasks = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const [rows] = await conn.execute('SELECT * FROM TASK');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  } finally {
    if (conn) conn.release();
  }
};

// GET TASK BY ID
const fetchTaskById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await db.getConnection();
    const [rows] = await conn.execute('SELECT * FROM TASK WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Failed to fetch task:', err);
    res.status(500).json({ error: 'Failed to fetch task' });
  } finally {
    if (conn) conn.release();
  }
};

// UPDATE TASK BY ID
const updateTaskById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { task_name, is_done } = req.body;

    conn = await db.getConnection();
    const query = 'UPDATE TASK SET task_name = ?, is_done = ? WHERE id = ?';
    const [result] = await conn.execute(query, [task_name, is_done, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated' });
  } catch (err) {
    console.error('Failed to update task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  } finally {
    if (conn) conn.release();
  }
};

// DELETE TASK BY ID
const deleteTaskById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await db.getConnection();
    const [result] = await conn.execute('DELETE FROM TASK WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Failed to delete task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  createTask,
  fetchTasks,
  fetchTaskById,
  updateTaskById,
  deleteTaskById
};
