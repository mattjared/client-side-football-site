'use client'
import { FootballClubsTable } from './components/FootballClubTable'
import { LocalDataComponent } from './components/LocalDataComponent'
import { AdComponent } from './components/AdComponent'
import Header from './components/Header'

export default function App() {
  return (
    <div> 
      <Header />
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
    </div>
  )
}