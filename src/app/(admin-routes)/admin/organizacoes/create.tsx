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
import { Loader } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    cnpj: z.string().min(1, { message: 'O CNPJ deve ser preenchido!' }),
    status: z.string(),
})

export function CreateOrganization() {
    const { loading, setLoading } = useAppContext();

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cnpj: "",
            status: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const response = await fetch('http://localhost:3000/organization', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                name: values?.name,
                cnpj: values?.cnpj,
                status: values.status
            })
        });
        const user = await response.json();

        if(user && response.ok) {
            setLoading(false)
            alert(user);
            router.replace('/admin/organizacao')
        }else{
            alert(user);
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="add">Criar organização</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
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
                                                <Input placeholder="CNPJ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="cursor-pointer">{loading ? <Loader className="animate-spin" /> : 'Salvar'}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog >
    )
}