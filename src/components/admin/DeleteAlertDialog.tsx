'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/contexts/AppContext";
import { Loader, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function DeleteAlertDialog({ deleteId }: any) {
    
    const { loading, setLoading } = useAppContext();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    
    async function onDelete() {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/organization/remove?organization_id=${deleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'Application/json',
                Authorization: `Bearer ${session?.user?.token}`
            }
        });
        const user = await response.json();
        if (user && response.ok) {
            setLoading(false);
            setOpen(false);
            router.replace('/admin/organizacoes')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive" size="icon"><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
                        conta e removerá seus dados de nossos servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={() => onDelete()}>{loading ? <Loader className="animate-spin" /> : 'Excluir'}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
