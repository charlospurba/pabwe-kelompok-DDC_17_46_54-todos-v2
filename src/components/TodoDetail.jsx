import PropTypes from "prop-types";
import { todoItemShape } from "./TodoItem";
import { postedAt } from "../utils/tools";
import { FaClock } from "react-icons/fa6";
function TodoDetail({ todo }) {
  let badgeStatus, badgeLabel;
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            <h5>{todo.title}</h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(todo.created_at)}</span>
            </div>
          </div>
          <div className="col-12">
            <hr />
            {todo.description}
          </div>
        </div>
      </div>
    </div>
  );
}
TodoDetail.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired,
};
export default TodoDetail;
