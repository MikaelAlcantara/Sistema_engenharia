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

interface WorkRegistrationFormPTProps {
  onSuccess: () => void
}

export function WorkRegistrationFormPT({ onSuccess }: WorkRegistrationFormPTProps) {
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
    priority: "media"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.workName || !formData.client || !formData.endDate) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Em aplicação real, isso faria uma chamada API
    console.log("Cadastrando nova obra:", formData)
    toast.success("Obra cadastrada com sucesso!")
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas da Obra */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Básicas da Obra</CardTitle>
          <CardDescription>Detalhes essenciais sobre o projeto de construção</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workName">Nome da Obra *</Label>
              <Input
                id="workName"
                placeholder="ex: Projeto Galpão Industrial"
                value={formData.workName}
                onChange={(e) => handleInputChange("workName", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="ex: Zona Industrial A"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Descrição do Projeto</Label>
            <Textarea
              id="projectDescription"
              placeholder="Descrição detalhada do trabalho de construção..."
              value={formData.projectDescription}
              onChange={(e) => handleInputChange("projectDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Nível de Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Prioridade Baixa</SelectItem>
                  <SelectItem value="media">Prioridade Média</SelectItem>
                  <SelectItem value="alta">Prioridade Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações do Cliente</CardTitle>
          <CardDescription>Detalhes sobre o cliente e informações de contato</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Nome do Cliente *</Label>
            <Input
              id="client"
              placeholder="ex: TechCorp Indústrias"
              value={formData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email do Cliente</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="contato@cliente.com"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Telefone do Cliente</Label>
              <Input
                id="clientPhone"
                placeholder="+55-11-5555-0123"
                value={formData.clientPhone}
                onChange={(e) => handleInputChange("clientPhone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientAddress">Endereço do Cliente</Label>
            <Textarea
              id="clientAddress"
              placeholder="Endereço completo do cliente..."
              value={formData.clientAddress}
              onChange={(e) => handleInputChange("clientAddress", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detalhes de Atribuição */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalhes de Atribuição</CardTitle>
          <CardDescription>Atribuição de equipe e informações de orçamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsibleTeam">Equipe Responsável</Label>
              <Select value={formData.responsibleTeam} onValueChange={(value) => handleInputChange("responsibleTeam", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar equipe..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipe-a">Equipe A - Líder: João Silva</SelectItem>
                  <SelectItem value="equipe-b">Equipe B - Líder: Sarah Johnson</SelectItem>
                  <SelectItem value="equipe-c">Equipe C - Líder: Mike Wilson</SelectItem>
                  <SelectItem value="equipe-d">Equipe D - Líder: Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento Estimado</Label>
              <Input
                id="budget"
                placeholder="ex: R$ 500.000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Botões de Envio */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">
          Cadastrar Obra
        </Button>
      </div>
    </form>
  )
}