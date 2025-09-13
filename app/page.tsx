import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Milk, TrendingUp, IndianRupee, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Milk,
      title: "Track Milk Transactions",
      description: "Record daily milk sales and purchases with quantity, fat, and SNF percentages",
    },
    {
      icon: TrendingUp,
      title: "Quality-Based Pricing",
      description: "Automatic rate calculation based on fat and SNF content for fair pricing",
    },
    {
      icon: IndianRupee,
      title: "Monthly Payments",
      description: "Track monthly earnings and payment status with detailed summaries",
    },
    {
      icon: Users,
      title: "Farmer Dashboard",
      description: "Personal dashboard to view statistics, transactions, and payment history",
    },
  ]

  const benefits = [
    "Easy milk transaction recording",
    "Automatic quality-based pricing",
    "Monthly payment tracking",
    "Secure farmer authentication",
    "Mobile-friendly interface",
    "Real-time statistics",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Milk className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DairyTrack</h1>
                <p className="text-xs text-gray-500">Milk Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Milk className="h-4 w-4 mr-2" />
              Modern Dairy Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Manage Your Dairy Business with
              <span className="text-green-600"> Smart Technology</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Track milk transactions, calculate quality-based pricing, and manage monthly payments all in one
              comprehensive platform designed for modern dairy farmers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <Link href="/auth/register">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/auth/login">Farmer Login</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Quality-Based Pricing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Access Your Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Secure</div>
              <div className="text-gray-600">Data Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Dairy
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for dairy farmers to streamline operations and maximize profits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose DairyTrack?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Built by farmers, for farmers. Our platform understands the unique challenges of dairy farming and
                provides solutions that actually work.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center mb-6">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Milk className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-600">Join hundreds of farmers already using DairyTrack</p>
              </div>

              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                <Link href="/auth/register">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?
                <Link href="/auth/login" className="text-green-600 hover:text-green-700 ml-1">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-green-600 p-2 rounded-lg">
                <Milk className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">DairyTrack</h3>
                <p className="text-gray-400 text-sm">Empowering Dairy Farmers</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2025 DairyTrack. Built for farmers, by Ayush Kumar.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
