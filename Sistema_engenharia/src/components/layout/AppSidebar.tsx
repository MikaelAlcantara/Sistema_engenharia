import { useState } from "react"
import { 
  LayoutDashboard, 
  HardHat, 
  Users, 
  FileText, 
  Bell, 
  Settings,
  Wrench,
  BarChart3,
  Calendar,
  AlertTriangle
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { 
    title: "Painel Geral", 
    url: "/", 
    icon: LayoutDashboard,
    description: "Visão Geral e Análises"
  },
  { 
    title: "Gestão de Obras", 
    url: "/works", 
    icon: HardHat,
    description: "Projetos Ativos"
  },
  { 
    title: "Gestão de Equipes", 
    url: "/team", 
    icon: Users,
    description: "Pessoal e Atribuições"
  },
  { 
    title: "Relatórios", 
    url: "/reports", 
    icon: FileText,
    description: "Progresso e Análises"
  },
  { 
    title: "Alertas", 
    url: "/alerts", 
    icon: Bell,
    description: "Notificações e Avisos"
  },
]

const toolsItems = [
  { 
    title: "Equipamentos", 
    url: "/equipment", 
    icon: Wrench,
    description: "Status de Máquinas"
  },
  { 
    title: "Análises", 
    url: "/analytics", 
    icon: BarChart3,
    description: "Métricas de Performance"
  },
  { 
    title: "Cronograma", 
    url: "/schedule", 
    icon: Calendar,
    description: "Timeline do Projeto"
  },
]

const settingsItems = [
  { 
    title: "Configurações", 
    url: "/settings", 
    icon: Settings,
    description: "Configuração do Sistema"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary-dark" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }

  const renderMenuItems = (items: typeof navigationItems) => (
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild className="h-12">
          <NavLink to={item.url} className={getNavClassName(item.url)}>
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && (
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs opacity-75">{item.description}</span>
              </div>
            )}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))
  )

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold mb-2">
            {!isCollapsed && "Navegação Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {renderMenuItems(navigationItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-machinery font-semibold mb-2">
            {!isCollapsed && "Ferramentas e Análises"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {renderMenuItems(toolsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-steel font-semibold mb-2">
            {!isCollapsed && "Sistema"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {renderMenuItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}