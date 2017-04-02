import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import BaseComponent from '../../../components/BaseComponent';

const formKey = 'todo-form';

@reduxForm({
  form: formKey,
  fields: ['todoTitle', 'todoContent'],
})
export default class TodoForm extends BaseComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render() {
    const { props: { handleSubmit } } = this;
    return (
      <form onSubmit={handleSubmit}>
        <hr />
        <div className="form-group">
          <label htmlFor="todoTitle">TODO TITLE</label>
          <Field className="form-control" placeholder="Toto title" name="todoTitle" component="input" type="text"/>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="todoContent">TODO CONTENT</label>
          <Field className="form-control" placeholder="Todo content text" name="todoContent" component="textArea" />
        </div>
        <hr />
        <div className="form-group">
          <button className="btn btn-success" type="submit">
            Create todo
          </button>
        </div>
        <hr />
      </form>
    );
  }
}
