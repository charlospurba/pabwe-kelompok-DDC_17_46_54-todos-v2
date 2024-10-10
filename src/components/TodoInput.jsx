import { useState } from "react";
import PropTypes from "prop-types";
function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleOnAddTodo(e) {
    e.preventDefault(); // Mencegah refresh halaman
    if (title.trim() && description.trim()) {
      onAddTodo({ title, description });
    }
  }
  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }
  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Buat Todo</h3>
        <hr />
        <form onSubmit={handleOnAddTodo}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Judul
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>
          <div>
            <label htmlFor="inputBody" className="form-label">
              Deskripsi
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleDescription}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
TodoInput.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
export default TodoInput;
