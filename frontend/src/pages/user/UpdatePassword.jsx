import axios from "axios"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import Loader from "../../components/Loader"

const UpdatePassword = ({ userId }) => {


    const [form, setForm] = useState({
        userId: userId,
        oldPassword: "",
        newPassword: "",
    })

    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.newPassword !== confirmPassword) {
            alert("New Password and Confirm New Password doesn't match!")
            return
        }

        try {
            setLoading(true)
            const response = await axios.post(`/api/v1/user/update-password`, form)

            if (response?.data?.statusCode === 200) {
                setForm({
                    userId: userId,
                    oldPassword: "",
                    newPassword: "",
                });
                setConfirmPassword("")
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>

            <button onClick={() => document.getElementById('my_modal_3').showModal()}>
                <FaRegEdit className="text-2xl cursor-pointer" />
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box py-12">
                    <form method="dialog" onSubmit={handleSubmit}>
                        <label className="input validator mb-5 w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
                                type="password"
                                required
                                placeholder="Old Password"
                            />
                        </label>
                        <label className="input validator mb-5 w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                onChange={handleChange}
                                name="newPassword"
                                value={form.newPassword}
                                type="password"
                                required
                                placeholder="New Password"
                            />
                        </label>
                        <label className="input validator mb-5 w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                required
                                placeholder="Confirm New Password"
                            />
                        </label>
                        <div>

                            <button type="submit" className="btn btn-success font-black w-full ">
                                {loading ? <Loader /> : "Update"}
                            </button>
                        </div>


                        <button
                            onClick={() => document.getElementById('my_modal_3').close()}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                </div>
            </dialog>
        </div>
    )
}

export default UpdatePassword
