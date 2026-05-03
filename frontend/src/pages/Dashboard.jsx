import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Dashboard() {

    const navigate = useNavigate()
    const [clients, setClients] = useState([])

    const token = localStorage.getItem('token')

    const getClients = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/clients', {
                method: "GET",
                headers: { 'Authorization': token }
            })
            const data = await response.json()
            setClients(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    async function deleteClient(id){
        await fetch(`http://localhost:4000/api/clients/${id}`,
            {
                method:"DELETE",
                headers:{"Authorization": token}
            }
        )
        getClients();
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Clients</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>navigate('/add-client')}>Add Client</button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {clients.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-gray-500">{item.company}</p>
                                <span className="text-sm text-green-500 font-medium">{item.status}</span>
                                <p className="text-gray-400 text-sm">{item.notes}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500" onClick={()=> navigate(`/edit-client/${item._id}`)}>Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=> deleteClient(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}