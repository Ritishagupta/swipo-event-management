import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const UpdateEvent = ({ data, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    eventId:data._id,
    title: data.title || "",
    description: data.description || "",
    city: data.city || "",
    date: data.date?.substring(0, 10) || "",
    address: data.address || "",
    email: data.email || "",
    phone: data.phone || "",
    organizerDetails: data.organizerDetails || "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      if (key === "images") {
        for (let img of formData.images) {
          form.append("images", img);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.put(`/api/v1/event/edit-event`, form);
      toast.success("Event updated successfully!");
      onEventUpdated && onEventUpdated(res.data.event);
      document.getElementById("my_modal_4").close();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <button
        className="btn btn-warning btn-sm font-bold"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Update
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action">
            <form onSubmit={handleUpdate}>
              <h1>Event Details</h1>
              <div className="grid grid-cols-4 gap-2 my-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <textarea
                  name="address"
                  className="textarea"
                  placeholder="Event Address (Optional)"
                  value={formData.address}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleChange}
                  className="file-input file-input-accent"
                />
              </div>

              <h1>Organizer Details</h1>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  name="organizerDetails"
                  placeholder="Name"
                  value={formData.organizerDetails}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="10"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="submit" className="btn btn-success font-bold">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_4").close()}
                  className="btn btn-error font-bold"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateEvent;
