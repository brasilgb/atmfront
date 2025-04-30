import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import ButtonLogout from '../public/ButtonLogout';

export default async function DropDownMenu() {
    const session = await getServerSession(nextAuthOptions);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <User className='h-6 w-6 text-gray-600 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-2 w-48 mt-2 text-gray-600'>
                <DropdownMenuLabel className='flex items-center gap-1'>
                    <User className='h-4 w-4' />
                    <span>{session?.user.name}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <ButtonLogout variant="ghost" icon />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
