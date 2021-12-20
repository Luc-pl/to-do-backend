import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [],
  };

  componentDidMount() {
    this.socket = io('localhost:8000');
    this.socket.on('updateData', data => this.updateTasks(data));
    this.socket.on('removeTasks', id => this.removeTask(id));
    this.socket.on('addTask', task => this.addTask(task));
    this.socket.on('updateTask', task => this.updateTask(task));
  }; 

  render() {
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li>
          </ul>
    
          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;