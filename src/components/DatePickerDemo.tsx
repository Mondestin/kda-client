import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { fr } from 'date-fns/locale'

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

interface DatePickerDemoProps {
  date: string;
  onDateChange: (value: string) => void;
  error?: boolean;
}

export function DatePickerDemo({ date, onDateChange, error }: DatePickerDemoProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date ? new Date(date) : undefined
  )

  // Get today's date at midnight for comparison
  const today = React.useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Function to disable only dates before today (not including today)
  const disabledDays = React.useCallback((date: Date) => {
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }, [today])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-10 pr-4 py-3 text-left font-normal relative h-auto",
            !selectedDate && "text-gray-400",
            error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-red-100",
            "hover:border-gray-400 focus:outline-none focus:ring-2 focus:border-red-500 transition-colors"
          )}
        >
          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          {selectedDate ? (
            format(selectedDate, "PPP", { locale: fr })
          ) : (
            <span>Sélectionner une date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date)
            if (date) {
              onDateChange(date.toISOString().split('T')[0])
            }
          }}
          disabled={disabledDays}
          defaultMonth={today}
          initialFocus
          locale={fr}
          weekStartsOn={1}
          className="rounded-md border shadow-md"
        />
      </PopoverContent>
    </Popover>
  )
}