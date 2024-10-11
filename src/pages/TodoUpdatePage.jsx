import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncDetailTodo, asyncUpdateTodo } from "../states/todos/action";
import { showErrorDialog } from "../utils/tools";
import { hideLoading, showLoading } from "react-redux-loading-bar";

function TodoUpdatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector((state) => state.detailTodo); // Ambil todo dari state
  const isUpdateSuccess = useSelector((state) => state.isUpdateTodo); // Pantau status update

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_finished: 0,
  });

  // Fetch todo detail when page loads
  useEffect(() => {
    // Fetch todo details when page loads
    dispatch(asyncDetailTodo(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Detail Todo:", todo); // Logging untuk memastikan apakah `todo` terisi atau tidak
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        is_finished: todo.is_finished,
      });
    }
  }, [todo]);
}

export default TodoUpdatePage;
