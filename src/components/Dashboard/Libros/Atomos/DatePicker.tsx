import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import * as React from "react"

interface DatePickerTimeProps {
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DatePickerTime({ value, onChange }: DatePickerTimeProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!date) return


    const day = date.getDate().toString().padStart(2, "0")       // día con 2 dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, "0") // mes +1
    const year = date.getFullYear()


    console.log({ day, month, year })
    const fakeEvent = {
      target: {
        name: "publishedDate",
        value: `${day}/${month}/${year}`,
      },
    } as React.ChangeEvent<HTMLInputElement>

    onChange(fakeEvent)
    setOpen(false)
  }

  const parseDate = (str: string | undefined): Date | undefined => {
    if (!str) return undefined
    const [day, month, year] = str.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  return (
    <FieldGroup className="">
      <Field>
        <FieldLabel htmlFor="date-picker-optional" className="text-primary text-sm font-medium dark:text-gray-400 ">Fecha de publicación</FieldLabel>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="flex items-center gap-2 w-full bg-amber-300">
            <Button
              id="date-picker-optional"
              className="group bg-background text-primary-dark mt-1 w-full rounded-xl border px-3 py-2 focus:outline-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white flex justify-between dark:hover:bg-blue-600 cursor-pointer"
            >
              {value ? value : "Selecciona una fecha"}
              <ChevronDownIcon data-icon="inline-end" className="ml-2 group-focus:rotate-180 transition-transform duration-200 ease-in" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-1 dark:bg-primary-dark dark:text-white border-gray-600"
            align="start" >
            <Calendar
              id="date-picker-optional"
              today={new Date()}
              modifiers={{
                today: new Date(),
              }}
              modifiersClassNames={{
                today: 'bg-blue-500 text-white rounded-full',
              }}
              disabled={{ after: new Date() }}
              mode="single"
              selected={parseDate(value)}
              captionLayout="dropdown"
              defaultMonth={parseDate(value)}
              onSelect={handleSelect}
            />

          </PopoverContent>
        </Popover>
      </Field>
    </FieldGroup >
  )
}
