import { X } from "lucide-react"
import { useState, useEffect } from "react"

export default function CopyrightModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
        <div className="p-5 flex justify-between items-start border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Copyright Notice</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-gray-300 mb-4">
            All music content displayed in Dhwani is for demonstration purposes only. We do not own or claim any rights
            to the songs, albums, or artist content featured in this application.
          </p>
          <p className="text-gray-300 mb-4">
            In a real-world implementation, proper licensing agreements would be required to stream or distribute any
            copyrighted music content.
          </p>
          <p className="text-gray-400 text-sm">
            This demo showcases the user interface and functionality of the Dhwani music app without actual music
            streaming capabilities.
          </p>
        </div>
        <div className="p-5 border-t border-gray-800 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-emerald-600 rounded-md font-medium hover:bg-emerald-700 transition text-white"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}

