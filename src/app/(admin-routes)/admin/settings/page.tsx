'use client'
import React from 'react'
import { Card, CardFooter } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Building2, Loader, Save } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/contexts/AppContext'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  id: z.string(),
  logo: z.string(),
})

export default async function Configuracoes() {
  // const { loading, setLoading } = useAppContext();
  // const session = await getServerSession(nextAuthOptions);
  // const router = useRouter();

  // const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       logo: "",
  //     },
  //   })

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setLoading(true)
  //   const response = await fetch(`http://localhost:3000/setting/edit?setting_id=${values.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'Application/json',
  //       Authorization: `Bearer ${session?.user?.token}`
  //     },
  //     body: JSON.stringify({
  //       logo: values.logo
  //     })
  //   });
  //   const user = await response.json();

  //   if (user && response.ok) {
  //     setLoading(false);
  //     router.replace('/admin/settings')
  //   }
  // }

  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <Building2 />
          <h1 className='text-2xl font-semibold'>Configurações</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Configurações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        {/* <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center justify-between gap-2">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

              </div>
              <CardFooter className="border-t pt-4">
                <Button type="submit" variant="add" className="cursor-pointer">
                  <Save />{loading ? <Loader className="animate-spin" /> : 'Salvar'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </div> */}
      </Card>
    </section>
  )
}
