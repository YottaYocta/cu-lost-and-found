"use client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  HTMLAttributes,
} from "react";
import DatePickerWithRange from "./DateRangePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

export interface SearchComponentProps {
  searchName: string;
  setSearchName: Dispatch<SetStateAction<string>>;
  dateRangeStart: Date;
  setDateRangeStart: Dispatch<SetStateAction<Date>>;
  dateRangeEnd: Date;
  setDateRangeEnd: Dispatch<SetStateAction<Date>>;
  resolved: boolean;
  setResolved: Dispatch<SetStateAction<boolean>>;
  location: string | undefined;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
  useLocation: boolean;
  setUseLocation: Dispatch<SetStateAction<boolean>>;

  onSearchSubmit: () => void;
}

export const ItemSearch = ({
  searchName,
  setSearchName,
  dateRangeStart,
  setDateRangeStart,
  dateRangeEnd,
  setDateRangeEnd,
  resolved,
  setResolved,
  location,
  setLocation,
  useLocation,
  setUseLocation,
  onSearchSubmit,
  className,
}: SearchComponentProps & HTMLAttributes<HTMLDivElement>) => {
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    onSearchSubmit();
  }, [searchName]);

  const handleLocationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      <Input
        placeholder="search for an item"
        value={searchName}
        onChange={handleNameInputChange}
        className="min-w-64"
      ></Input>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-32">filters...</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Card className="flex flex-col p-8 gap-4 m-4">
            <DatePickerWithRange
              dateRangeEnd={dateRangeEnd}
              dateRangeStart={dateRangeStart}
              setDateRangeEnd={setDateRangeEnd}
              setDateRangeStart={setDateRangeStart}
            ></DatePickerWithRange>
            <div className="flex flex-row items-center gap-1">
              <Checkbox
                defaultChecked={resolved}
                onCheckedChange={(checked: boolean) => {
                  setResolved(checked);
                }}
              ></Checkbox>
              <Label>show resolved</Label>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Checkbox
                defaultChecked={useLocation}
                onCheckedChange={(checked: boolean) => {
                  setUseLocation(checked);
                }}
              ></Checkbox>
              <Label>search with location</Label>
            </div>
            <Input
              placeholder="search for a location"
              value={location}
              onChange={handleLocationInputChange}
              disabled={!useLocation}
            ></Input>
            <Button onClick={onSearchSubmit}>Update Search Filters</Button>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
