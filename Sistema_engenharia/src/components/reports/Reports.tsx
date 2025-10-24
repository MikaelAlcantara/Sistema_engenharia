import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  FileText, 
  Download, 
  Share, 
  Calendar,
  TrendingUp,
  Users,
  HardHat,
  Camera,
  BarChart3,
  FileSpreadsheet,
  Mail
} from "lucide-react"

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedWork, setSelectedWork] = useState("all")

  // Mock data - in real app this would come from API
  const reportTypes = [
    {
      id: "project-status",
      title: "Project Status Report",
      description: "Comprehensive overview of project progress and milestones",
      icon: HardHat,
      color: "primary",
      lastGenerated: "2024-01-12",
      formats: ["PDF", "Excel"]
    },
    {
      id: "team-performance",
      title: "Team Performance Report",
      description: "Analysis of team productivity and work distribution",
      icon: Users,
      color: "machinery",
      lastGenerated: "2024-01-10",
      formats: ["PDF", "Excel"]
    },
    {
      id: "progress-comparison",
      title: "Progress vs Timeline",
      description: "Comparison between planned and actual project progress",
      icon: TrendingUp,
      color: "success",
      lastGenerated: "2024-01-11",
      formats: ["PDF", "PowerPoint"]
    },
    {
      id: "photo-documentation",
      title: "Photo Documentation",
      description: "Visual progress documentation with before/after comparisons",
      icon: Camera,
      color: "steel",
      lastGenerated: "2024-01-09",
      formats: ["PDF"]
    },
    {
      id: "quality-control",
      title: "Quality Control Report",
      description: "Inspection results, defects, and compliance status",
      icon: FileText,
      color: "warning",
      lastGenerated: "2024-01-08",
      formats: ["PDF", "Excel"]
    },
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Budget tracking, expenses, and cost analysis",
      icon: BarChart3,
      color: "accent",
      lastGenerated: "2024-01-07",
      formats: ["PDF", "Excel"]
    }
  ]

  const recentReports = [
    {
      id: 1,
      name: "Industrial Warehouse Alpha - Progress Report",
      type: "Project Status",
      generatedBy: "John Smith",
      date: "2024-01-12",
      format: "PDF",
      size: "2.3 MB",
      status: "Ready"
    },
    {
      id: 2,
      name: "Team A Performance - December 2023",
      type: "Team Performance",
      generatedBy: "Sarah Johnson",
      date: "2024-01-10",
      format: "Excel",
      size: "856 KB",
      status: "Ready"
    },
    {
      id: 3,
      name: "Monthly Progress Comparison",
      type: "Progress Analysis",
      generatedBy: "Mike Wilson",
      date: "2024-01-11",
      format: "PDF",
      size: "4.1 MB",
      status: "Ready"
    },
    {
      id: 4,
      name: "Quality Control Q4 2023",
      type: "Quality Report",
      generatedBy: "Lisa Chen",
      date: "2024-01-08",
      format: "PDF",
      size: "1.7 MB",
      status: "Processing"
    }
  ]

  const getIconColor = (color: string) => {
    switch (color) {
      case "primary": return "text-primary"
      case "machinery": return "text-machinery"
      case "success": return "text-success"
      case "steel": return "text-steel"
      case "warning": return "text-warning"
      case "accent": return "text-accent"
      default: return "text-muted-foreground"
    }
  }

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`)
    // In real app, this would trigger report generation
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate, manage, and share construction progress reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">147</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Automated Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-xs text-muted-foreground">Scheduled reports</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-machinery">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shared Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-machinery">89</div>
            <p className="text-xs text-muted-foreground">Sent to clients</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">5</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation Options */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select filters and generate custom reports for your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedWork} onValueChange={setSelectedWork}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Works</SelectItem>
                <SelectItem value="warehouse-alpha">Industrial Warehouse Alpha</SelectItem>
                <SelectItem value="building-beta">Commercial Building Beta</SelectItem>
                <SelectItem value="factory-gamma">Factory Extension Gamma</SelectItem>
                <SelectItem value="residential-delta">Residential Complex Delta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <report.icon className={`h-8 w-8 ${getIconColor(report.color)}`} />
                    <Badge variant="outline" className="text-xs">
                      {report.formats.join(", ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {report.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Last: {report.lastGenerated}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated reports available for download or sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{report.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>Type: {report.type}</span>
                      <span>By: {report.generatedBy}</span>
                      <span>Date: {report.date}</span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === "Ready" ? "success" : "warning" as any}>
                    {report.status}
                  </Badge>
                  {report.status === "Ready" && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-success" />
              Export to Excel/Sheets
            </CardTitle>
            <CardDescription>Export data to spreadsheet formats for further analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Google Sheets
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Automated Distribution
            </CardTitle>
            <CardDescription>Set up automatic report delivery to clients and stakeholders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Reports