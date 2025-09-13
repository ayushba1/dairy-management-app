import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-800">Registration Successful!</CardTitle>
            <CardDescription>Please check your email to verify your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                We've sent a verification email to your registered email address. Please click the verification link to
                activate your account.
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>After verification, you can sign in and start managing your dairy transactions.</p>
            </div>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
