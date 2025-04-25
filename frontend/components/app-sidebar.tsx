"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  MapPinned,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  Ticket,
  Settings2,
  Store,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Expositores",
      url: "#",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Sex Machine",
          url: "#",
        },
        {
          title: "Nasty",
          url: "#",
        },
        {
          title: "Brechó da Mari",
          url: "#",
        },
      ],
    },
    {
      title: "Locais",
      url: "#",
      icon: MapPinned,
      items: [
        {
          title: "Restaurante Beirute",
          url: "#",
        },
        {
          title: "Conique",
          url: "#",
        },
        {
          title: "Galeria de Arte",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  evento: [
    {
      name: "Sobre o evento",
      url: "#",
      icon: BookOpen,
    },
    {
      name: "Ingressos",
      url: "#",
      icon: Ticket,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects evento={data.evento} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
