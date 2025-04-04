"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/AppContext"
import { Loader } from "lucide-react"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "A senha deve conter no mínimo 6 caracteres.",
  }),
})

export default function Login() {
  const {loading, setLoading} = useAppContext();
  
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const result = await signIn('credentials', {
      email: values?.email,
      password: values?.password,
      redirect: false
    });

    if (result?.error) {
      console.log(result);
      return
    }

    if(result){
      setLoading(false)
    }
    router.replace('/admin')
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bem vindo</CardTitle>
        <CardDescription>
        Digite seu e-mail e senha para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <Button type="submit" className="w-full cursor-pointer">{loading?<Loader className="animate-spin" />:'Entrar'}</Button>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter className="flex justify-between">

      </CardFooter> */}
    </Card>

  )
}
