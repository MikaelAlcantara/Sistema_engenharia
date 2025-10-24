import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Phone,
  Mail,
  Calendar,
  HardHat,
  AlertTriangle
} from "lucide-react"

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // Mock data - in real app this would come from API
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Team Lead",
      team: "Team A",
      email: "john.smith@metalworks.com",
      phone: "+1-555-0101",
      specialization: "Structural Engineering",
      activeWorks: ["Industrial Warehouse Alpha"],
      status: "Active",
      workload: "High",
      nextDeadline: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Team Lead",
      team: "Team B",
      email: "sarah.johnson@metalworks.com",
      phone: "+1-555-0102",
      specialization: "Welding Specialist",
      activeWorks: ["Commercial Building Beta"],
      status: "Active",
      workload: "Medium",
      nextDeadline: "2024-02-20"
    },
    {
      id: 3,
      name: "Mike Wilson",
      role: "Team Lead",
      team: "Team C",
      email: "mike.wilson@metalworks.com",
      phone: "+1-555-0103",
      specialization: "Assembly Coordinator",
      activeWorks: ["Factory Extension Gamma"],
      status: "Active",
      workload: "High",
      nextDeadline: "2024-01-30"
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Team Lead",
      team: "Team D",
      email: "lisa.chen@metalworks.com",
      phone: "+1-555-0104",
      specialization: "Quality Inspector",
      activeWorks: ["Residential Complex Delta"],
      status: "Active",
      workload: "Low",
      nextDeadline: "2024-04-15"
    },
    {
      id: 5,
      name: "David Rodriguez",
      role: "Senior Welder",
      team: "Team A",
      email: "david.rodriguez@metalworks.com",
      phone: "+1-555-0105",
      specialization: "Precision Welding",
      activeWorks: ["Industrial Warehouse Alpha"],
      status: "Active",
      workload: "Medium",
      nextDeadline: "2024-01-15"
    },
    {
      id: 6,
      name: "Emma Thompson",
      role: "Assembly Specialist",
      team: "Team B",
      email: "emma.thompson@metalworks.com",
      phone: "+1-555-0106",
      specialization: "Heavy Machinery",
      activeWorks: ["Commercial Building Beta"],
      status: "On Leave",
      workload: "None",
      nextDeadline: "-"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success"
      case "On Leave": return "warning"
      case "Unavailable": return "destructive"
      default: return "secondary"
    }
  }

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case "High": return "destructive"
      case "Medium": return "warning"
      case "Low": return "success"
      default: return "secondary"
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage staff, assignments, and workload distribution</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Register a new collaborator to the construction team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Team member registration form would go here...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active collaborators</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {teamMembers.filter(m => m.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {teamMembers.filter(m => m.workload === "High").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-machinery">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-machinery">
              {teamMembers.filter(m => m.role === "Team Lead").length}
            </div>
            <p className="text-xs text-muted-foreground">Leadership positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, team, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Team Lead">Team Leaders</SelectItem>
                <SelectItem value="Senior Welder">Senior Welders</SelectItem>
                <SelectItem value="Assembly Specialist">Assembly Specialists</SelectItem>
                <SelectItem value="Quality Inspector">Quality Inspectors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          <CardDescription>
            Complete list of team members with current assignments and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role & Team</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Current Work</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Next Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.specialization}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{member.role}</div>
                      <div className="text-xs text-muted-foreground">{member.team}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Mail className="h-3 w-3" />
                        {member.email.split('@')[0]}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {member.activeWorks.length > 0 ? (
                        <div className="flex items-center gap-1">
                          <HardHat className="h-3 w-3 text-primary" />
                          <span className="truncate max-w-32">{member.activeWorks[0]}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No active work</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(member.status) as any}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getWorkloadColor(member.workload) as any}>
                      {member.workload}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      {member.nextDeadline !== "-" ? (
                        <>
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {member.nextDeadline}
                        </>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Team Alerts
          </CardTitle>
          <CardDescription>Important notifications about team members and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium">High Workload Alert</p>
                <p className="text-xs text-muted-foreground">
                  John Smith and Mike Wilson have high workload. Consider redistributing tasks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium">Upcoming Deadline</p>
                <p className="text-xs text-muted-foreground">
                  Multiple team members have deadlines approaching within 5 days.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamManagement