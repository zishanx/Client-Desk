import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            if (!response.ok) {
                const data = await response.json()
                return alert(data.message || "Registration failed")
            }

            navigate('/')
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register to ClientDesk!</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="name" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input type="text" name="email" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" name="password" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}