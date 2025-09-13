import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, IndianRupee } from "lucide-react"

interface MonthlyPayment {
  id: string
  payment_month: string
  total_quantity: number
  total_amount: number
  payment_status: string
  paid_at?: string
}

interface MonthlyPaymentsProps {
  payments: MonthlyPayment[]
}

export function MonthlyPayments({ payments }: MonthlyPaymentsProps) {
  const formatMonth = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Monthly Payments</CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/payments">
            <Calendar className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No payment records yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Payments will appear here after your first month of transactions
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.slice(0, 4).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{formatMonth(payment.payment_month)}</h4>
                    <Badge
                      variant={payment.payment_status === "paid" ? "default" : "secondary"}
                      className={
                        payment.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {payment.payment_status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">Total Milk: {Number(payment.total_quantity).toFixed(1)}L</div>
                  {payment.paid_at && (
                    <div className="text-xs text-gray-500">
                      Paid on {new Date(payment.paid_at).toLocaleDateString("en-IN")}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {Number(payment.total_amount).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
