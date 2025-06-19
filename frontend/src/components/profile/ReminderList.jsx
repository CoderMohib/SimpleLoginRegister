import { useState } from "react";
import { showError } from "../../utils/toastUtils";

export default function ReminderList({ reminders, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editReminder, setEditReminder] = useState({ title: "", note: "" });

  const startEdit = (reminder) => {
    setEditingId(reminder._id);
    setEditReminder({
      title: reminder.title,
      note: reminder.note || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditReminder({ title: "", note: "" });
  };

  const handleChange = (e) => {
    setEditReminder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (!editReminder.title.trim()) showError("Title is required!");
    onUpdate(editingId, editReminder);
    cancelEdit();
  };

  return (
    <div className="container-fluid">
      <h3 className="mt-4 mb-3 text-center">Your Reminders</h3>
      {reminders.length === 0 ? (
        <p className="text-muted text-center">No reminders found.</p>
      ) : (
        <ul className="list-group">
          {reminders.map((reminder) => {
            const isEditing = editingId === reminder._id;
            return (
              <li
                key={reminder._id}
                className="list-group-item d-flex justify-content-between mt-2 bg-light shadow-sm"
              >
                <div className="flex-grow-1 me-3">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={editReminder.title}
                        onChange={handleChange}
                        className="form-control mb-1"
                      />
                      <textarea
                      style={{resize:"none"}}
                        name="note"
                        placeholder="Note (Optional)"
                        value={editReminder.note}
                        onChange={handleChange}
                        className="form-control"
                        rows={2}
                      />
                    </>
                  ) : (
                    <>
                      <h5 className="mb-1">{reminder.title}</h5>
                      <small className="text-muted">
                        {reminder.note ? reminder.note : "Empty Note!"}
                      </small>
                    </>
                  )}
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span className="text-dark">
                    {new Date(reminder.createdAt).toLocaleDateString()}
                  </span>
                  {isEditing ? (
                    <div className=" container d-flex">
                      <button
                        className="btn btn-sm btn-outline-success mx-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className=" container d-flex">
                      <button
                        className="btn btn-sm btn-outline-dark mx-2"
                        onClick={() => startEdit(reminder)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(reminder._id)}
                      >
                        Delete
                      </button>
                      </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
