import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface Transaction {
  id: string
  transaction_date: string
  quantity_liters: number
  fat_percentage: number
  snf_percentage: number
  rate_per_liter: number
  total_amount: number
  transaction_type: string
  created_at: string
}

interface TransactionsListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No transactions found</p>
          <p className="text-gray-400 mb-6">Start by adding your first milk transaction</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a href="/transactions/new">Add Your First Transaction</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Group transactions by month
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.transaction_date)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      const monthName = date.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })

      if (!groups[monthKey]) {
        groups[monthKey] = {
          monthName,
          transactions: [],
        }
      }
      groups[monthKey].transactions.push(transaction)
      return groups
    },
    {} as Record<string, { monthName: string; transactions: Transaction[] }>,
  )

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions by Month */}
      {Object.entries(groupedTransactions)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([monthKey, { monthName, transactions: monthTransactions }]) => (
          <Card key={monthKey}>
            <CardHeader>
              <CardTitle className="text-lg">{monthName}</CardTitle>
              <div className="text-sm text-gray-600">
                {monthTransactions.length} transaction{monthTransactions.length !== 1 ? "s" : ""} • Total: ₹
                {monthTransactions.reduce((sum, t) => sum + Number(t.total_amount), 0).toFixed(2)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge
                          variant={transaction.transaction_type === "sell" ? "default" : "secondary"}
                          className={transaction.transaction_type === "sell" ? "bg-green-100 text-green-800" : ""}
                        >
                          {transaction.transaction_type === "sell" ? "Sold" : "Bought"}
                        </Badge>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(transaction.transaction_date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Quantity:</span>
                          <br />
                          {Number(transaction.quantity_liters).toFixed(1)}L
                        </div>
                        <div>
                          <span className="font-medium">Fat:</span>
                          <br />
                          {Number(transaction.fat_percentage).toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">SNF:</span>
                          <br />
                          {Number(transaction.snf_percentage).toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Rate:</span>
                          <br />₹{Number(transaction.rate_per_liter).toFixed(2)}/L
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{Number(transaction.total_amount).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
