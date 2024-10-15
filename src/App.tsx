'use client'
import { FootballClubsTable } from './components/FootballClubTable'
import { LocalDataComponent } from './components/LocalDataComponent'
import Header from './components/Header'
import { BannerAd, VideoAd } from './components/Ads'

export default function App() {
  return (
    <div> 
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">English Football Clubs</h1>
      <p className="text-muted-foreground mb-4">or at least most of them</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <BannerAd />
          <FootballClubsTable />
          <LocalDataComponent />
        </div>
        <div>
          <VideoAd />
        </div>
      </div>
    </div>
    </div>
  )
}