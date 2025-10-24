import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Bell,
  Settings,
  Calendar,
  TrendingDown,
  Users,
  Wrench,
  Mail,
  Smartphone
} from "lucide-react"

const Alerts = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Mock data - in real app this would come from API
  const alerts = [
    {
      id: 1,
      type: "Deadline",
      title: "Project Deadline Approaching",
      description: "Industrial Warehouse Alpha deadline is in 3 days",
      severity: "High",
      status: "Active",
      work: "Industrial Warehouse Alpha",
      team: "Team A",
      createdDate: "2024-01-12",
      dueDate: "2024-01-15",
      icon: Clock,
      color: "destructive"
    },
    {
      id: 2,
      type: "Quality",
      title: "Weld Inspection Required",
      description: "Section B welding requires quality inspection before proceeding",
      severity: "Medium",
      status: "Active",
      work: "Commercial Building Beta",
      team: "Team B",
      createdDate: "2024-01-11",
      dueDate: "2024-01-14",
      icon: Wrench,
      color: "warning"
    },
    {
      id: 3,
      type: "Delivery",
      title: "Parts Delivery Delayed",
      description: "Steel beams delivery for Factory Extension delayed by 2 days",
      severity: "Medium",
      status: "Active",
      work: "Factory Extension Gamma",
      team: "Team C",
      createdDate: "2024-01-10",
      dueDate: "2024-01-16",
      icon: TrendingDown,
      color: "warning"
    },
    {
      id: 4,
      type: "Safety",
      title: "Safety Equipment Renewal",
      description: "Safety equipment certification expires next week",
      severity: "High",
      status: "Active",
      work: "All Projects",
      team: "All Teams",
      createdDate: "2024-01-09",
      dueDate: "2024-01-18",
      icon: AlertTriangle,
      color: "destructive"
    },
    {
      id: 5,
      type: "Team",
      title: "Team Member Unavailable",
      description: "Emma Thompson on medical leave, reassignment needed",
      severity: "Low",
      status: "Active",
      work: "Commercial Building Beta",
      team: "Team B",
      createdDate: "2024-01-08",
      dueDate: "2024-01-20",
      icon: Users,
      color: "secondary"
    },
    {
      id: 6,
      type: "Quality",
      title: "Inspection Completed",
      description: "Section A structural integrity inspection passed",
      severity: "Info",
      status: "Resolved",
      work: "Industrial Warehouse Alpha",
      team: "Team A",
      createdDate: "2024-01-07",
      dueDate: "2024-01-12",
      icon: CheckCircle2,
      color: "success"
    }
  ]

  const alertSettings = [
    {
      id: "deadline-alerts",
      title: "Deadline Alerts",
      description: "Get notified when project deadlines are approaching",
      enabled: true,
      threshold: "3 days before"
    },
    {
      id: "quality-alerts",
      title: "Quality Control Alerts",
      description: "Notifications for required inspections and quality checks",
      enabled: true,
      threshold: "Immediate"
    },
    {
      id: "delivery-alerts",
      title: "Delivery Notifications",
      description: "Updates on material deliveries and delays",
      enabled: true,
      threshold: "1 day before"
    },
    {
      id: "safety-alerts",
      title: "Safety Alerts",
      description: "Critical safety-related notifications",
      enabled: true,
      threshold: "Immediate"
    },
    {
      id: "team-alerts",
      title: "Team Notifications",
      description: "Staff changes, assignments, and availability updates",
      enabled: false,
      threshold: "Immediate"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "destructive"
      case "Medium": return "warning"
      case "Low": return "secondary"
      case "Info": return "default"
      default: return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "destructive"
      case "Resolved": return "success"
      case "Dismissed": return "secondary"
      default: return "secondary"
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesType = filterType === "all" || alert.type === filterType
    return matchesStatus && matchesType
  })

  const activeAlertsCount = alerts.filter(a => a.status === "Active").length
  const highPriorityCount = alerts.filter(a => a.severity === "High" && a.status === "Active").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts, warnings, and notifications</p>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Alert Settings
        </Button>
      </div>

      {/* Alert Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeAlertsCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">Urgent items</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">8</div>
            <p className="text-xs text-muted-foreground">Issues resolved</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Auto Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">Sent today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Deadline">Deadline</SelectItem>
                <SelectItem value="Quality">Quality</SelectItem>
                <SelectItem value="Delivery">Delivery</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-destructive" />
            Active Alerts ({filteredAlerts.filter(a => a.status === "Active").length})
          </CardTitle>
          <CardDescription>Current alerts requiring attention or action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.filter(alert => alert.status === "Active").map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg bg-${alert.color}/10`}>
                  <alert.icon className={`h-5 w-5 text-${alert.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-foreground">{alert.title}</h3>
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Work: {alert.work}</span>
                    <span>Team: {alert.team}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {alert.dueDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Recently resolved alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.filter(alert => alert.status === "Resolved").map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-3 border rounded-lg opacity-75">
                <div className="p-1.5 rounded bg-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <Badge variant="secondary">Resolved</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure automatic alerts and notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {alertSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Threshold: {setting.threshold}</p>
                </div>
                <Switch checked={setting.enabled} />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium text-foreground mb-4">Delivery Methods</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Smartphone className="h-5 w-5 text-machinery" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Get urgent alerts via SMS</p>
                </div>
                <Switch checked={false} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Alerts