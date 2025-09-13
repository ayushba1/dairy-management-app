import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, Plus } from "lucide-react"

interface Transaction {
  id: string
  transaction_date: string
  quantity_liters: number
  fat_percentage: number
  snf_percentage: number
  rate_per_liter: number
  total_amount: number
  transaction_type: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
          <Link href="/transactions">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No transactions yet</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/transactions/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Transaction
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge
                      variant={transaction.transaction_type === "sell" ? "default" : "secondary"}
                      className={transaction.transaction_type === "sell" ? "bg-green-100 text-green-800" : ""}
                    >
                      {transaction.transaction_type === "sell" ? "Sold" : "Bought"}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.transaction_date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Number(transaction.quantity_liters).toFixed(1)}L • Fat:{" "}
                    {Number(transaction.fat_percentage).toFixed(1)}% • SNF:{" "}
                    {Number(transaction.snf_percentage).toFixed(1)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">₹{Number(transaction.total_amount).toFixed(2)}</div>
                  <div className="text-sm text-gray-500">@₹{Number(transaction.rate_per_liter).toFixed(2)}/L</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
