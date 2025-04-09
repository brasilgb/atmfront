"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/AppContext";
import { FilePenLine, Loader, Save } from "lucide-react"
import { useSession } from "next-auth/react";
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import * as cnpj from "validation-br/dist/cnpj"
import { isCNPJ } from "validation-br"

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    cnpj: z.string().min(1, { message: 'O CNPJ deve ser preenchido!' }).refine((data) => isCNPJ(data),{message: "O CNPJ deve ser válido!"}),
    status: z.boolean(),
})

export function EditOrganization({org}: any) {
    const { loading, setLoading } = useAppContext();
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: org.name,
            cnpj: org.cnpj,
            status: org.status,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/organization/edit?organization_id=${org.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'Application/json',
                Authorization: `Bearer ${session?.user?.token}`
            },
            body: JSON.stringify({
                name: values?.name,
                cnpj: values?.cnpj,
                status: values.status
            })
        });
        const user = await response.json();

        if (user && response.ok) {
            setLoading(false);
            setOpen(false);
            router.replace('/admin/organizacoes')
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="edit"><FilePenLine /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle>Editar organização</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex items-center justify-between gap-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-full"
                                        >
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="cnpj"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-full"
                                        >
                                            <FormLabel>CNPJ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="CNPJ" {...field} value={cnpj.mask((field.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-full"
                                        >
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Switch 
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <DialogFooter className="border-t pt-4">
                                <Button type="submit" className="cursor-pointer">
                                    <Save />{loading ? <Loader className="animate-spin" /> : 'Salvar'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog >
    )
}