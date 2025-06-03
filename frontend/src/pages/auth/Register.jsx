
const Register = () => {
   return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <div className="card-body">
                        <h1 className="text-center text-3xl">Register!</h1>
                        <fieldset className="fieldset">
                            <label className="label">Username</label>
                            <input type="text" className="input" placeholder="Enter your username" />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                            
                            
                            <button className="btn btn-accent mt-4 font-bold">Register</button>

                            <p className="text-center mt-5">Or</p>
                            <button className="btn btn-link">Already have an acount?Login</button>
                        </fieldset>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register
