import React, { useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import Header from "../components/Header";

// Initial tasks state
const initialTasks = {
  todo: [
   
  ],
  inProgress: [
   
  ],
  peerReview: [
  ],
  done: [
    
  ],
};

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", column: "todo" });
  const [searchText, setSearchText] = useState("");

  const moveTask = (taskId, fromColumn, toColumn) => {
    const newTasks = { ...tasks };
    const taskToMove = newTasks[fromColumn].find((task) => task.id === taskId);
    newTasks[fromColumn] = newTasks[fromColumn].filter((task) => task.id !== taskId);
    newTasks[toColumn].push(taskToMove);
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    const taskId = `task-${Date.now()}`;
    const newTaskWithId = { ...newTask, id: taskId };

    const updatedTasks = { ...tasks };
    updatedTasks[newTask.column].push(newTaskWithId);
    setTasks(updatedTasks);

    setNewTask({ title: "", description: "", column: "todo" });
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = (tasks) => {
    if (!searchText) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.boardContainer}>
        <Header />

        {/* Search Input Below Header */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tasks..."
            style={styles.searchInput}
          />
        </div>

        {/* Kanban Board */}
        <div style={styles.board}>
          {Object.keys(tasks).map((columnKey) => (
            <Column
              key={columnKey}
              columnKey={columnKey}
              tasks={filteredTasks(tasks[columnKey])}
              moveTask={moveTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* Floating button to add tasks */}
      <button onClick={() => setIsModalOpen(true)} style={styles.floatingButton}>
        +
      </button>

      {/* Modal for adding a new task */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add a New Task</h3>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task Title"
              style={styles.input}
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task Description"
              style={styles.input}
            />
            <select
              value={newTask.column}
              onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
              style={styles.input}
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="peerReview">Peer Review</option>
              <option value="done">Done</option>
            </select>
            <div style={styles.modalButtonContainer}>
              <button onClick={handleAddTask} style={styles.modalButton}>
                Add Task
              </button>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Column = ({ columnKey, tasks, moveTask, handleDeleteTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      moveTask(item.id, item.column, columnKey);
    },
  });

  return (
    <div ref={drop} style={styles.column}>
      <h2 style={styles.columnHeader}>
        {columnKey.replace(/([A-Z])/g, " $1").trim()}
      </h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          column={columnKey}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

const Task = ({ task, column, handleDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={drag}
      style={{
        ...styles.card,
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={styles.cardTitle}>{task.title}</h3>
      <p style={styles.cardDescription}>{task.description}</p>
      {isHovered && (
        <button
          onClick={() => handleDeleteTask(task.id, column)}
          style={styles.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f4f7f6" },
  boardContainer: { padding: "20px", flex: 1, marginTop: "30px" },
  header: { textAlign: "center", fontSize: "2rem", color: "#333", marginBottom: "20px" },
  board: { display: "flex", justifyContent: "space-between", gap: "20px" },
  column: { flex: 1, padding: "10px", minHeight: "400px", background: "#e8eaf6" },
  columnHeader: { background: "#3f51b5", color: "#fff", textAlign: "center" },
  card: { padding: "10px", background: "#fff", marginBottom: "10px", position: "relative" },
  cardTitle: { fontSize: "1.2rem", margin: "0" },
  cardDescription: { fontSize: "1rem", color: "#555" },

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
  input: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  modalButton: { padding: "10px 20px", background: "#3f51b5", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },

  // Floating button styles
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },

  // Search container styles
  searchContainer: {
    marginTop: "20px",
    textAlign: "center",
    marginBottom: "30px",
  },
  searchInput: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1.2rem",
    width: "50%",
  },

  // Modal button container with Close button on the right
  modalButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  closeButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: "10px 20px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  // Delete button styles
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px 10px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Home;
