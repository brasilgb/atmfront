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
import DropDownMenu from './DropDownMenu'
import Link from 'next/link'

export default function Header() {
    return (
        <header className='w-full bg-white shadow-md py-1'>
            <div className='container mx-auto flex items-center justify-between'>
                <NavigationMenu orientation="vertical">
                    <NavigationMenuList className='gap-6'>
                        <NavigationMenuItem className='cursor-pointer'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='cursor-pointer'>
                            <Link href="/customer" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} active>
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='cursor-pointer'>
                            <Link href="/customer/invoicing" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Faturamento
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <DropDownMenu />
            </div>
        </header>

    )
}
