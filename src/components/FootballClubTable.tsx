'use client';

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
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
  
  export function FootballClubsTable() {
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