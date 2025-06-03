import { useState } from "react"

const Verify_OTP = () => {

    const[otp,setOtp] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("OTP submitted --- ",otp)
    }

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <div className="card-body">
                        <h1 className="text-center text-3xl">Verify OTP!</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                               
                                <input
                                    type="tel"
                                    className="input tabular-nums"
                                    required
                                    placeholder="XXXXXX"
                                    pattern="[0-9]*"
                                    minLength="10"
                                    maxLength="10"
                                    title="Must be 10 digits"
                                    onChange={(e)=>setOtp(Number(e.target.value))}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-accent mt-4 font-bold">Verify</button>

                            </fieldset>
                        </form>
                        <button className="btn btn-link">resend?</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Verify_OTP
