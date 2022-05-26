import Navbar from './components/Navbar'
import Minting from './components/Minting'
import Alert from './components/Alert'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="bg-black min-h-screen text-white font-blue-goblet-regular relative">
            <ToastContainer />
            <div className="px-5 md:px-24 py-6">
                <Navbar />
            </div>
            <div className="px-5 md:px-40 mt-12">
                <Minting />
            </div>
            <div>
                <Alert />
            </div>
        </div>
    )
}

export default App
