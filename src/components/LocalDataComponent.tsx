'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
export function LocalDataComponent() {
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