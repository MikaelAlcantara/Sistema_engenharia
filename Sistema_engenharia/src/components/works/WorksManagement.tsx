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
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Calendar,
  Users,
  MapPin,
  Clock
} from "lucide-react"
import { WorkRegistrationForm } from "./WorkRegistrationForm"
import { WorkDetails } from "./WorkDetails"

const WorksManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)

  // Mock data - in real app this would come from API
  const works = [
    {
      id: 1,
      name: "Industrial Warehouse Alpha",
      client: "TechCorp Industries",
      clientInfo: "contact@techcorp.com | +1-555-0123",
      startDate: "2023-11-01",
      endDate: "2024-01-15",
      responsibleTeam: "Team A - Lead: John Smith",
      status: "In Progress",
      progress: 85,
      location: "Zone A, Industrial Park"
    },
    {
      id: 2,
      name: "Commercial Building Beta",
      client: "Metro Construction",
      clientInfo: "info@metroconstruction.com | +1-555-0456",
      startDate: "2023-12-01",
      endDate: "2024-02-20",
      responsibleTeam: "Team B - Lead: Sarah Johnson",
      status: "Delayed",
      progress: 42,
      location: "Downtown Commercial District"
    },
    {
      id: 3,
      name: "Factory Extension Gamma",
      client: "Manufacturing Plus",
      clientInfo: "projects@mfgplus.com | +1-555-0789",
      startDate: "2023-10-15",
      endDate: "2024-01-30",
      responsibleTeam: "Team C - Lead: Mike Wilson",
      status: "On Track",
      progress: 67,
      location: "West Industrial Complex"
    },
    {
      id: 4,
      name: "Residential Complex Delta",
      client: "Urban Developers",
      clientInfo: "contact@urbandev.com | +1-555-0321",
      startDate: "2024-01-01",
      endDate: "2024-04-15",
      responsibleTeam: "Team D - Lead: Lisa Chen",
      status: "Planning",
      progress: 15,
      location: "Suburban Development Area"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "success"
      case "In Progress": return "default"
      case "Delayed": return "destructive"
      case "Planning": return "secondary"
      case "Completed": return "success"
      default: return "warning"
    }
  }

  const filteredWorks = works.filter(work =>
    work.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Works Management</h1>
          <p className="text-muted-foreground">Manage and monitor all construction projects</p>
        </div>
        
        <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Register New Work
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Work</DialogTitle>
              <DialogDescription>
                Add a new construction project to the management system
              </DialogDescription>
            </DialogHeader>
            <WorkRegistrationForm onSuccess={() => setShowRegistration(false)} />
          </DialogContent>
        </Dialog>
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
                placeholder="Search works by name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Works Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Works ({filteredWorks.length})</CardTitle>
          <CardDescription>
            Overview of all registered construction projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorks.map((work) => (
                <TableRow key={work.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{work.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {work.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{work.client}</div>
                      <div className="text-xs text-muted-foreground">{work.clientInfo.split(' | ')[0]}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(work.status) as any}>
                      {work.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${work.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{work.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {work.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {work.responsibleTeam.split(' - ')[0]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedWork(work.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <WorkDetails workId={work.id} />
                        </DialogContent>
                      </Dialog>
                      
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
    </div>
  )
}

export default WorksManagement