"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building, Loader, Save, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { formSchema } from '../schema'
import { useAppContext } from '@/contexts/AppContext'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { formSchemaEdit } from '../schemaedit'

export default function CreateUser() {
  const [organizations, setOrganization] = useState<any>([])

  const { loading, setLoading } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchid = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchemaEdit>>({
    resolver: zodResolver(formSchemaEdit),
    defaultValues: async () => {
      return fetch(`http://localhost:3000/user/show?user_id=${searchid}`, {
        method: 'GET',
        headers: {
          'Content-type': 'Application/json',
          Authorization: `Bearer ${session?.user?.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          return {
            organizationId: data?.organizationId,
            name: data?.name,
            email: data?.email,
            is_admin: data?.is_admin,
            status: data?.status,
            roles: data?.roles
          }
        }) as any;
    },
  })

  useEffect(() => {
    fetch('http://localhost:3000/organization/all', {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${session?.user?.token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrganization(data);
      });
  }, [session]);

  async function onSubmit(values: z.infer<typeof formSchemaEdit>) {

    setLoading(true)
    const response = await fetch(`http://localhost:3000/user/edit?user_id=${searchid}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify({
        organizationId: values.organizationId,
        name: values.name,
        email: values.email,
        password: values.password,
        status: values.status,
        is_admin: values.is_admin,
        roles: ""
      })
    });
    const user = await response.json();

    if (user && response.ok) {
      setLoading(false);
      form.reset()
      router.replace('/admin/users')
    }
  }
  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <User />
          <h1 className='text-2xl font-semibold'>Usuários</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/companies">Usuários</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Criar usuário</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="md:grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="organizationId"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Organização</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a organização" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizations||[]?.map((organization: any) => (
                              <SelectItem key={organization.id} value={organization.id}>{organization.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              <div className="md:grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                <FormField
                  control={form.control}
                  name="retype_password"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Repita a senha</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              <div className="md:grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="is_admin"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Administrador Geral</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
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

                {/* <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Função do Cliente</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a função" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="user">Usuário</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} /> */}
              </div>
              <CardFooter className='flex justify-end px-0'>
                <Button type="submit" className="cursor-pointer" variant="add">
                  <Save />{loading ? <Loader className="animate-spin" /> : 'Salvar'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
