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
import { EditableCell } from "@/components/common/EditableCell"
import { toast } from "sonner"

interface WorkDetailsPTProps {
  workId: number
}

export function WorkDetailsPT({ workId }: WorkDetailsPTProps) {
  // Mock data - em aplicação real seria buscado baseado no workId
  const [workData, setWorkData] = useState({
    id: workId,
    name: "Galpão Industrial Alpha",
    client: "TechCorp Indústrias",
    clientInfo: {
      email: "contato@techcorp.com",
      phone: "+55-11-5555-0123",
      address: "Rua Industrial 123, Cidade Tech, TC 12345"
    },
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    responsibleTeam: "Equipe A - Líder: João Silva",
    status: "Em Andamento",
    progress: 85,
    location: "Zona A, Parque Industrial",
    description: "Construção de galpão industrial de grande escala com sistemas de automação modernos, docas de carregamento e instalações de escritório."
  })

  // Mock dados de peças/pilares
  const [pieces, setPieces] = useState([
    { id: "P001", code: "PILAR-A1", location: "Seção A - Canto Norte", status: "Concluído", type: "Pilar" },
    { id: "P002", code: "VIGA-B2", location: "Seção A - Vão Principal", status: "Montado", type: "Viga" },
    { id: "P003", code: "PILAR-A3", location: "Seção B - Entrada", status: "Entregue", type: "Pilar" },
    { id: "P004", code: "TRELI-T1", location: "Seção C - Telhado", status: "Em Trânsito", type: "Treliça" },
    { id: "P005", code: "PANEL-W1", location: "Seção A - Parede Oeste", status: "Concluído", type: "Painel de Parede" }
  ])

  // Mock dados do checklist
  const [checklists, setChecklists] = useState([
    { id: 1, item: "Verificação de integridade estrutural", completed: true, responsible: "João Silva", date: "2024-01-10" },
    { id: 2, item: "Inspeção de qualidade de solda", completed: true, responsible: "Mike Johnson", date: "2024-01-10" },
    { id: 3, item: "Revisão de acabamento superficial", completed: false, responsible: "Sarah Wilson", date: "2024-01-12" },
    { id: 4, item: "Verificação de conformidade de segurança", completed: true, responsible: "Lisa Chen", date: "2024-01-09" },
    { id: 5, item: "Revisão de montagem final", completed: false, responsible: "João Silva", date: "2024-01-13" }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "success"
      case "Montado": return "default"  
      case "Entregue": return "secondary"
      case "Em Trânsito": return "warning"
      default: return "destructive"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluído": return <CheckSquare className="h-4 w-4" />
      case "Montado": return <Wrench className="h-4 w-4" />
      case "Entregue": return <Package className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const updateWorkData = (field: string, value: string) => {
    setWorkData(prev => ({ ...prev, [field]: value }))
    toast.success("Informação atualizada!")
  }

  const updatePiece = (id: string, field: string, value: string) => {
    setPieces(pieces.map(piece => 
      piece.id === id ? { ...piece, [field]: value } : piece
    ))
    toast.success("Peça atualizada!")
  }

  const toggleChecklistItem = (id: number) => {
    setChecklists(checklists.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
    toast.success("Checklist atualizado!")
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <EditableCell
            value={workData.name}
            onSave={(newValue) => updateWorkData("name", newValue)}
            placeholder="Nome da obra"
            className="text-2xl font-bold text-foreground"
          />
          <p className="text-muted-foreground">ID da Obra: #{workData.id}</p>
        </div>
        <Badge variant={getStatusColor(workData.status) as any} className="text-sm">
          {workData.status}
        </Badge>
      </div>

      {/* Cards de Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Cliente</p>
                <EditableCell
                  value={workData.client}
                  onSave={(newValue) => updateWorkData("client", newValue)}
                  placeholder="Nome do cliente"
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-machinery" />
              <div>
                <p className="text-sm font-medium">Prazo</p>
                <EditableCell
                  value={workData.endDate}
                  onSave={(newValue) => updateWorkData("endDate", newValue)}
                  placeholder="YYYY-MM-DD"
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-steel" />
              <div>
                <p className="text-sm font-medium">Equipe</p>
                <EditableCell
                  value={workData.responsibleTeam.split(' - ')[0]}
                  onSave={(newValue) => {
                    const leader = workData.responsibleTeam.split(' - ')[1] || ""
                    updateWorkData("responsibleTeam", `${newValue} - ${leader}`)
                  }}
                  placeholder="Nome da equipe"
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progresso Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Status de Conclusão</span>
              <span className="font-medium">{workData.progress}%</span>
            </div>
            <Progress value={workData.progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Abas Detalhadas */}
      <Tabs defaultValue="pieces" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pieces">Peças e Pilares</TabsTrigger>
          <TabsTrigger value="photos">Fotos da Montagem</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="client">Info do Cliente</TabsTrigger>
        </TabsList>

        <TabsContent value="pieces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peças e Pilares</CardTitle>
              <CardDescription>Status de todos os componentes estruturais</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pieces.map((piece) => (
                    <TableRow key={piece.id}>
                      <TableCell>
                        <EditableCell
                          value={piece.code}
                          onSave={(newValue) => updatePiece(piece.id, "code", newValue)}
                          placeholder="Código da peça"
                          className="font-medium"
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          value={piece.type}
                          onSave={(newValue) => updatePiece(piece.id, "type", newValue)}
                          placeholder="Tipo da peça"
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          value={piece.location}
                          onSave={(newValue) => updatePiece(piece.id, "location", newValue)}
                          placeholder="Localização"
                        />
                      </TableCell>
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
                Fotos da Montagem
              </CardTitle>
              <CardDescription>Documentação visual do progresso da construção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Placeholder para fotos */}
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
                Carregar Fotos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Checklists de Solda e Acabamento</CardTitle>
              <CardDescription>Checklists de controle de qualidade e conclusão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklists.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox 
                      checked={item.completed} 
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.item}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>Responsável: {item.responsible}</span>
                        <span>Data: {item.date}</span>
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
              <CardTitle>Informações do Cliente</CardTitle>
              <CardDescription>Detalhes de contato e informações do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <EditableCell
                        value={workData.clientInfo.email}
                        onSave={(newValue) => updateWorkData("clientInfo", { ...workData.clientInfo, email: newValue } as any)}
                        placeholder="email@cliente.com"
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <EditableCell
                        value={workData.clientInfo.phone}
                        onSave={(newValue) => updateWorkData("clientInfo", { ...workData.clientInfo, phone: newValue } as any)}
                        placeholder="+55-11-5555-0123"
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">Endereço</p>
                      <EditableCell
                        value={workData.clientInfo.address}
                        onSave={(newValue) => updateWorkData("clientInfo", { ...workData.clientInfo, address: newValue } as any)}
                        placeholder="Endereço completo"
                        className="text-sm text-muted-foreground"
                        multiline={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Descrição do Projeto</p>
                    <EditableCell
                      value={workData.description}
                      onSave={(newValue) => updateWorkData("description", newValue)}
                      placeholder="Descrição detalhada do projeto"
                      className="text-sm text-muted-foreground"
                      multiline={true}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-machinery" />
                    <div>
                      <p className="text-sm font-medium">Localização da Obra</p>
                      <EditableCell
                        value={workData.location}
                        onSave={(newValue) => updateWorkData("location", newValue)}
                        placeholder="Local da obra"
                        className="text-sm text-muted-foreground"
                      />
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