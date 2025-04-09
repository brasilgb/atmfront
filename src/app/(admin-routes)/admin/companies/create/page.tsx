"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building, Loader, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { formSchema } from '../schema'
import { useAppContext } from '@/contexts/AppContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as cnpj from 'validation-br/dist/cnpj';
import * as postalCode from 'validation-br/dist/postalCode';
import { zipCodeMask } from '@/lib/utils'

export default function CreateCompany() {
  const [organizations, setOrganizations] = useState<any>([])

  const { loading, setLoading } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      corpreason: "",
      organizationId: "",
      cnpj: "",
      subnumber: "",
      subname: "",
      cep: "",
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: "",
      telefone: "",
      status: false,
      whatsapp: "",
      observation: "",
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
        setOrganizations(data);
      });
  }, [session]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
console.log(values);

    setLoading(true)
    const response = await fetch('http://localhost:3000/company', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify({
        altername: values?.altername,
        cnpj: values?.cnpj,
        status: values?.status
      })
    });
    const user = await response.json();

    if (user && response.ok) {
      setLoading(false);
      form.reset()
      router.replace('/admin/organizacoes')
    }
  }


  const handleVCep = ((cep:any) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
  })

  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <Building />
          <h1 className='text-2xl font-semibold'>Filiais</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/companies">Filiais</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="md:grid grid-cols-9 gap-4">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} value={cnpj.mask(field.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="corpreason"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Razão social</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="organizationId"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Organização</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a organização" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizations?.map((organization: any) => (
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
                  name="subname"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Nome filial</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="subnumber"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>N° Filial</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
              <div className="md:grid grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} maxLength={9} value={zipCodeMask(field.value)} onBlurCapture={() => handleVCep(field.value)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Logradouro</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
              <div className="md:grid grid-cols-5 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem
                      className="w-full col-span-2"
                    >
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Whatsapp</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
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
