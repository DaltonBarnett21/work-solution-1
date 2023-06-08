import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/Form";

import { Input } from "./components/input";
import { useForm } from "react-hook-form";
import { Button } from "./components/button";
import Test from "./components/test";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("This is not a valid email."),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Test />
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className=" font-semibold flex justify-start">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    className=" border-gray-400 rounded-none outline-none"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-500 font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className=" font-semibold flex justify-start">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className=" border-gray-400 rounded-none outline-none"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-500 font-bold" />
              </FormItem>
            )}
          />
          <Button className=" bg-blue-500 text-white font-bold" type="submit">
            Submit
          </Button>
        </form>
      </Form> */}
    </>
  );
}

export default App;
