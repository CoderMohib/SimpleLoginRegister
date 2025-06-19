export default function ReminderForm({ newReminder, onChange, onSubmit }) {
  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="card p-3 mb-4">
        <h5 className="mb-3 text-center fw-bolder">Add New Reminder</h5>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={newReminder.title}
          className={`form-control mb-2`}
          onChange={onChange}
        />
        <textarea
          name="note"
          style={{ resize: "none" }}
          placeholder="Note (optional)"
          value={newReminder.note}
          className="form-control mb-2"
          onChange={onChange}
        ></textarea>
        <button className="btn btn-dark" onClick={onSubmit}>
          Add Reminder
        </button>
      </div>
    </div>
  );
}
