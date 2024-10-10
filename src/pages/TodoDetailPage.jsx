import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailTodo } from "../states/todos/action";
import TodoDetail from "../components/TodoDetail";
function TodoDetailPage() {
  const { id } = useParams();
  const { detailTodo = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(asyncDetailTodo(id));
    }
  }, [id, dispatch]);
  return (
    <section>
      <div className="container pt-1">
        {detailTodo != null ? <TodoDetail todo={detailTodo} /> : null}
      </div>
    </section>
  );
}

export default TodoDetailPage;
