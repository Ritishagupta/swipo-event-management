import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../components/Loader.jsx";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/Contexts.jsx";

const Login = () => {

    const navigate = useNavigate();
    const { user, login } = useGlobalContext()

    useEffect(() => {
        if (user) {
            if (user.role === "admin") navigate('/admin');
            else navigate('/user');
        }
    }, [user, navigate]);
    const [form, setForm] = useState({
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
            const response = await axios.post(`/api/v1/user/login`, form);


            if (response?.data?.statusCode === 200) {
                if (form.role === "admin") {
                    navigate(`/verify-otp/${response.data?.data?._id}`);
                } else {
                    login(response?.data?.data)
                    toast.success(response?.data?.message);
                    navigate("/user");
                }
                setForm({
                    username: "",
                    password: "",
                    role: "user",
                });
            }

            setLoading(false)
        } catch (error) {

            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    };



    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <div className="card-body">
                        <h1 className="text-center text-3xl">Login!</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Username</label>
                                <input
                                    name="username"
                                    value={form.username}
                                    type="text"
                                    className="input"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                />
                                <label className="label">Password</label>
                                <input
                                    name="password"
                                    value={form.password}
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                                <label className="label mb-2">
                                    <input
                                        name="role"
                                        onChange={(e) =>
                                            setForm({ ...form, role: e.target.checked ? "admin" : "user" })
                                        }
                                        type="checkbox"
                                        className="toggle toggle-accent toggle-sm"
                                    />
                                    <span className="text-red-300">I'm Admin</span>
                                </label>
                                <div>
                                    <Link to={'/forgot-password'} className="link link-hover">Forgot password?</Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-accent mt-4 font-bold">
                                    {loading ? <Loader /> : "Login"}
                                </button>

                            </fieldset>
                        </form>
                        <p className="text-center ">Or</p>
                        <button className="btn btn-link">
                            <Link to={'/register'}>didn't have account? register</Link>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
