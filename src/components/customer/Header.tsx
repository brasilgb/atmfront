'use client'
import React from 'react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User } from 'lucide-react'
import ButtonLogout from '../public/ButtonLogout'
import { useAppContext } from '@/contexts/AppContext'

export default function Header() {
    const { user } = useAppContext();
    const pathname = usePathname()
    return (
        <header className='w-full bg-white shadow-md py-1'>
            <div className='container mx-auto flex items-center justify-between'>
                <div>
                    <NavigationMenu orientation="vertical">
                        <NavigationMenuList className='gap-6'>
                            <NavigationMenuItem className='cursor-pointer'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </NavigationMenuItem>

                            <NavigationMenuItem className='cursor-pointer'>
                                <NavigationMenuLink data-active={pathname == '/customer'} asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/customer">
                                        Dashboard
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className='cursor-pointer'>
                                <NavigationMenuLink data-active={pathname == '/customer/invoicing'} asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/customer/invoicing">
                                        Faturamento
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className='z-50'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <User className='h-6 w-6 text-gray-600 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-2 w-48 mt-2 text-gray-600'>
                            <DropdownMenuLabel className='flex items-center gap-1'>
                                <User className='h-4 w-4' />
                                <span>{user?.name}</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <ButtonLogout variant="ghost" icon />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>

    )
}
