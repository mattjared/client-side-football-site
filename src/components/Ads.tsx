import { ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export const BannerAd = () => (
  <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-md">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold mb-2">Official Premier League Store</h2>
      <p className="mb-4">Get 20% off all kits! Limited time offer.</p>
      <Button className="bg-white text-blue-800 hover:bg-blue-100">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Shop Now
      </Button>
    </div>
    <img src="https://i.ibb.co/T2HCqsS/premier-league.jpg" alt="Premier League Ball" className="w-48 h-32 rounded-full" />
  </div>
</div>
  )

export const SponsorAd = () => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
    <div className="flex items-center justify-between">
      <img
        src="/placeholder.svg?height=50&width=120"
        alt="Sponsor Logo"
        className="w-30 h-auto"
      />
      <p className="text-sm text-gray-600">Official Premier League Partner</p>
    </div>
  </div>
)

export const FantasyAd = () => (
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-bold mb-2">Fantasy Premier League</h3>
    <p className="mb-4">Create your team now and compete with millions of players worldwide!</p>
    <Button variant="outline" className="bg-white text-purple-800 hover:bg-purple-100">
      Play Now
    </Button>
  </div>
)

export const VideoAd = ({ src } : { src?: string}) => (
  <div className="relative rounded-lg shadow-md mb-4">
    <iframe
      src={src || 'https://streamable.com/6cfvq6'}
      allow='autoplay'
      frameBorder='0'
      sandbox='allow same origin'
    >
      Your browser does not support the video tag.
    </iframe>
  </div>
)

export const BasicAd = ({ title, content }: { title: string; content: string }) => {
  return (
    <Card className="mb-4 bg-primary text-primary-foreground">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}