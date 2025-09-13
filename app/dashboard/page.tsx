import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { MonthlyPayments } from "@/components/dashboard/monthly-payments"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get farmer profile
  const { data: farmer } = await supabase.from("farmers").select("*").eq("id", data.user.id).single()

  // Get recent transactions
  const { data: transactions } = await supabase
    .from("milk_transactions")
    .select("*")
    .eq("farmer_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get monthly payment summary
  const { data: monthlyPayments } = await supabase
    .from("monthly_payments")
    .select("*")
    .eq("farmer_id", data.user.id)
    .order("payment_month", { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader farmer={farmer} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCards farmerId={data.user.id} transactions={transactions || []} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentTransactions transactions={transactions || []} />
            <MonthlyPayments payments={monthlyPayments || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
