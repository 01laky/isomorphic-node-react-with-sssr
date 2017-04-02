import React, { PropTypes } from 'react';
// import {connect} from 'react-redux';
import Modal from 'react-awesome-modal';
import BaseComponent from '../../../components/BaseComponent';
import TodoForm from './TodoForm';

export default class TodoWrap extends BaseComponent {
  static propTypes = {
    create: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    openId: PropTypes.any,
  }

  handleOnCreate = data => {
    const {props: {create, closeModal}} = this;
    create(data);
    return closeModal();
  }

  handleOnUpdate = data => {
    const {props: {todos, update, closeModal, openId}} = this;
    const todo = todos.find(todo => todo.id === openId)
    update(data, todo.id);
    return closeModal();
  }

  render() {
    const {props: {todos, openId}} = this;
    const todo = openId ? todos.find(todo => todo.id === openId) : null;
    const initialValues = todo ? {...todo} : {};
    return (
      <Modal
        visible
        effect="fadeInUp"
        width="450"
        height="400"
        onClickAway={() => this.props.closeModal()}
      >
        <div className="row">
          <h2 className="col-md-offset-3 col-md-7">
            {todo ? 'Update todo' : 'Create todo'}
          </h2>
        </div>
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <TodoForm
              onSubmit={todo ? this.handleOnUpdate : this.handleOnCreate}
              initialValues={initialValues}
              todo={todo}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
