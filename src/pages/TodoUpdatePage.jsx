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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());

    try {
      await dispatch(
        asyncUpdateTodo({
          id: todo.id, // pastikan ini tidak undefined
          title: formData.title,
          description: formData.description,
          is_finished: Number(formData.is_finished),
        })
      );
      navigate(`/todos/${todo.id}`); // Redirect after successful update
    } catch (error) {
      showErrorDialog(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  if (!todo || !todo.id) {
    // Tampilkan loading saat todo belum di-load
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <h3>Edit Todo</h3>

      {/* Tampilkan pesan jika berhasil update */}
      {isUpdateSuccess && (
        <div className="alert alert-success">Todo updated successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="is_finished" className="form-label">
            Status
          </label>
          <select
            id="is_finished"
            name="is_finished"
            className="form-select"
            value={formData.is_finished}
            onChange={handleChange}
          >
            <option value={0}>Belum Selesai</option>
            <option value={1}>Selesai</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Todo
        </button>
      </form>
    </div>
  );
}

export default TodoUpdatePage;
