import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Building2, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  Camera,
  CheckSquare,
  AlertTriangle,
  Package,
  Wrench
} from "lucide-react"

interface WorkDetailsProps {
  workId: number
}

export function WorkDetails({ workId }: WorkDetailsProps) {
  // Mock data - in real app this would be fetched based on workId
  const workData = {
    id: workId,
    name: "Industrial Warehouse Alpha",
    client: "TechCorp Industries",
    clientInfo: {
      email: "contact@techcorp.com",
      phone: "+1-555-0123",
      address: "123 Industrial Ave, Tech City, TC 12345"
    },
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    responsibleTeam: "Team A - Lead: John Smith",
    status: "In Progress",
    progress: 85,
    location: "Zone A, Industrial Park",
    description: "Construction of a large-scale industrial warehouse with modern automation systems, loading docks, and office facilities."
  }

  // Mock pieces/pillars data
  const pieces = [
    { id: "P001", code: "PILLAR-A1", location: "Section A - North Corner", status: "Completed", type: "Pillar" },
    { id: "P002", code: "BEAM-B2", location: "Section A - Main Span", status: "Mounted", type: "Beam" },
    { id: "P003", code: "PILLAR-A3", location: "Section B - Entry", status: "Delivered", type: "Pillar" },
    { id: "P004", code: "TRUSS-T1", location: "Section C - Roof", status: "In Transit", type: "Truss" },
    { id: "P005", code: "PANEL-W1", location: "Section A - West Wall", status: "Completed", type: "Wall Panel" }
  ]

  // Mock checklist data
  const checklists = [
    { id: 1, item: "Structural integrity check", completed: true, responsible: "John Smith", date: "2024-01-10" },
    { id: 2, item: "Weld quality inspection", completed: true, responsible: "Mike Johnson", date: "2024-01-10" },
    { id: 3, item: "Surface finishing review", completed: false, responsible: "Sarah Wilson", date: "2024-01-12" },
    { id: 4, item: "Safety compliance check", completed: true, responsible: "Lisa Chen", date: "2024-01-09" },
    { id: 5, item: "Final assembly review", completed: false, responsible: "John Smith", date: "2024-01-13" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success"
      case "Mounted": return "default"  
      case "Delivered": return "secondary"
      case "In Transit": return "warning"
      default: return "destructive"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckSquare className="h-4 w-4" />
      case "Mounted": return <Wrench className="h-4 w-4" />
      case "Delivered": return <Package className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{workData.name}</h2>
          <p className="text-muted-foreground">Work ID: #{workData.id}</p>
        </div>
        <Badge variant={getStatusColor(workData.status) as any} className="text-sm">
          {workData.status}
        </Badge>
      </div>

      {/* Basic Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-xs text-muted-foreground">{workData.client}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-machinery" />
              <div>
                <p className="text-sm font-medium">Deadline</p>
                <p className="text-xs text-muted-foreground">{workData.endDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-steel" />
              <div>
                <p className="text-sm font-medium">Team</p>
                <p className="text-xs text-muted-foreground">{workData.responsibleTeam.split(' - ')[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Status</span>
              <span className="font-medium">{workData.progress}%</span>
            </div>
            <Progress value={workData.progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="pieces" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pieces">Pieces & Pillars</TabsTrigger>
          <TabsTrigger value="photos">Assembly Photos</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="client">Client Info</TabsTrigger>
        </TabsList>

        <TabsContent value="pieces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pieces and Pillars</CardTitle>
              <CardDescription>Status of all structural components</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pieces.map((piece) => (
                    <TableRow key={piece.id}>
                      <TableCell className="font-medium">{piece.code}</TableCell>
                      <TableCell>{piece.type}</TableCell>
                      <TableCell>{piece.location}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(piece.status) as any} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(piece.status)}
                          {piece.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Assembly Photos
              </CardTitle>
              <CardDescription>Visual documentation of construction progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Placeholder for photos */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <Button className="mt-4" variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weld and Finish Checklists</CardTitle>
              <CardDescription>Quality control and completion checklists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklists.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox checked={item.completed} />
                    <div className="flex-1">
                      <p className="font-medium">{item.item}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>Responsible: {item.responsible}</span>
                        <span>Date: {item.date}</span>
                      </div>
                    </div>
                    {item.completed && (
                      <CheckSquare className="h-4 w-4 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="client" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Contact details and project information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{workData.clientInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{workData.clientInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{workData.clientInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Project Description</p>
                    <p className="text-sm text-muted-foreground">{workData.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-machinery" />
                    <div>
                      <p className="text-sm font-medium">Work Location</p>
                      <p className="text-sm text-muted-foreground">{workData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}