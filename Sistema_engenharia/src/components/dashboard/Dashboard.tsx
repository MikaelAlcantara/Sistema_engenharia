import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  HardHat, 
  TrendingUp,
  Users,
  Wrench
} from "lucide-react"

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = {
    activeWorks: 12,
    completedWorks: 45,
    totalTeamMembers: 28,
    pendingAlerts: 5
  }

  const activeWorks = [
    {
      id: 1,
      name: "Industrial Warehouse Alpha",
      client: "TechCorp Industries",
      progress: 85,
      status: "On Track",
      deadline: "2024-01-15",
      team: "Team A"
    },
    {
      id: 2,
      name: "Commercial Building Beta",
      client: "Metro Construction",
      progress: 42,
      status: "Delayed",
      deadline: "2024-02-20",
      team: "Team B"
    },
    {
      id: 3,
      name: "Factory Extension Gamma",
      client: "Manufacturing Plus",
      progress: 67,
      status: "On Track",
      deadline: "2024-01-30",
      team: "Team C"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "success"
      case "Delayed": return "destructive"
      case "Completed": return "secondary"
      default: return "warning"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of all construction management activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Works</CardTitle>
            <HardHat className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.activeWorks}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Works</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completedWorks}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-machinery">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-machinery" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-machinery">{stats.totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground">Active collaborators</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingAlerts}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Works Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Active Works Overview
          </CardTitle>
          <CardDescription>
            Current status and progress of ongoing construction projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeWorks.map((work) => (
              <div key={work.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{work.name}</h3>
                    <Badge variant={getStatusColor(work.status) as any}>
                      {work.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{work.client}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {work.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {work.team}
                    </span>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{work.progress}%</span>
                  </div>
                  <Progress value={work.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              View detailed analytics and progress reports
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-machinery">
              <Wrench className="h-5 w-5" />
              Equipment Status
            </CardTitle>
            <CardDescription>
              Monitor machinery and equipment availability
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard