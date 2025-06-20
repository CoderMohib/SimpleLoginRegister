import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";
import { showError, showSuccess } from "../utils/toastUtils";
import ProfileHeader from "../components/profile/ProfileHeader";
import ReminderForm from "../components/profile/ProfileReminderForm";
import ReminderList from "../components/profile/ReminderList";

export default function Profile() {
  const { logout } = useAuth();
  const [userName, setUserName] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    title: "",
    note: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/profile");
      setUserName(res.data?.user?.username);
      const reminderRes = await axios.get(
        "http://localhost:3000/api/profile/reminders"
      );
      console.log(reminderRes.data?.reminders);
      setReminders(reminderRes.data?.reminders || []);
    } catch (err) {
      showError("Failed to fetech data! Login Again");
      setUserName(null);
      setReminders(null);
      setTimeout(logout, 3000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleAddReminder = async () => {
    if (!newReminder.title.trim()) return showError("Title is required!");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/profile/reminders",
        newReminder
      );
      setReminders([res.data.reminder, ...reminders]);
      setNewReminder({
        title: "",
        note: "",
      });
      showSuccess("Reminder Added Successfully!");
    } catch (err) {
      console.error(err);
      showError("Failed to add reminder");
    }
  };
  const handleOnChange = (e) => {
    setNewReminder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDeleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/profile/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder._id !== id));
      showSuccess("Reminder deleted");
    } catch (err) {
      showError("Failed to delete");
    }
  };
  const handleUpdateReminder = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/profile/reminders/${id}`,
        updatedData
      );
      const updated = res.data.updated;
      setReminders((prev) =>
        prev.map((reminder) => (reminder._id === id ? updated : reminder))
      );
      showSuccess("Reminder updated");
    } catch (err) {
      showError("Failed to update reminder");
    }
  };

  if (!userName || !reminders) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-muted"> </div>
      </div>
    );
  }
  return (
    <>
      <ProfileHeader userName={userName} />
      <ReminderForm
        onSubmit={handleAddReminder}
        onChange={handleOnChange}
        newReminder={newReminder}
      />
      <ReminderList
        reminders={reminders}
        onDelete={handleDeleteReminder}
        onUpdate={handleUpdateReminder}
      />
    </>
  );
}
