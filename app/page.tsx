"use client";
import { AuthProvider } from "./(components)/AuthContext";
import { useState } from "react";
import { ItemSearch } from "./(components)/ItemSearch";
import LoginLogoutButton from "./(components)/LoginLogoutButton";
import ItemList from "./(components)/ItemList";
import { ItemQueryFilters, PostType } from "@/types";
import { AddPostModal } from "./(components)/AddPostModal";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const onSearchFoundSubmit = () => {
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

  const onSearchMissingSubmit = () => {
    console.log(name, dateRangeStart, dateRangeEnd, resolved, location);
    setItemQuery({
      name: name,
      postType: PostType.MISSING,
      userID: undefined,
      location: useLocation ? location : undefined,
      dateRangeStart: dateRangeStart,
      dateRangeEnd: dateRangeEnd,
      resolved: resolved,
    });
  };
  return (
    <div>
      <AuthProvider>
        <div className="w-full p-4 flex flex-row justify-between gap-4 px-8">
          <div className="w-48">
            <Link href="/">Cornell Lost and Found</Link>
          </div>
          <div className="flex flex-row gap-4">
            <AddPostModal
              modalTriggerText="Report Lost Item"
              postType={PostType.MISSING}
              className="bg-danger hover:bg-danger-hover w-56"
            ></AddPostModal>
            <AddPostModal
              modalTriggerText="Report Lost Item Sighting"
              className="bg-danger hover:bg-danger-hover w-56"
              postType={PostType.SIGHTING}
            ></AddPostModal>
          </div>
          <div>
            <LoginLogoutButton className="w-48"></LoginLogoutButton>
          </div>
        </div>
        <div className="">
          <Tabs
            defaultValue={PostType.MISSING}
            className="w-screen flex flex-col items-center justify-center mt-16 mb-16 gap-8 sm:px-2 lg:px-4"
          >
            <TabsList className="bg-white p-2 gap-2 h-auto">
              <TabsTrigger
                value="missing"
                className="p-4 data-[state=active]:bg-primary data-[state=active]:text-white text-1xl"
              >
                I&apos;M LOOKING FOR SOMETHING I LOST
              </TabsTrigger>
              <TabsTrigger
                value="sightings"
                className="p-4 data-[state=active]:bg-primary data-[state=active]:text-white text-1xl"
              >
                I FOUND A LOST ITEM
              </TabsTrigger>
            </TabsList>
            <TabsContent value="missing">
              <div className="flex flex-col  items-center gap-4">
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
                  onSearchSubmit={onSearchFoundSubmit}
                  className="w-full"
                  useLocation={useLocation}
                  setUseLocation={setUseLocation}
                ></ItemSearch>
                <ItemList itemQueryFilters={itemQuery}></ItemList>
              </div>
            </TabsContent>
            <TabsContent value="sightings">
              <div className="flex flex-col  items-center gap-4">
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
                  onSearchSubmit={onSearchMissingSubmit}
                  className="w-[512px]"
                  useLocation={useLocation}
                  setUseLocation={setUseLocation}
                ></ItemSearch>
                <ItemList itemQueryFilters={itemQuery}></ItemList>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AuthProvider>
    </div>
  );
}
