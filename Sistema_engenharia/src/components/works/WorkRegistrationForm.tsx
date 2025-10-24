import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface WorkRegistrationFormProps {
  onSuccess: () => void
}

export function WorkRegistrationForm({ onSuccess }: WorkRegistrationFormProps) {
  const [formData, setFormData] = useState({
    workName: "",
    client: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    startDate: "",
    endDate: "",
    responsibleTeam: "",
    projectDescription: "",
    location: "",
    budget: "",
    priority: "medium"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.workName || !formData.client || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    // In real app, this would make an API call
    console.log("Registering new work:", formData)
    toast.success("Work registered successfully!")
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Work Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Work Information</CardTitle>
          <CardDescription>Essential details about the construction project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workName">Work Name *</Label>
              <Input
                id="workName"
                placeholder="e.g., Industrial Warehouse Project"
                value={formData.workName}
                onChange={(e) => handleInputChange("workName", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Industrial Zone A"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea
              id="projectDescription"
              placeholder="Detailed description of the construction work..."
              value={formData.projectDescription}
              onChange={(e) => handleInputChange("projectDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Information</CardTitle>
          <CardDescription>Details about the client and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client Name *</Label>
            <Input
              id="client"
              placeholder="e.g., TechCorp Industries"
              value={formData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="contact@client.com"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                placeholder="+1-555-0123"
                value={formData.clientPhone}
                onChange={(e) => handleInputChange("clientPhone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              placeholder="Full address of the client..."
              value={formData.clientAddress}
              onChange={(e) => handleInputChange("clientAddress", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Team and Budget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment Details</CardTitle>
          <CardDescription>Team assignment and budget information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsibleTeam">Responsible Team</Label>
              <Select value={formData.responsibleTeam} onValueChange={(value) => handleInputChange("responsibleTeam", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-a">Team A - Lead: John Smith</SelectItem>
                  <SelectItem value="team-b">Team B - Lead: Sarah Johnson</SelectItem>
                  <SelectItem value="team-c">Team C - Lead: Mike Wilson</SelectItem>
                  <SelectItem value="team-d">Team D - Lead: Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input
                id="budget"
                placeholder="e.g., $500,000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit">
          Register Work
        </Button>
      </div>
    </form>
  )
}