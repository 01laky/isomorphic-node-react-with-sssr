import React, { PropTypes } from 'react';
// import {connect} from 'react-redux';
import Modal from 'react-awesome-modal';
import BaseComponent from '../../../components/BaseComponent';
import TodoForm from './TodoForm';

export default class Todos extends BaseComponent {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const {props: {todos, onOpen}} = this;
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <div className="row">
            <h3 className="col-md-offset-1 col-md-3">
              TODO ID
            </h3>
            <h3 className="col-md-4">
              TODO TITLE
            </h3>
            <h3 className="col-md-4">
              TODO CONTENT
            </h3>
          </div>
          <hr />
          {(todos && todos.length > 0) && todos.map(todo => (
            <div onClick={onOpen(todo.id)} key={`todo-element-${todo.id}`} className="row">
              <h3 className="col-md-offset-1 col-md-3">
                {todo.id}&
              </h3>
              <h3 className="col-md-1">
                |
              </h3>
              <h3 className="col-md-3">
                {todo.todoTitle}
              </h3>
              <h3 className="col-md-1">
                |
              </h3>
              <h3 className="col-md-3">
                {todo.todoContent}
              </h3>
            </div>
          )) || (
            <div className="row">
              <h3 className="col-md-offset-4 col-md-4">
                WITHOUT TODOS
              </h3>
            </div>
          )}
          <hr />
      </div>
    </div>
    );
  }
}
