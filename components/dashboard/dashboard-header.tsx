"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Milk, LogOut, User, Plus } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  farmer: {
    id: string
    name: string
    phone?: string
    address?: string
  } | null
}

export function DashboardHeader({ farmer }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Milk className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DairyTrack</h1>
                <p className="text-sm text-gray-500">Farmer Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/transactions/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Link>
            </Button>

            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{farmer?.name || "Farmer"}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-800 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
