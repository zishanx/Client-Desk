import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function AddClient() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [status, setStatus] = useState('active')
    const [notes, setNotes] = useState('')

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const saveClient = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/clients`,{
            method:"POST",
            headers:{"Authorization": token,"Content-type":"application/json"},
            body:JSON.stringify({name,email,phone,company,status,notes})
        })

        

        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add your Client.</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="name" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="name" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                    <input type="number" name="phone" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                    <input type="text" name="company" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" value="active" onChange={(e) => setStatus(e.target.value)} />
                            Active
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" value="inactive" onChange={(e) => setStatus(e.target.value)} />
                            Inactive
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" value="completed" onChange={(e) => setStatus(e.target.value)} />
                            Completed
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
                    <input type="text" name="notes" className="w-full border border-gray-300 rounded p-2" onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={saveClient}>Add Client</button>
            </div>
        </div>
    )
}