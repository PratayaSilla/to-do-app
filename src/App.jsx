import { useState, useEffect } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import FocusTimer from './components/FocusTimer.jsx'; 

function App() {
  <FocusTimer/>
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false); 
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);

    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditId(null);
    setEditText('');
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const updated = { ...task, completed: !task.completed };
        if (updated.completed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
  
        return updated;
      }
      return task;
    });
  
    setTasks(updatedTasks);
  };
  

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      {/* 🌙 Dark mode toggle stays outside and on top */}
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="mode-button">
          {darkMode ? (
            <i className="fas fa-moon" style={{ color: '#E0F11F' }}></i>
          ) : (
            <i className="fas fa-sun" style={{ color: '#FFD700' }}></i>
          )}
        </button>
      </div>
  
      {/* 🎯 Wrap heading + card inside app-wrapper */}
      <div className="app-wrapper">
        <h1 className="app-title">Welcome to TaskTide</h1>

        <div className="app-container">
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTask();
              }}
            />
            <button onClick={handleAddTask}>Add</button>
          </div>
  
          <ul className="task-list">
            {tasks.map((item) => (
              <li key={item.id} className="task-item">
                {editId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button className="save-btn" onClick={() => handleSaveEdit(item.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className={item.completed ? 'completed-task' : ''}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleComplete(item.id)}
                        style={{ marginRight: '10px' }}
                      />
                      {item.text}
                    </span>
  
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEditTask(item.id, item.text)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTask(item.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
<FocusTimer />
      <h3>Complete a task to see some magic happen !</h3>
<footer className="footer">
  Made with ❤️ by Prataya
</footer>
    </div>
  );
}

export default App;  
