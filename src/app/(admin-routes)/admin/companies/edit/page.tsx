// EditCompany
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
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { maskCep, maskCnpj, maskPhone } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditCompany() {
  const [organizations, setOrganizations] = useState<any>([])
  const { loading, setLoading } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchid = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      return fetch(`http://localhost:3000/company/show?company_id=${searchid}`, {
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
            corpreason: data?.corpreason,
            cnpj: data?.cnpj,
            subnumber: data?.subnumber,
            subname: data?.subname,
            cep: data?.cep,
            state: data?.state,
            city: data?.city,
            district: data?.district,
            street: data?.street,
            number: data?.number,
            complement: data?.complement,
            telefone: data?.telefone,
            status: data?.status,
            whatsapp: data?.whatsapp,
            observation: data?.observation,
          }
        }) as any;
    },
  }
  )

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
    setLoading(true)
    const response = await fetch(`http://localhost:3000/company/edit?company_id=${searchid}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify({
        organizationId: values.organizationId,
        corpreason: values.corpreason,
        cnpj: values.cnpj,
        subnumber: values.subnumber,
        subname: values.subname,
        cep: values.cep,
        state: values.state,
        city: values.cep,
        district: values.district,
        street: values.street,
        number: values.number,
        complement: values.complement,
        telefone: values.telefone,
        status: values.status,
        whatsapp: values.whatsapp,
        observation: values.observation,
      })
    });
    const user = await response.json();

    if (user && response.ok) {
      setLoading(false);
      router.replace('/admin/companies')
    }
  }


  const handleVCep = ((cep: any) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        form.setValue('state', data.uf);
        form.setValue('city', data.localidade);
        form.setValue('district', data.bairro);
        form.setValue('street', data.logradouro);
        form.setFocus('number');
      });
  });

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
                <BreadcrumbPage>Editar filial</BreadcrumbPage>
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
                        <Input placeholder="" {...field} maxLength={18} value={maskCnpj(field.value)} />
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
                        <Select {...field} onValueChange={field.onChange} >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {organizations!.map((organization: any) => (
                              <SelectItem key={organization.id} value={organization.id}>{organization.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <select {...field} onVolumeChange={field.onChange} value={field.value} 
                        className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full"
                        >
                          {organizations?.map((organization: any) => (
                            <option key={organization.id} value={organization.id}>{organization.name}</option>
                          ))}
                        </select> */}
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
                        <Input placeholder="" {...field} maxLength={9} value={maskCep(field.value)} onBlurCapture={() => handleVCep(field.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>UF</FormLabel>
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

              </div>
              <div className="md:grid grid-cols-5 gap-4">

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
                  name="telefone"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} maxLength={15} value={maskPhone(field.value)} />
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
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
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

