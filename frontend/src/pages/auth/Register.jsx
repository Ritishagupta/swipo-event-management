import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../components/Loader.jsx";

const Register = () => {


    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "user", // default role
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post(`/api/v1/user/register`, form);

            if (response?.data?.statusCode) {

                navigate("/user");
                setForm({
                    username: "",
                    password: "",
                    role: "user",
                });
            } else {
                console.error("Register failed:", response?.data?.message);
            }

            setLoading(false)
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    };
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <div className="card-body">
                        <h1 className="text-center text-3xl">Register!</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">

                                <label className="label">Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="input"
                                    placeholder="Enter your Name" />

                                <label className="label">Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="input"
                                    placeholder="example@gmail.com" />

                                <label className="label">Username</label>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    type="text"
                                    className="input"
                                    placeholder="Enter your username" />

                                <label className="label">Password</label>
                                <input
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    type="password"
                                    className="input"
                                    placeholder="Password" />


                                <button className="btn btn-accent mt-4 font-bold">
                                    {loading ? <Loader /> : "Register"}
                                </button>

                                <p className="text-center mt-5">Or</p>
                                <button className="btn btn-link">
                                    <Link to={'/'}>Already have an acount?Login</Link>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register
