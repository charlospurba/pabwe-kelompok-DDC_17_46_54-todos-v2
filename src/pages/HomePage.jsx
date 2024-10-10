import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetTodos,
  asyncDeleteTodo,
  deleteTodoActionCreator,
} from "../states/todos/action";
function HomePage() {
  const { todos = [], isDeleteTodo = false } = useSelector((states) => states);
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || "";
  const dispatch = useDispatch();
  useEffect(() => {
    if (isDeleteTodo) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteTodoActionCreator(false));
    }
    dispatch(asyncGetTodos(is_finished));
  }, [dispatch, isDeleteTodo, is_finished]);
  const onDeleteTodo = (id) => {
    dispatch(asyncDeleteTodo(id));
  };
  return (
    <section>
      <div className="container pt-1">
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo}></TodoList>
      </div>
    </section>
  );
}
export default HomePage;
