import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Construction } from "lucide-react"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Header */}
      <header className="h-16 flex items-center justify-between border-b bg-card px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="p-2 hover:bg-muted rounded-md" />
          <div className="flex items-center gap-2">
            <Construction className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">MetalWorks Pro</h1>
              <p className="text-xs text-muted-foreground">Sistema de Gestão de Construção Metálica</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Usuário Admin</p>
            <p className="text-xs text-muted-foreground">Gerente Geral</p>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}