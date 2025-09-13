import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { NewTransactionForm } from "@/components/transactions/new-transaction-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewTransactionPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/transactions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Transactions
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Transaction</h1>
              <p className="text-gray-600">Record a new milk transaction</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewTransactionForm farmerId={data.user.id} />
      </main>
    </div>
  )
}
