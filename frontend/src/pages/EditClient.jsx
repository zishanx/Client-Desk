import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"


export default function EditClient() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [status, setStatus] = useState('active')
    const [notes, setNotes] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    const getClient = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`, {
            method: "GET",
            headers: { "Authorization": token },
        })
        const data = await response.json()
        setName(data.name);
        setEmail(data.email)
        setPhone(data.phone)
        setCompany(data.company)
        setStatus(data.status)
        setNotes(data.notes)
    }

    useEffect(() => {
        getClient()
    }, [])

    const saveClient = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`, {
            method: "PUT",
            headers: { "Authorization": token, "Content-type": "application/json" },
            body: JSON.stringify({ name, email, phone, company, status, notes })
        })



        navigate('/dashboard')
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add your Client.</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={name} name="name" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} name="name" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                    <input type="number" value={phone} name="phone" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                    <input type="text" value={company} name="company" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input type="radio" checked={status === "active"} name="status" value="active" onChange={(e) => setStatus(e.target.value)} />
                            Active
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" checked={status === "inactive"} name="status" value="inactive" onChange={(e) => setStatus(e.target.value)} />
                            Inactive
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" checked={status === "completed"} name="status" value="completed" onChange={(e) => setStatus(e.target.value)} />
                            Completed
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
                    <input type="text" value={notes} name="notes" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={saveClient}>SaveChanges</button>
            </div>
        </div>
    )
}