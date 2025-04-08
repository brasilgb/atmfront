"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/AppContext";
import { Loader, Plus, Save } from "lucide-react"
import { useSession } from "next-auth/react";
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { isCNPJ } from 'validation-br'
import * as cnpj from 'validation-br/dist/cnpj';

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    cnpj: z.string().refine((data) => isCNPJ(data),{message: 'O CNPJ deve ser válido'}),
    status: z.boolean(),
})

export function CreateOrganization() {
    const { loading, setLoading } = useAppContext();
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cnpj: "",
            status: false,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const response = await fetch('http://localhost:3000/organization', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                Authorization: `Bearer ${session?.user?.token}`
            },
            body: JSON.stringify({
                name: values?.name,
                cnpj: values?.cnpj,
                status: values?.status
            })
        });
        const user = await response.json();

        if (user && response.ok) {
            setLoading(false);
            form.reset()
            setOpen(false);
            router.replace('/admin/organizacoes')
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="add"><Plus />Criar organização</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Criar organização</DialogTitle>
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
                                            <FormLabel>Selecione o Status</FormLabel>
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

                                <Button type="submit" className="cursor-pointer" variant="add">
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