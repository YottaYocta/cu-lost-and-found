"use client";
import { PostType, CreateItemPostRequestData } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AuthenticatedModal,
  AuthenticatedModalProps,
} from "./AuthenticatedModal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAuth } from "./AuthContext";
import { HTMLAttributes } from "react";

const formSchema = z.object({
  itemName: z.string().min(1),
  imageLink: z.optional(z.string().url()),
  contact: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
});

const postItemData = async (createItemPostData: CreateItemPostRequestData) => {
  const res = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createItemPostData),
  });

  if (!res.ok) {
    throw new Error("Network Response Error");
  }
};

interface AddPostModalProps {
  postType: PostType;
}

export const AddPostModal = ({
  modalTriggerText,
  postType,
  className,
}: AuthenticatedModalProps &
  AddPostModalProps &
  HTMLAttributes<HTMLButtonElement>) => {
  const authContext = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      imageLink: "",
      contact: "",
      description: "",
      location: "",
    },
  });

  const onSubmitMissing = async (values: z.infer<typeof formSchema>) => {
    console.log(JSON.stringify(values));
    try {
      if (authContext != null && authContext.user != null) {
        postItemData({
          userName: authContext.user.displayName || "Anonymous",
          userID: authContext.user.uid,
          postType: PostType.MISSING,
          name: values.itemName,
          contact: values.contact,
          description: values.description,
          image: values.imageLink || null,
          location: values.location,
        });
      } else {
        throw new Error("user not logged in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitSighting = async (values: z.infer<typeof formSchema>) => {
    console.log(JSON.stringify(values));
    try {
      if (authContext != null && authContext.user != null) {
        postItemData({
          userName: authContext.user.displayName || "Anonymous",
          userID: authContext.user.uid,
          postType: PostType.SIGHTING,
          name: values.itemName,
          contact: values.contact,
          description: values.description,
          image: values.imageLink || null,
          location: values.location,
        });
      } else {
        throw new Error("user not logged in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthenticatedModal
      className={className}
      modalTriggerText={modalTriggerText}
    >
      {postType === PostType.MISSING ? (
        <Card className="flex flex-col p-8 gap-4">
          <DialogTitle>
            <p className="text-2xl">Share details about what you lost</p>
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitMissing)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>What object did you lose?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your contact information so others can reach out to
                      you if they find your item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      (Optional) a link to an image of what you lost
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief description of what you lost. Helpful information
                      to include could be the brand of the item, the color, and
                      more details on when and where you lost it
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      A location estimate for where you lost your item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
      ) : (
        <Card className="flex flex-col p-8 gap-4">
          <DialogTitle>
            <p className="text-2xl">Tell the community about what you found</p>
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSighting)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>What object did you find?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your contact information so the original owners of
                      the item can reach out to you for more information
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      (Optional) a link to an image of what you found
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief description of the item someone else left behind.
                      Helpful information to include could be the brand of the
                      item, the color, and more details on when and where you
                      found it
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      The location where you found this item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
      )}
    </AuthenticatedModal>
  );
};
