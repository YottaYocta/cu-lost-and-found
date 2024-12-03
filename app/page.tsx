"use client";
import { AuthProvider } from "./(components)/AuthContext";
import { useState } from "react";
import { ItemSearch } from "./(components)/ItemSearch";
import LoginLogoutButton from "./(components)/LoginLogoutButton";
import ItemList from "./(components)/ItemList";
import { ItemQueryFilters, PostType } from "@/types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [dateRangeStart, setDateRangeStart] = useState<Date>(
    new Date(2024, 10)
  );
  const [dateRangeEnd, setDateRangeEnd] = useState<Date>(new Date());
  const [resolved, setResolved] = useState<boolean>(false);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [useLocation, setUseLocation] = useState<boolean>(false);

  const [itemQuery, setItemQuery] = useState<ItemQueryFilters>({
    name: "",
    postType: PostType.SIGHTING,
    userID: undefined,
    location: undefined,
    dateRangeStart: new Date(2024, 11),
    dateRangeEnd: new Date(),
    resolved: false,
  });

  const onSearchSubmit = () => {
    console.log(name, dateRangeStart, dateRangeEnd, resolved, location);
    setItemQuery({
      name: name,
      postType: PostType.SIGHTING,
      userID: undefined,
      location: useLocation ? location : undefined,
      dateRangeStart: dateRangeStart,
      dateRangeEnd: dateRangeEnd,
      resolved: resolved,
    });
  };

  const handleReportClick = () => {};

  return (
    <div>
      <AuthProvider>
        <div className="w-full p-4 flex flex-row justify-end gap-4">
          <LoginLogoutButton></LoginLogoutButton>
        </div>
        <div className="w-screen flex flex-col items-center justify-center mt-16 mb-16 gap-16 sm:px-2 lg:px-4">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-4xl">Recently Found Items</h1>
            <div className="flex flex-row gap-2">
              <ItemSearch
                searchName={name}
                setSearchName={setName}
                dateRangeStart={dateRangeStart}
                setDateRangeStart={setDateRangeStart}
                dateRangeEnd={dateRangeEnd}
                setDateRangeEnd={setDateRangeEnd}
                resolved={resolved}
                setResolved={setResolved}
                location={location}
                setLocation={setLocation}
                onSearchSubmit={onSearchSubmit}
                className="w-[512px]"
                useLocation={useLocation}
                setUseLocation={setUseLocation}
              ></ItemSearch>
              <Button onClick={handleReportClick}>
                Not Listed? Report a Missing Item
              </Button>
            </div>
          </div>
          <ItemList itemQueryFilters={itemQuery}></ItemList>
        </div>
      </AuthProvider>
    </div>
  );
}
