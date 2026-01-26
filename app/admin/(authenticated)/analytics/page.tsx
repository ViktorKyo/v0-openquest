"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, TrendingUp, Users, FileText } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Platform insights and trends
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="flex flex-col items-center py-12">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <BarChart className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Analytics Dashboard</CardTitle>
            <CardDescription className="text-center max-w-md mt-2">
              This section will contain detailed analytics with charts showing:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Problems Over Time</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Track problem submissions by day/week/month
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <Users className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">User Growth</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Visualize user registration trends
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Engagement Metrics</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upvotes, comments, and builder activity
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                Advanced analytics charts will be implemented using Recharts or similar charting library.
                <br />
                This includes line charts, bar charts, and trend visualizations.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
