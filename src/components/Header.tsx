'use client';

import { useState, useRef, useEffect } from 'react'
import { Button } from "./ui/button"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

const mainNavItems = [
  { name: "Home", subitems: [] },
  { name: "Fixtures", subitems: ["Results", "Tables", "Transfers"] },
  { name: "Video", subitems: ["Latest", "Highlights", "Features"] },
  { name: "Clubs", subitems: ["Players", "Managers", "Stadiums"] },
  { name: "More", subitems: ["Stats", "Fantasy", "Awards", "Social"] }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(itemName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 40)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <header className="w-full bg-gradient-to-r from-purple-800 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=96" alt="Premier League logo" />
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-1 lg:space-x-4">
              {mainNavItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    className="px-2 py-1 rounded-md text-sm font-medium hover:bg-purple-700 transition duration-150 ease-in-out flex items-center"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                    {item.subitems.length > 0 && <ChevronDown className="ml-1 h-3 w-3" />}
                  </button>
                  {item.subitems.length > 0 && activeDropdown === item.name && (
                    <div
                      className="absolute z-10 left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`${item.name}-menu`}
                    >
                      <div className="py-1">
                        {item.subitems.map((subitem) => (
                          <a
                            key={subitem}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {subitem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button variant="outline" size="sm" className="text-white border-white bg-purple-700 hover:bg-purple-600">
              Sign In
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-900 fixed inset-0 z-50 overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="flex justify-between items-center mb-4">
              <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=96" alt="Premier League logo" />
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                <X className="h-6 w-6" />
              </Button>
            </div>
            {mainNavItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition duration-150 ease-in-out flex items-center justify-between"
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-haspopup="true"
                >
                  {item.name}
                  {item.subitems.length > 0 && (
                    <ChevronRight className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {item.subitems.length > 0 && activeDropdown === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.subitems.map((subitem) => (
                      <a
                        key={subitem}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-white hover:bg-purple-700 transition duration-150 ease-in-out"
                      >
                        {subitem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-purple-700 px-4">
            <Button variant="outline" className="w-full text-white border-white bg-purple-700 hover:bg-purple-600">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}