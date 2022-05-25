import Navbar from './components/Navbar'
import Minting from './components/Minting'
import Alert from './components/Alert'

function App() {
    return (
        <div className="bg-black min-h-screen text-white font-rubik relative">
            <div className="px-24 py-6">
                <Navbar />
            </div>
            <div className="px-40 mt-12">
                <Minting />
            </div>
            <div>
                <Alert />
            </div>
        </div>
    )
}

export default App
