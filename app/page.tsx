"use client";
import { AuthProvider } from "./(components)/AuthContext";
import { useState } from "react";
import { ItemSearch } from "./(components)/ItemSearch";
import LoginLogoutButton from "./(components)/LoginLogoutButton";
import ItemList from "./(components)/ItemList";
import { ItemQueryFilters, PostType } from "@/types";
import { AddPostModal } from "./(components)/AddPostModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthenticatedModal } from "./(components)/AuthenticatedModal";
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
          <div>
            <Link href="/">Cornell Lost and Found</Link>
          </div>
          <div className="flex flex-row gap-4">
            <AddPostModal
              modalTriggerText="Report Lost Item"
              postType={PostType.MISSING}
            ></AddPostModal>
            <AddPostModal
              modalTriggerText="Report Lost Item Sighting"
              postType={PostType.SIGHTING}
            ></AddPostModal>
            <AuthenticatedModal modalTriggerText="My Posts"></AuthenticatedModal>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Link href="/about">About</Link>
            <LoginLogoutButton></LoginLogoutButton>
          </div>
        </div>
        <div className="">
          <Tabs className="w-screen flex flex-col items-center justify-center mt-16 mb-16 gap-16 sm:px-2 lg:px-4">
            <TabsList>
              <TabsTrigger value="missing">missing</TabsTrigger>
              <TabsTrigger value="sightings">sightings</TabsTrigger>
            </TabsList>
            <TabsContent value="missing">
              <div className="flex flex-col gap-8 items-center">
                <h1 className="text-4xl">Recently Found Items</h1>
                <div className="flex flex-col gap-2">
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
                    className="w-[512px]"
                    useLocation={useLocation}
                    setUseLocation={setUseLocation}
                  ></ItemSearch>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sightings">
              <div className="flex flex-col gap-8 items-center">
                <h1 className="text-4xl">Recent Missing Item Posts</h1>
                <div className="flex flex-col gap-2 items-center">
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
                </div>
              </div>
            </TabsContent>
            <ItemList itemQueryFilters={itemQuery}></ItemList>
          </Tabs>
        </div>
      </AuthProvider>
    </div>
  );
}
