import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Quick Start</h1>
      <div className="grid gap-6">
        <Link href="/docs/quick-start/free-trail">
          <Card className="hover:border-blue-500 transition">
            <CardHeader>
              <CardTitle>Free Trail</CardTitle>
              <CardDescription>Start your 14-day free trail</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        
        <Link href="/docs/quick-start/features-snapshot">
          <Card className="hover:border-blue-500 transition">
            <CardHeader>
              <CardTitle>Feature Snapshot</CardTitle>
              <CardDescription>Overview of all features</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        
        {/* Add more links for other pages */}
      </div>
    </div>
  )
}