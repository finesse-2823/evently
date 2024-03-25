"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues = eventDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={(value: string) => console.log(value)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px=4 py-1">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calender"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Event location or online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px=4 py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 49 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.7734 8H34.7734V6C34.7734 5.46957 34.5627 4.96086 34.1877 4.58579C33.8126 4.21071 33.3039 4 32.7734 4C32.243 4 31.7343 4.21071 31.3592 4.58579C30.9842 4.96086 30.7734 5.46957 30.7734 6V8H18.7734V6C18.7734 5.46957 18.5627 4.96086 18.1877 4.58579C17.8126 4.21071 17.3039 4 16.7734 4C16.243 4 15.7343 4.21071 15.3592 4.58579C14.9842 4.96086 14.7734 5.46957 14.7734 6V8H12.7734C11.1821 8 9.65602 8.63214 8.5308 9.75736C7.40558 10.8826 6.77344 12.4087 6.77344 14V38C6.77344 39.5913 7.40558 41.1174 8.5308 42.2426C9.65602 43.3679 11.1821 44 12.7734 44H36.7734C38.3647 44 39.8909 43.3679 41.0161 42.2426C42.1413 41.1174 42.7734 39.5913 42.7734 38V14C42.7734 12.4087 42.1413 10.8826 41.0161 9.75736C39.8909 8.63214 38.3647 8 36.7734 8ZM16.7734 34C16.3779 34 15.9912 33.8827 15.6623 33.6629C15.3334 33.4432 15.0771 33.1308 14.9257 32.7654C14.7743 32.3999 14.7347 31.9978 14.8119 31.6098C14.889 31.2219 15.0795 30.8655 15.3592 30.5858C15.6389 30.3061 15.9953 30.1156 16.3833 30.0384C16.7712 29.9613 17.1734 30.0009 17.5388 30.1522C17.9043 30.3036 18.2166 30.56 18.4364 30.8889C18.6561 31.2178 18.7734 31.6044 18.7734 32C18.7734 32.5304 18.5627 33.0391 18.1877 33.4142C17.8126 33.7893 17.3039 34 16.7734 34ZM32.7734 34H24.7734C24.243 34 23.7343 33.7893 23.3592 33.4142C22.9842 33.0391 22.7734 32.5304 22.7734 32C22.7734 31.4696 22.9842 30.9609 23.3592 30.5858C23.7343 30.2107 24.243 30 24.7734 30H32.7734C33.3039 30 33.8126 30.2107 34.1877 30.5858C34.5627 30.9609 34.7734 31.4696 34.7734 32C34.7734 32.5304 34.5627 33.0391 34.1877 33.4142C33.8126 33.7893 33.3039 34 32.7734 34ZM38.7734 22H10.7734V14C10.7734 13.4696 10.9842 12.9609 11.3592 12.5858C11.7343 12.2107 12.243 12 12.7734 12H14.7734V14C14.7734 14.5304 14.9842 15.0391 15.3592 15.4142C15.7343 15.7893 16.243 16 16.7734 16C17.3039 16 17.8126 15.7893 18.1877 15.4142C18.5627 15.0391 18.7734 14.5304 18.7734 14V12H30.7734V14C30.7734 14.5304 30.9842 15.0391 31.3592 15.4142C31.7343 15.7893 32.243 16 32.7734 16C33.3039 16 33.8126 15.7893 34.1877 15.4142C34.5627 15.0391 34.7734 14.5304 34.7734 14V12H36.7734C37.3039 12 37.8126 12.2107 38.1877 12.5858C38.5627 12.9609 38.7734 13.4696 38.7734 14V22Z"
                        fill="#3f444b"
                      />
                    </svg>

                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px=4 py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 49 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.7734 8H34.7734V6C34.7734 5.46957 34.5627 4.96086 34.1877 4.58579C33.8126 4.21071 33.3039 4 32.7734 4C32.243 4 31.7343 4.21071 31.3592 4.58579C30.9842 4.96086 30.7734 5.46957 30.7734 6V8H18.7734V6C18.7734 5.46957 18.5627 4.96086 18.1877 4.58579C17.8126 4.21071 17.3039 4 16.7734 4C16.243 4 15.7343 4.21071 15.3592 4.58579C14.9842 4.96086 14.7734 5.46957 14.7734 6V8H12.7734C11.1821 8 9.65602 8.63214 8.5308 9.75736C7.40558 10.8826 6.77344 12.4087 6.77344 14V38C6.77344 39.5913 7.40558 41.1174 8.5308 42.2426C9.65602 43.3679 11.1821 44 12.7734 44H36.7734C38.3647 44 39.8909 43.3679 41.0161 42.2426C42.1413 41.1174 42.7734 39.5913 42.7734 38V14C42.7734 12.4087 42.1413 10.8826 41.0161 9.75736C39.8909 8.63214 38.3647 8 36.7734 8ZM16.7734 34C16.3779 34 15.9912 33.8827 15.6623 33.6629C15.3334 33.4432 15.0771 33.1308 14.9257 32.7654C14.7743 32.3999 14.7347 31.9978 14.8119 31.6098C14.889 31.2219 15.0795 30.8655 15.3592 30.5858C15.6389 30.3061 15.9953 30.1156 16.3833 30.0384C16.7712 29.9613 17.1734 30.0009 17.5388 30.1522C17.9043 30.3036 18.2166 30.56 18.4364 30.8889C18.6561 31.2178 18.7734 31.6044 18.7734 32C18.7734 32.5304 18.5627 33.0391 18.1877 33.4142C17.8126 33.7893 17.3039 34 16.7734 34ZM32.7734 34H24.7734C24.243 34 23.7343 33.7893 23.3592 33.4142C22.9842 33.0391 22.7734 32.5304 22.7734 32C22.7734 31.4696 22.9842 30.9609 23.3592 30.5858C23.7343 30.2107 24.243 30 24.7734 30H32.7734C33.3039 30 33.8126 30.2107 34.1877 30.5858C34.5627 30.9609 34.7734 31.4696 34.7734 32C34.7734 32.5304 34.5627 33.0391 34.1877 33.4142C33.8126 33.7893 33.3039 34 32.7734 34ZM38.7734 22H10.7734V14C10.7734 13.4696 10.9842 12.9609 11.3592 12.5858C11.7343 12.2107 12.243 12 12.7734 12H14.7734V14C14.7734 14.5304 14.9842 15.0391 15.3592 15.4142C15.7343 15.7893 16.243 16 16.7734 16C17.3039 16 17.8126 15.7893 18.1877 15.4142C18.5627 15.0391 18.7734 14.5304 18.7734 14V12H30.7734V14C30.7734 14.5304 30.9842 15.0391 31.3592 15.4142C31.7343 15.7893 32.243 16 32.7734 16C33.3039 16 33.8126 15.7893 34.1877 15.4142C34.5627 15.0391 34.7734 14.5304 34.7734 14V12H36.7734C37.3039 12 37.8126 12.2107 38.1877 12.5858C38.5627 12.9609 38.7734 13.4696 38.7734 14V22Z"
                        fill="#3f444b"
                      />
                    </svg>

                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
