import { Link } from 'react-router-dom'

export function CreateRoom() {
  return (
    <div>
      <div>Create Room</div>
      <Link to="/room">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Room
        </button>
      </Link>
    </div>
  )
}
