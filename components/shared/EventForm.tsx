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
import { useUploadThing } from "@/lib/useUploadThing";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues = eventDefaultValues;

  const { startUpload } = useUploadThing('imageUploader')

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
     const uploadedImages = await startUpload(files);
    }

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
        <div className="flex flex-col gap-5 flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px=4 py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 15.7093C17.5 17.0184 17.109 18.1457 16.3269 19.0912C15.5449 20.0367 14.529 20.6207 13.2793 20.8432V23.0893C13.2793 23.2091 13.244 23.3075 13.1732 23.3845C13.1025 23.4615 13.0121 23.5 12.9021 23.5H11.3105C11.2083 23.5 11.1199 23.4594 11.0452 23.3781C10.9706 23.2968 10.9332 23.2005 10.9332 23.0893V20.8432C10.4145 20.7662 9.91344 20.6336 9.43007 20.4453C8.9467 20.2571 8.54782 20.0667 8.23343 19.8742C7.91904 19.6816 7.62823 19.4763 7.361 19.2581C7.09377 19.0399 6.91104 18.8795 6.81279 18.7768C6.71454 18.6741 6.64577 18.5971 6.60647 18.5458C6.47286 18.3661 6.465 18.1907 6.5829 18.0195L7.79722 16.2868C7.85223 16.2013 7.94262 16.1499 8.06838 16.1328C8.18627 16.1157 8.28059 16.1542 8.35132 16.2483L8.3749 16.274C9.26305 17.1211 10.218 17.6559 11.2398 17.8783C11.5306 17.9468 11.8214 17.981 12.1122 17.981C12.7488 17.981 13.3088 17.7971 13.7922 17.4291C14.2756 17.0612 14.5172 16.5392 14.5172 15.8633C14.5172 15.6237 14.4583 15.3969 14.3404 15.183C14.2225 14.9691 14.0909 14.7894 13.9455 14.644C13.8001 14.4985 13.5702 14.3381 13.2558 14.1627C12.9414 13.9873 12.682 13.8504 12.4777 13.752C12.2733 13.6536 11.9589 13.5145 11.5345 13.3348C11.228 13.1979 10.9863 13.091 10.8094 13.014C10.6326 12.9369 10.3909 12.8236 10.0844 12.6738C9.77786 12.5241 9.53224 12.3915 9.34754 12.2759C9.16284 12.1604 8.9408 12.0086 8.68143 11.8203C8.42206 11.6321 8.21182 11.4502 8.05069 11.2748C7.88957 11.0994 7.71862 10.8898 7.53785 10.6459C7.35707 10.4021 7.21756 10.1539 7.11932 9.90151C7.02107 9.64909 6.93855 9.36458 6.87174 9.04799C6.80493 8.7314 6.77153 8.39769 6.77153 8.04688C6.77153 6.86607 7.15665 5.83073 7.9269 4.94085C8.69715 4.05097 9.69926 3.47768 10.9332 3.22098V0.910714C10.9332 0.799479 10.9706 0.703218 11.0452 0.621931C11.1199 0.540644 11.2083 0.5 11.3105 0.5H12.9021C13.0121 0.5 13.1025 0.538504 13.1732 0.615513C13.244 0.692522 13.2793 0.790923 13.2793 0.910714V3.16964C13.7274 3.22098 14.1616 3.31938 14.5821 3.46484C15.0026 3.61031 15.3445 3.75363 15.6078 3.89481C15.8711 4.03599 16.1206 4.19643 16.3564 4.37612C16.5922 4.5558 16.7455 4.67987 16.8162 4.74833C16.8869 4.81678 16.9459 4.87667 16.9931 4.92801C17.1267 5.08203 17.1463 5.24461 17.052 5.41574L16.097 7.28962C16.0342 7.41797 15.9438 7.48642 15.8259 7.49498C15.7159 7.52065 15.6097 7.4907 15.5076 7.40513C15.484 7.37946 15.427 7.32813 15.3366 7.25112C15.2462 7.17411 15.093 7.06073 14.8768 6.91099C14.6607 6.76125 14.4308 6.62435 14.1871 6.50028C13.9435 6.37621 13.6507 6.26497 13.3088 6.16657C12.9669 6.06817 12.6309 6.01897 12.3008 6.01897C11.5541 6.01897 10.945 6.20294 10.4734 6.57087C10.0019 6.9388 9.76607 7.41369 9.76607 7.99554C9.76607 8.21801 9.79947 8.42336 9.86628 8.61161C9.93309 8.79985 10.049 8.9774 10.2141 9.14425C10.3791 9.31111 10.5344 9.45229 10.6798 9.5678C10.8252 9.68332 11.0452 9.81594 11.34 9.96568C11.6347 10.1154 11.8725 10.2309 12.0532 10.3122C12.234 10.3935 12.5091 10.5112 12.8785 10.6652C13.2951 10.8363 13.6134 10.9711 13.8335 11.0695C14.0535 11.1679 14.3522 11.3176 14.7295 11.5187C15.1067 11.7198 15.4034 11.9016 15.6196 12.0642C15.8357 12.2267 16.0794 12.4407 16.3505 12.7059C16.6217 12.9712 16.83 13.2428 16.9754 13.5209C17.1208 13.799 17.2446 14.1263 17.3467 14.5028C17.4489 14.8793 17.5 15.2814 17.5 15.7093Z"
                        fill="#757575"
                      />
                    </svg>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex-item-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed perr-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.288 9.28921L9.28799 13.2892C9.19426 13.3822 9.11986 13.4928 9.06909 13.6146C9.01833 13.7365 8.99219 13.8672 8.99219 13.9992C8.99219 14.1312 9.01833 14.2619 9.06909 14.3838C9.11986 14.5056 9.19426 14.6162 9.28799 14.7092C9.38095 14.8029 9.49155 14.8773 9.61341 14.9281C9.73527 14.9789 9.86597 15.005 9.99799 15.005C10.13 15.005 10.2607 14.9789 10.3826 14.9281C10.5044 14.8773 10.615 14.8029 10.708 14.7092L14.708 10.7092C14.8963 10.5209 15.0021 10.2655 15.0021 9.99921C15.0021 9.73291 14.8963 9.47751 14.708 9.28921C14.5197 9.1009 14.2643 8.99512 13.998 8.99512C13.7317 8.99512 13.4763 9.1009 13.288 9.28921Z"
                        fill="#757575"
                      />
                      <path
                        d="M12.2795 17.3995L10.9995 18.6695C10.281 19.41 9.31498 19.86 8.28583 19.9338C7.25668 20.0076 6.23638 19.6999 5.41954 19.0695C4.98781 18.7138 4.63551 18.2714 4.38538 17.771C4.13526 17.2707 3.99287 16.7234 3.96743 16.1645C3.94198 15.6057 4.03404 15.0477 4.23766 14.5267C4.44128 14.0056 4.75193 13.5331 5.14954 13.1395L6.56954 11.7095C6.66327 11.6166 6.73766 11.506 6.78843 11.3841C6.8392 11.2623 6.86534 11.1316 6.86534 10.9995C6.86534 10.8675 6.8392 10.7368 6.78843 10.615C6.73766 10.4931 6.66327 10.3825 6.56954 10.2895C6.47658 10.1958 6.36598 10.1214 6.24412 10.0707C6.12226 10.0199 5.99155 9.99375 5.85954 9.99375C5.72753 9.99375 5.59682 10.0199 5.47497 10.0707C5.35311 10.1214 5.24251 10.1958 5.14954 10.2895L3.87954 11.5695C2.8097 12.6056 2.15213 13.9946 2.02891 15.4787C1.90569 16.9629 2.3252 18.4413 3.20954 19.6395C3.73442 20.3205 4.39818 20.8819 5.15673 21.2866C5.91528 21.6913 6.75125 21.9299 7.60912 21.9867C8.46699 22.0434 9.32711 21.917 10.1324 21.6157C10.9376 21.3145 11.6695 20.8454 12.2795 20.2395L13.6995 18.8195C13.8878 18.6312 13.9936 18.3759 13.9936 18.1095C13.9936 17.8432 13.8878 17.5879 13.6995 17.3995C13.5112 17.2112 13.2558 17.1055 12.9895 17.1055C12.7232 17.1055 12.4678 17.2112 12.2795 17.3995V17.3995ZM19.6595 3.21955C18.453 2.32601 16.9625 1.90224 15.4664 2.02737C13.9703 2.15251 12.5708 2.818 11.5295 3.89955L10.4495 4.99955C10.3261 5.08929 10.2229 5.20395 10.1466 5.3361C10.0702 5.46826 10.0225 5.61497 10.0065 5.76674C9.99047 5.91851 10.0065 6.07195 10.0535 6.21714C10.1006 6.36232 10.1776 6.49601 10.2795 6.60955C10.3725 6.70328 10.4831 6.77767 10.605 6.82844C10.7268 6.87921 10.8575 6.90535 10.9895 6.90535C11.1216 6.90535 11.2523 6.87921 11.3741 6.82844C11.496 6.77767 11.6066 6.70328 11.6995 6.60955L12.9995 5.29955C13.7141 4.55587 14.679 4.10338 15.7077 4.02951C16.7364 3.95563 17.756 4.26561 18.5695 4.89955C19.0045 5.25535 19.3596 5.6988 19.6117 6.20101C19.8638 6.70322 20.0073 7.25292 20.0328 7.81428C20.0582 8.37564 19.9651 8.93607 19.7595 9.45905C19.554 9.98202 19.2405 10.4558 18.8395 10.8495L17.4195 12.2795C17.3258 12.3725 17.2514 12.4831 17.2006 12.605C17.1499 12.7268 17.1237 12.8575 17.1237 12.9895C17.1237 13.1216 17.1499 13.2523 17.2006 13.3741C17.2514 13.496 17.3258 13.6066 17.4195 13.6995C17.5125 13.7933 17.6231 13.8677 17.745 13.9184C17.8668 13.9692 17.9975 13.9953 18.1295 13.9953C18.2616 13.9953 18.3923 13.9692 18.5141 13.9184C18.636 13.8677 18.7466 13.7933 18.8395 13.6995L20.2595 12.2795C20.8637 11.6697 21.3314 10.9384 21.6316 10.1341C21.9318 9.32982 22.0577 8.47095 22.001 7.61435C21.9443 6.75776 21.7062 5.92299 21.3025 5.16534C20.8989 4.40769 20.3388 3.74445 19.6595 3.21955V3.21955Z"
                        fill="#757575"
                      />
                    </svg>
                    <Input placeholder="" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type}Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
