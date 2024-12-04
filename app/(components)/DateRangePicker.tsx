"use client";
import {
  HTMLAttributes,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DateSelectionUpdateProps {
  dateRangeStart: Date;
  setDateRangeStart: Dispatch<SetStateAction<Date>>;
  dateRangeEnd: Date;
  setDateRangeEnd: Dispatch<SetStateAction<Date>>;
}

const DatePickerWithRange = ({
  className,
  dateRangeStart,
  setDateRangeStart,
  dateRangeEnd,
  setDateRangeEnd,
}: HTMLAttributes<HTMLDivElement> & DateSelectionUpdateProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dateRangeStart,
    to: dateRangeEnd,
  });

  useEffect(() => {
    if (dateRange !== undefined) {
      setDateRangeStart(dateRange.from as Date);
      if (dateRange.to !== undefined) {
        setDateRangeEnd(dateRange.to as Date);
      } else {
        setDateRangeEnd(new Date());
      }
    }
  }, [dateRange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dateRange"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal h-12",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
