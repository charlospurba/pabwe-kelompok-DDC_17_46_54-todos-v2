import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddTodo, addTodoActionCreator } from "../states/todos/action";
import TodoInput from "../components/TodoInput";
import { useNavigate } from "react-router-dom";
function TodoAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddTodo = false } = useSelector((states) => states);
  useEffect(() => {
    if (isAddTodo) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addTodoActionCreator(false));
    }
  }, [isAddTodo, navigate, dispatch]);
  const onAddTodo = ({ title, description }) => {
    dispatch(asyncAddTodo({ title, description }));
  };
  return (
    <section>
      <div className="container pt-1">
        <TodoInput onAddTodo={onAddTodo} />
      </div>
    </section>
  );
}
export default TodoAddPage;
