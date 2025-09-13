import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TransactionsList } from "@/components/transactions/transactions-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"

export default async function TransactionsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all transactions for the farmer
  const { data: transactions } = await supabase
    .from("milk_transactions")
    .select("*")
    .eq("farmer_id", data.user.id)
    .order("transaction_date", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
                <p className="text-gray-600">View and manage your milk transactions</p>
              </div>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/transactions/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransactionsList transactions={transactions || []} />
      </main>
    </div>
  )
}
