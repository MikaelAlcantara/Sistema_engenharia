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

const DashboardPT = () => {
  // Mock data - em aplicação real viria da API
  const stats = {
    activeWorks: 12,
    completedWorks: 45,
    totalTeamMembers: 28,
    pendingAlerts: 5
  }

  const activeWorks = [
    {
      id: 1,
      name: "Galpão Industrial Alpha",
      client: "TechCorp Indústrias",
      progress: 85,
      status: "No Prazo",
      deadline: "2024-01-15",
      team: "Equipe A"
    },
    {
      id: 2,
      name: "Edifício Comercial Beta",
      client: "Metro Construções",
      progress: 42,
      status: "Atrasado",
      deadline: "2024-02-20",
      team: "Equipe B"
    },
    {
      id: 3,
      name: "Ampliação Fábrica Gamma",
      client: "Manufacturing Plus",
      progress: 67,
      status: "No Prazo",
      deadline: "2024-01-30",
      team: "Equipe C"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "No Prazo": return "success"
      case "Atrasado": return "destructive"
      case "Concluído": return "secondary"
      default: return "warning"
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Painel Geral</h1>
        <p className="text-muted-foreground">Visão geral de todas as atividades de gestão de construção</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obras Ativas</CardTitle>
            <HardHat className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.activeWorks}</div>
            <p className="text-xs text-muted-foreground">Atualmente em progresso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obras Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completedWorks}</div>
            <p className="text-xs text-muted-foreground">Finalizadas com sucesso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-machinery">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membros da Equipe</CardTitle>
            <Users className="h-4 w-4 text-machinery" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-machinery">{stats.totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground">Colaboradores ativos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingAlerts}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Visão Geral das Obras Ativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Visão Geral das Obras Ativas
          </CardTitle>
          <CardDescription>
            Status atual e progresso dos projetos de construção em andamento
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
                      Prazo: {work.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {work.team}
                    </span>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium">{work.progress}%</span>
                  </div>
                  <Progress value={work.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Métricas de Performance
            </CardTitle>
            <CardDescription>
              Visualizar análises detalhadas e relatórios de progresso
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-machinery">
              <Wrench className="h-5 w-5" />
              Status dos Equipamentos
            </CardTitle>
            <CardDescription>
              Monitorar disponibilidade de máquinas e equipamentos
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPT