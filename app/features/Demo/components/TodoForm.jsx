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
    handleSubmit: PropTypes.func.isRequired,
    todo: PropTypes.object,
  }

  render() {
    const { props: { handleSubmit, todo } } = this;
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
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="form-group">
              <button className="btn btn-success" type="submit">
                {todo ? 'Update todo' : 'Create todo'}
              </button>
            </div>
          </div>
        </div>
        <hr />
      </form>
    );
  }
}
