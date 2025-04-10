'use client'
import { Building, Building2, Home, Settings, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Org",
        url: "/admin/organizations",
        icon: Building2,
    },
    {
        title: "Fil",
        url: "/admin/companies",
        icon: Building,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
    {
        title: "user",
        url: "/admin/users",
        icon: User,
    },
]

export function AppSidebar() {
    const pathname = usePathname();
    const path = pathname.split('/')
    const urlValid = (`/${typeof path[2] === 'undefined' ? path[1] : path[1]+'/'+path[2]}`);
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center">

                <a href="#" className="text-center">
                    <Image width={100} height={50} src="/images/acme.png" alt={"ACME INC"} />
                    <span className="text-base font-semibold">Acme Inc.</span>
                </a>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={urlValid === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}