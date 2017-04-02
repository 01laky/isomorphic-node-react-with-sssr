export default dispatch => ({
  createTodo: todoData =>
    dispatch({ type: 'CREATE_TODO', meta: { data: todoData } }),
  updateTodo: (todoData, todoId) =>
    dispatch({ type: 'UPDATE_TODO', meta: { data: todoData, id: todoId } }),
  openTodoForm: todoId =>
    dispatch({ type: 'OPEN_TODO_FORM', meta: { id: todoId } }),
  closeTodoForm: () => dispatch({ type: 'CLOSE_TODO_FORM' })
});

const localState = state => state.demo;

export function injectState(state) {
  const { todoList, loading, openAction, openId } = localState(state);
  return {
    todos: todoList,
    loading,
    openAction,
    openId
  };
}
