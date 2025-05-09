"use client"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import moment from "moment"
import { useAppContext } from "@/contexts/AppContext"
import { ptBR } from "date-fns/locale"

export function FilterDate() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [calendarOpen, setCalendarOpen] = useState(false);
  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast("Event has been created", {
  //     description: "Sunday, December 03, 2023 at 9:00 AM",
  //     action: {
  //       label: "Undo",
  //       onClick: () => console.log("Undo"),
  //     },
  //   })
  // }

  return (
    <>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? (
              moment(selectedDate).format("DD/MM/YYYY")
            ) : (
              <span>{moment(selectedDate).format("DD/MM/YYYY")}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            onDayClick={() => setCalendarOpen(false)}
            initialFocus
            defaultMonth={selectedDate ? new Date(selectedDate) : new Date()}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}