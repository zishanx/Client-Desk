import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async () => {
        if (!email || !password) {
            return alert("Invalid credentials")
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login to ClientDesk</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
                    Login
                </button>

                <p className="text-center mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    )
}