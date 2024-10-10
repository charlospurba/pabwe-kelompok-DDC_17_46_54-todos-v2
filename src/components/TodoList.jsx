import PropTypes from "prop-types";
import TodoItem, { todoItemShape } from "./TodoItem";
function TodoList({ todos, onDeleteTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </div>
  );
}
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoItemShape)).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
export default TodoList;
