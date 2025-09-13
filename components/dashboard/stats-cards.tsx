import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Droplets, IndianRupee, Calendar } from "lucide-react"

interface Transaction {
  id: string
  quantity_liters: number
  total_amount: number
  transaction_date: string
  fat_percentage: number
  snf_percentage: number
}

interface StatsCardsProps {
  farmerId: string
  transactions: Transaction[]
}

export function StatsCards({ transactions }: StatsCardsProps) {
  // Calculate stats from transactions
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const thisMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.transaction_date)
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
  })

  const totalQuantityThisMonth = thisMonthTransactions.reduce((sum, t) => sum + Number(t.quantity_liters), 0)

  const totalAmountThisMonth = thisMonthTransactions.reduce((sum, t) => sum + Number(t.total_amount), 0)

  const avgFatPercentage =
    thisMonthTransactions.length > 0
      ? thisMonthTransactions.reduce((sum, t) => sum + Number(t.fat_percentage), 0) / thisMonthTransactions.length
      : 0

  const avgSnfPercentage =
    thisMonthTransactions.length > 0
      ? thisMonthTransactions.reduce((sum, t) => sum + Number(t.snf_percentage), 0) / thisMonthTransactions.length
      : 0

  const stats = [
    {
      title: "This Month's Milk",
      value: `${totalQuantityThisMonth.toFixed(1)} L`,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "This Month's Earnings",
      value: `₹${totalAmountThisMonth.toFixed(2)}`,
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Average Fat %",
      value: `${avgFatPercentage.toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Average SNF %",
      value: `${avgSnfPercentage.toFixed(2)}%`,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
