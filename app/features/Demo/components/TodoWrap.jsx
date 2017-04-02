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
    todo: PropTypes.object,
  }

  handleOnCreate = data => {
    const {props: {create, closeModal}} = this;
    create(data);
    return closeModal();
  }

  handleOnUpdate = data => {
    const {props: {todo: {id}, update, closeModal}} = this;
    update(data, id);
    return closeModal();
  }

  render() {
    const {props: {todo}} = this;
    const initialValues = todo ? {...todo} : {};
    return (
      <Modal
        visible
        effect="fadeInUp"
        width="450"
        height="500"
        onClickAway={() => this.props.closeModal()}
      >
        <div className="row">
          <h2 className="col-md-offset-1 col-md-10">
            {todo ? 'Update todo' : 'Create todo'}
          </h2>
        </div>
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <TodoForm
              onSubmit={todo ? this.handleOnUpdate : this.handleOnCreate}
              initialValues={initialValues}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
