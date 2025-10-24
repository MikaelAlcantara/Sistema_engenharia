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
import { EditableCell } from "@/components/common/EditableCell"
import { WorkRegistrationFormPT } from "./WorkRegistrationFormPT"
import { WorkDetailsPT } from "./WorkDetailsPT"
import { toast } from "sonner"

const WorksManagementPT = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)

  // Mock data - em aplicação real viria da API
  const [works, setWorks] = useState([
    {
      id: 1,
      name: "Galpão Industrial Alpha",
      client: "TechCorp Indústrias",
      clientInfo: "contato@techcorp.com | +55-11-5555-0123",
      startDate: "2023-11-01",
      endDate: "2024-01-15",
      responsibleTeam: "Equipe A - Líder: João Silva",
      status: "Em Andamento",
      progress: 85,
      location: "Zona A, Parque Industrial"
    },
    {
      id: 2,
      name: "Edifício Comercial Beta",
      client: "Metro Construções",
      clientInfo: "info@metroconstrucoes.com | +55-11-5555-0456",
      startDate: "2023-12-01",
      endDate: "2024-02-20",
      responsibleTeam: "Equipe B - Líder: Sarah Johnson",
      status: "Atrasado",
      progress: 42,
      location: "Centro Comercial"
    },
    {
      id: 3,
      name: "Ampliação Fábrica Gamma",
      client: "Manufacturing Plus",
      clientInfo: "projetos@mfgplus.com | +55-11-5555-0789",
      startDate: "2023-10-15",
      endDate: "2024-01-30",
      responsibleTeam: "Equipe C - Líder: Mike Wilson",
      status: "No Prazo",
      progress: 67,
      location: "Complexo Industrial Oeste"
    },
    {
      id: 4,
      name: "Complexo Residencial Delta",
      client: "Urban Developers",
      clientInfo: "contato@urbandev.com | +55-11-5555-0321",
      startDate: "2024-01-01",
      endDate: "2024-04-15",
      responsibleTeam: "Equipe D - Líder: Lisa Chen",
      status: "Planejamento",
      progress: 15,
      location: "Área de Desenvolvimento Suburbano"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "No Prazo": return "success"
      case "Em Andamento": return "default"
      case "Atrasado": return "destructive"
      case "Planejamento": return "secondary"
      case "Concluído": return "success"
      default: return "warning"
    }
  }

  const filteredWorks = works.filter(work =>
    work.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const updateWork = (id: number, field: string, value: string) => {
    setWorks(works.map(work => 
      work.id === id ? { ...work, [field]: value } : work
    ))
    toast.success("Obra atualizada com sucesso!")
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Obras</h1>
          <p className="text-muted-foreground">Gerencie e monitore todos os projetos de construção</p>
        </div>
        
        <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Nova Obra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Obra</DialogTitle>
              <DialogDescription>
                Adicione um novo projeto de construção ao sistema de gestão
              </DialogDescription>
            </DialogHeader>
            <WorkRegistrationFormPT onSuccess={() => setShowRegistration(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar e Filtrar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar obras por nome ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Obras */}
      <Card>
        <CardHeader>
          <CardTitle>Obras Ativas ({filteredWorks.length})</CardTitle>
          <CardDescription>
            Visão geral de todos os projetos de construção cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Obra</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorks.map((work) => (
                <TableRow key={work.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <EditableCell
                        value={work.name}
                        onSave={(newValue) => updateWork(work.id, "name", newValue)}
                        placeholder="Nome da obra"
                        className="font-medium text-foreground"
                      />
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <EditableCell
                          value={work.location}
                          onSave={(newValue) => updateWork(work.id, "location", newValue)}
                          placeholder="Localização"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <EditableCell
                        value={work.client}
                        onSave={(newValue) => updateWork(work.id, "client", newValue)}
                        placeholder="Nome do cliente"
                        className="font-medium"
                      />
                      <div className="text-xs text-muted-foreground">
                        <EditableCell
                          value={work.clientInfo.split(' | ')[0]}
                          onSave={(newValue) => {
                            const phone = work.clientInfo.split(' | ')[1] || ""
                            updateWork(work.id, "clientInfo", `${newValue} | ${phone}`)
                          }}
                          placeholder="email@cliente.com"
                        />
                      </div>
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
                      <EditableCell
                        value={work.endDate}
                        onSave={(newValue) => updateWork(work.id, "endDate", newValue)}
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <EditableCell
                        value={work.responsibleTeam.split(' - ')[0]}
                        onSave={(newValue) => {
                          const leader = work.responsibleTeam.split(' - ')[1] || ""
                          updateWork(work.id, "responsibleTeam", `${newValue} - ${leader}`)
                        }}
                        placeholder="Nome da equipe"
                      />
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
                          <WorkDetailsPT workId={work.id} />
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

export default WorksManagementPT