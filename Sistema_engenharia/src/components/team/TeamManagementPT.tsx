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
import { EditableCell } from "@/components/common/EditableCell"
import { toast } from "sonner"

const TeamManagementPT = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // Mock data - em aplicação real viria da API
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "João Silva",
      role: "Líder de Equipe",
      team: "Equipe A",
      email: "joao.silva@metalworks.com",
      phone: "+55-11-5555-0101",
      specialization: "Engenharia Estrutural",
      activeWorks: ["Galpão Industrial Alpha"],
      status: "Ativo",
      workload: "Alta",
      nextDeadline: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Líder de Equipe",
      team: "Equipe B",
      email: "sarah.johnson@metalworks.com",
      phone: "+55-11-5555-0102",
      specialization: "Especialista em Soldagem",
      activeWorks: ["Edifício Comercial Beta"],
      status: "Ativo",
      workload: "Média",
      nextDeadline: "2024-02-20"
    },
    {
      id: 3,
      name: "Mike Wilson",
      role: "Líder de Equipe",
      team: "Equipe C",
      email: "mike.wilson@metalworks.com",
      phone: "+55-11-5555-0103",
      specialization: "Coordenador de Montagem",
      activeWorks: ["Ampliação Fábrica Gamma"],
      status: "Ativo",
      workload: "Alta",
      nextDeadline: "2024-01-30"
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Líder de Equipe",
      team: "Equipe D",
      email: "lisa.chen@metalworks.com",
      phone: "+55-11-5555-0104",
      specialization: "Inspetora de Qualidade",
      activeWorks: ["Complexo Residencial Delta"],
      status: "Ativo",
      workload: "Baixa",
      nextDeadline: "2024-04-15"
    },
    {
      id: 5,
      name: "David Rodriguez",
      role: "Soldador Senior",
      team: "Equipe A",
      email: "david.rodriguez@metalworks.com",
      phone: "+55-11-5555-0105",
      specialization: "Soldagem de Precisão",
      activeWorks: ["Galpão Industrial Alpha"],
      status: "Ativo",
      workload: "Média",
      nextDeadline: "2024-01-15"
    },
    {
      id: 6,
      name: "Emma Thompson",
      role: "Especialista em Montagem",
      team: "Equipe B",
      email: "emma.thompson@metalworks.com",
      phone: "+55-11-5555-0106",
      specialization: "Maquinário Pesado",
      activeWorks: ["Edifício Comercial Beta"],
      status: "De Licença",
      workload: "Nenhuma",
      nextDeadline: "-"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "success"
      case "De Licença": return "warning"
      case "Indisponível": return "destructive"
      default: return "secondary"
    }
  }

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case "Alta": return "destructive"
      case "Média": return "warning"
      case "Baixa": return "success"
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

  const updateMember = (id: number, field: string, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ))
    toast.success("Membro da equipe atualizado!")
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Equipes</h1>
          <p className="text-muted-foreground">Gerencie funcionários, atribuições e distribuição de carga de trabalho</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Membro da Equipe</DialogTitle>
              <DialogDescription>
                Registre um novo colaborador na equipe de construção
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Formulário de cadastro de membro da equipe aqui...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Colaboradores ativos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {teamMembers.filter(m => m.status === "Ativo").length}
            </div>
            <p className="text-xs text-muted-foreground">Atualmente trabalhando</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carga Alta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {teamMembers.filter(m => m.workload === "Alta").length}
            </div>
            <p className="text-xs text-muted-foreground">Necessitam atenção</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-machinery">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Líderes de Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-machinery">
              {teamMembers.filter(m => m.role === "Líder de Equipe").length}
            </div>
            <p className="text-xs text-muted-foreground">Posições de liderança</p>
          </CardContent>
        </Card>
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
                placeholder="Buscar por nome, equipe ou função..."
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
                <SelectItem value="all">Todas as Funções</SelectItem>
                <SelectItem value="Líder de Equipe">Líderes de Equipe</SelectItem>
                <SelectItem value="Soldador Senior">Soldadores Senior</SelectItem>
                <SelectItem value="Especialista em Montagem">Especialistas em Montagem</SelectItem>
                <SelectItem value="Inspetora de Qualidade">Inspetores de Qualidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Membros da Equipe */}
      <Card>
        <CardHeader>
          <CardTitle>Membros da Equipe ({filteredMembers.length})</CardTitle>
          <CardDescription>
            Lista completa dos membros da equipe com atribuições atuais e status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membro</TableHead>
                <TableHead>Função e Equipe</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Obra Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Carga de Trabalho</TableHead>
                <TableHead>Próximo Prazo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <EditableCell
                        value={member.name}
                        onSave={(newValue) => updateMember(member.id, "name", newValue)}
                        placeholder="Nome do membro"
                        className="font-medium text-foreground"
                      />
                      <div className="text-xs text-muted-foreground">
                        <EditableCell
                          value={member.specialization}
                          onSave={(newValue) => updateMember(member.id, "specialization", newValue)}
                          placeholder="Especialização"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <EditableCell
                        value={member.role}
                        onSave={(newValue) => updateMember(member.id, "role", newValue)}
                        placeholder="Função"
                        className="font-medium"
                      />
                      <div className="text-xs text-muted-foreground">
                        <EditableCell
                          value={member.team}
                          onSave={(newValue) => updateMember(member.id, "team", newValue)}
                          placeholder="Nome da equipe"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Mail className="h-3 w-3" />
                        <EditableCell
                          value={member.email.split('@')[0]}
                          onSave={(newValue) => {
                            const domain = member.email.split('@')[1] || "metalworks.com"
                            updateMember(member.id, "email", `${newValue}@${domain}`)
                          }}
                          placeholder="email"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3" />
                        <EditableCell
                          value={member.phone}
                          onSave={(newValue) => updateMember(member.id, "phone", newValue)}
                          placeholder="+55-11-5555-0000"
                        />
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
                        <span className="text-muted-foreground">Nenhuma obra ativa</span>
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
                          <EditableCell
                            value={member.nextDeadline}
                            onSave={(newValue) => updateMember(member.id, "nextDeadline", newValue)}
                            placeholder="YYYY-MM-DD"
                          />
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

      {/* Seção de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Alertas da Equipe
          </CardTitle>
          <CardDescription>Notificações importantes sobre membros da equipe e prazos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium">Alerta de Carga Alta</p>
                <p className="text-xs text-muted-foreground">
                  João Silva e Mike Wilson têm carga alta. Considere redistribuir tarefas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium">Prazo Próximo</p>
                <p className="text-xs text-muted-foreground">
                  Vários membros da equipe têm prazos se aproximando em 5 dias.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamManagementPT