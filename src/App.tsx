'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FootballClub {
  id: number
  name: string
  league: string
  nickname: string
  level: string
}

function useFootballClubs() {
  const [clubs, setClubs] = useState<FootballClub[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('https://football-clubs-api.vercel.app/')
      .then(response => {
        setClubs(response.data)
        setLoading(false)
      })
      .catch((error: Error) => {
        console.error('Fetch error:', error)
        setError('Error fetching data')
        setLoading(false)
      })
  }, [])

  return { clubs, loading, error }
}

function FootballClubsTable() {
  const { clubs, loading, error } = useFootballClubs()
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  if (loading) return <div className="text-center py-4">Loading...</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(filter.toLowerCase()) ||
    club.league.toLowerCase().includes(filter.toLowerCase()) ||
    club.nickname.toLowerCase().includes(filter.toLowerCase()) ||
    club.level.toLowerCase().includes(filter.toLowerCase())
  )

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClubs = filteredClubs.slice(startIndex, endIndex)

  return (
    <Card>
      <CardHeader>
        <CardTitle>English Football Clubs</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Filter clubs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>League</TableHead>
              <TableHead>Nickname</TableHead>
              <TableHead>Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClubs.map(club => (
              <TableRow key={club.id}>
                <TableCell>{club.name}</TableCell>
                <TableCell>{club.league}</TableCell>
                <TableCell>{club.nickname}</TableCell>
                <TableCell>{club.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LocalDataComponent() {
  const [localData, setLocalData] = useState<string | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('footballClubsData')
    if (data) {
      setLocalData(data)
    } else {
      setLocalData('No local data found')
    }
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Local Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{localData}</p>
      </CardContent>
    </Card>
  )
}

function AdComponent({ title, content }: { title: string; content: string }) {
  return (
    <Card className="mb-4 bg-primary text-primary-foreground">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">English Football Clubs</h1>
      <p className="text-muted-foreground mb-4">or at least most of them</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <FootballClubsTable />
          <LocalDataComponent />
        </div>
        <div>
          <AdComponent 
            title="Premium Membership" 
            content="Get access to exclusive content and features with our Premium Membership!" 
          />
          <AdComponent 
            title="Football Gear" 
            content="Shop the latest football gear and support your favorite clubs!" 
          />
        </div>
      </div>
    </div>
  )
}