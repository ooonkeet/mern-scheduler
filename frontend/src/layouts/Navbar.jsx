import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, User, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  return (
    // <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-100 to-purple-200 shadow-md backdrop-blur-md">
      {/* Left side - Logo + Search */}
      <div className="flex h-16 items-center px-6 justify-between">
        {/* Schedura Logo (shadcn style) */}
        {/* <Button variant="ghost" className="flex items-center gap-2 px-0 hover:bg-transparent">
          <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
            <AvatarFallback>
              <Calendar className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
         <span className="text-2xl font-semibold text-primary tracking-tight">
  Schedura
</span>
        </Button> */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-purple-900">📅</span>
          </div>
          <span className="text-2xl font-semibold text-purple-900 drop-shadow-sm">
            Schedura
          </span>
          </div>

        {/* Search Bar */}
        <div className="flex-1 px-6">
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64"
            type="text"
          /> */}
          {/* <div>
          <Search className="absolute right-45 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-white/80 placeholder:text-purple-600 text-purple-900 focus:ring-2 focus:ring-purple-400"
          />
          {/* </div> */}
        
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notifications" type="button" className="text-purple-800 hover:bg-purple-200">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="User Menu" type="button" className="text-purple-800 hover:bg-purple-200">
          <User className="h-5 w-5" />
        </Button>
      </div>
      </div>
    </header>
  )
}
