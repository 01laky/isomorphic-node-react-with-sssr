import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IndexComponent from '../../components/IndexComponent';
import Preloader from '../../components/Preloader';
import TodoWrap from './components/TodoWrap';
import Todos from './components/Todos';
import actions, { injectState } from './actions';

@connect(injectState, actions)
export default class Demo extends IndexComponent {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
    requireLoad: PropTypes.string,
    todos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    openTodoForm: PropTypes.func.isRequired,
    openAction: PropTypes.string,
    closeTodoForm: PropTypes.func.isRequired,
  };

  handleOpenTodoForm = () => {
    return this.props.openTodoForm();
  };

  handleCloseModal = () => {
    return this.props.closeTodoForm();
  };

  handleOpenUpdateForm = (todoId) => (event) => {
    event && event.preventDefault();
    const {props: {openTodoForm}} = this;
    return openTodoForm(todoId);
  }

  render() {
    const { props: { loading, openAction, todos } } = this;
    console.log("MIAU MIAU PROPS => ", this.props.todos.reverse);
    return (
      <div>
        {!!openAction &&
          <TodoWrap
            create={this.props.createTodo}
            closeModal={this.handleCloseModal}
          />}
        <div className="col-md-12">
          <div className="row">
            <h2 className="col-md-offset-4 col-md-6">
              ASYNC TODO LIST DEMO
            </h2>
          </div>
          <br /><br /><br />
          {((loading || !todos) &&
            <div className="row">
              <div className="col-md-offset-5 col-md-5">
                <Preloader />
              </div>
            </div>) ||
            <Todos onOpen={this.handleOpenUpdateForm} todos={todos} />}
          <br /><br />
          <div className="row">
            <div className="col-md-offset-4 col-md-4">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={this.handleOpenTodoForm}
                className="btn btn-success"
              >
                Add new todo
              </button>
            </div>
            <div className="col-md-2">
              <Link to="/">
                BACK HOMEPAGE
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
