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
import { isCNPJ } from "validation-br"
import { maskCnpj } from "@/lib/utils"

const formSchema = z.object({
  logo: z.instanceof(File, {message: 'Selecione uma imagem.'})
})

export function EditConfiguracoes({ org }: any) {
  const { loading, setLoading } = useAppContext();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("logo", values.logo);
    
    setLoading(true)
    const response = await fetch(`http://localhost:3000/setting/edit?setting_id=${org.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session?.user?.token}`
      },
      body: formData,
    });
    const user = await response.json();

    if (user && response.ok) {
      setLoading(false);
      setOpen(false);
      router.replace('/admin/settings')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="edit"><FilePenLine /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Editar configurações</DialogTitle>
          {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >

              <FormField
                control={form.control}
                name="logo"
                render={({ field: { value, onChange, ...fieldProps} }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="file"  accept="image" {...fieldProps} onChange={(e) => onChange(e.target.files && e.target.files[0]) } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <DialogFooter className="border-t pt-4">
                <Button type="submit" variant="add" className="cursor-pointer">
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