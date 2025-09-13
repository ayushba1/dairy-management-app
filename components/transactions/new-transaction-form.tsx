"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Save } from "lucide-react"

interface NewTransactionFormProps {
  farmerId: string
}

export function NewTransactionForm({ farmerId }: NewTransactionFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    transaction_date: new Date().toISOString().split("T")[0],
    quantity_liters: "",
    fat_percentage: "",
    snf_percentage: "",
    rate_per_liter: "",
    transaction_type: "sell",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      transaction_type: value,
    }))
  }

  const calculateRate = () => {
    const fat = Number.parseFloat(formData.fat_percentage) || 0
    const snf = Number.parseFloat(formData.snf_percentage) || 0

    // Simple rate calculation based on fat and SNF
    // Base rate: ₹25, +₹2 per 0.1% fat above 3.5%, +₹1 per 0.1% SNF above 8.5%
    let baseRate = 25
    if (fat > 3.5) {
      baseRate += (fat - 3.5) * 20 // ₹2 per 0.1% = ₹20 per 1%
    }
    if (snf > 8.5) {
      baseRate += (snf - 8.5) * 10 // ₹1 per 0.1% = ₹10 per 1%
    }

    setFormData((prev) => ({
      ...prev,
      rate_per_liter: baseRate.toFixed(2),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("milk_transactions").insert({
        farmer_id: farmerId,
        transaction_date: formData.transaction_date,
        quantity_liters: Number.parseFloat(formData.quantity_liters),
        fat_percentage: Number.parseFloat(formData.fat_percentage),
        snf_percentage: Number.parseFloat(formData.snf_percentage),
        rate_per_liter: Number.parseFloat(formData.rate_per_liter),
        transaction_type: formData.transaction_type,
      })

      if (error) throw error

      router.push("/transactions")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
          New Milk Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="transaction_date">Transaction Date</Label>
              <Input
                id="transaction_date"
                name="transaction_date"
                type="date"
                required
                value={formData.transaction_date}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction_type">Transaction Type</Label>
              <Select value={formData.transaction_type} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sell">Sell (You sold milk)</SelectItem>
                  <SelectItem value="buy">Buy (You bought milk)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity_liters">Quantity (Liters)</Label>
              <Input
                id="quantity_liters"
                name="quantity_liters"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 25.5"
                required
                value={formData.quantity_liters}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat_percentage">Fat Percentage (%)</Label>
              <Input
                id="fat_percentage"
                name="fat_percentage"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 4.2"
                required
                value={formData.fat_percentage}
                onChange={handleInputChange}
                onBlur={calculateRate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snf_percentage">SNF Percentage (%)</Label>
              <Input
                id="snf_percentage"
                name="snf_percentage"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 8.8"
                required
                value={formData.snf_percentage}
                onChange={handleInputChange}
                onBlur={calculateRate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate_per_liter">Rate per Liter (₹)</Label>
              <div className="flex space-x-2">
                <Input
                  id="rate_per_liter"
                  name="rate_per_liter"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g., 32.50"
                  required
                  value={formData.rate_per_liter}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={calculateRate}
                  className="whitespace-nowrap bg-transparent"
                >
                  Auto Calculate
                </Button>
              </div>
              <p className="text-xs text-gray-500">Rate is calculated based on fat and SNF percentages</p>
            </div>
          </div>

          {formData.quantity_liters && formData.rate_per_liter && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="text-sm text-green-800">
                <strong>
                  Total Amount: ₹
                  {(
                    Number.parseFloat(formData.quantity_liters || "0") *
                    Number.parseFloat(formData.rate_per_liter || "0")
                  ).toFixed(2)}
                </strong>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Transaction"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
