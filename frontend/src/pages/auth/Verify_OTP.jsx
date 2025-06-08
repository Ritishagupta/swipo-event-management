import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/Loader"
import { useGlobalContext } from "../../context/Contexts"
import toast from "react-hot-toast"

const Verify_OTP = () => {

    const { userId } = useParams()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useGlobalContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.post(`/api/v1/user/verify-otp`, {
                userId,
                otp
            })

            if (response?.data?.statusCode === 200) {
                login(response?.data?.data)
                toast.success(response?.data?.message);
                navigate('/admin')
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="hero bg-base-200 min-h-screen ">
                <div className="card bg-base-100 w-full  shrink-0   max-w-md  shadow-md rounded-md p-6 border border-cyan-300 ">

                    <div className="card-body">
                        <h1 className="text-center text-3xl">Verify OTP! </h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">

                                <input
                                    value={otp}
                                    type="tel"
                                    inputMode="numeric"
                                    className="input input-bordered w-full"
                                    required
                                    placeholder="Enter 6-digit OTP"
                                    pattern="[0-9]*"
                                    minLength="6"
                                    maxLength="6"
                                    title="Must be 10 digits"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-accent mt-4 font-bold">
                                    {loading ? <Loader /> : "Verify"}
                                </button>

                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Verify_OTP
