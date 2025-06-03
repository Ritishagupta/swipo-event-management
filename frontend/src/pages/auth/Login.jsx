import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate =useNavigate()

    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const [admin, setAdmin] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if(admin) navigate('/verify-otp')
            console.log(form)
        } catch (error) {
            
        }
    }


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
                                    type="text"
                                    className="input"
                                    placeholder="Enter your username"
                                    onChange={(e) => form.username = e.target.value}
                                />
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    onChange={(e) => form.password = e.target.value}
                                />
                                <label className="label mb-2">
                                    <input
                                        onChange={(e) => setAdmin(true)}
                                        type="checkbox"
                                        className="toggle toggle-accent toggle-sm"
                                    />
                                    <span className="text-red-300">I'm Admin</span>
                                </label>
                                <div>
                                    <a className="link link-hover">Forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-accent mt-4 font-bold">Login</button>

                            </fieldset>
                        </form>
                        <p className="text-center ">Or</p>
                        <button className="btn btn-link">didn't have account? register</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
