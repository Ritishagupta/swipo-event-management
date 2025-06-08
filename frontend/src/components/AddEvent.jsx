import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AddEvent = ({onEventAdded}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        city: "",
        date: "",
        address: "",
        images: [],
        organizerDetails: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const form = new FormData();
            for (const key in formData) {
                if (key === "images") {
                    formData.images.forEach((img) => form.append("images", img));
                } else {
                    form.append(key, formData[key]);
                }
            }

            const res = await axios.post("/api/v1/event/addevent", form);
            toast.success("Event Created Successfully");

            document.getElementById('my_modal_4').close();
            onEventAdded()
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add event");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Event</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="modal-action">
                        <form onSubmit={handleSubmit}>
                            <h1>Event Details</h1>
                            <div className="grid grid-cols-4 items-center  my-2 gap-2">
                                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Event Title" className="input" required />
                                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Event Description" className="input" required />
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" required />
                                <input type="date" name="date" value={formData.date} onChange={handleChange} className="input" required />
                                <textarea name="address" value={formData.address} onChange={handleChange} className="textarea" placeholder="Event Address (Optional)" />
                                <input type="file" name="images" onChange={handleChange} multiple className="file-input file-input-accent" required />
                            </div>

                            <h1>Organizer Details</h1>
                            <div className="flex items-center justify-between mt-2 gap-2">
                                <input type="text" name="organizerDetails" value={formData.organizerDetails} onChange={handleChange} placeholder="Name" className="input" required />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" required />
                                <label className="input validator">
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" pattern="[0-9]*" minLength="10" maxLength="10" className="tabular-nums" />
                                </label>
                                <p className="validator-hint">Must be 10 digits</p>
                            </div>

                            <div className="flex items-center float-right mt-10 gap-2">
                                <button type="submit" className="btn btn-success font-bold">

                                    {loading ? <Loader /> : "Add"}

                                </button>
                                <button onClick={() => document.getElementById('my_modal_4').close()} type="button" className="btn btn-error font-bold">Discard</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddEvent;
