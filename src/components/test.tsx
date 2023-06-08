import { useForm } from "react-hook-form";
import SingleDatePicker from "./SingleDatePicker";
import { useEffect, useState } from "react";

interface FormState {
  number?: string;
  unit: string;
  dob: string;
}

const Test = () => {
  const form = useForm<FormState>({
    defaultValues: {
      unit: "Day",
      dob: "",
    },
  });

  const dob = form.watch("dob");
  const [isUsingDatePicker, setIsUsingDatePicker] = useState(false);

  useEffect(() => {
    if (dob !== "") {
      setIsUsingDatePicker(true);
    }
  }, [dob]);

  const onSubmit = (data: any) => {
    let body;
    if (isUsingDatePicker) {
      body = {
        dob: data.dob,
      };
      alert(JSON.stringify(body));
    } else {
      body = {
        number: data.number,
        unit: data.unit,
      };
      alert(JSON.stringify(body));
    }
  };

  return (
    <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
      {isUsingDatePicker ? (
        <>
          <div>
            <label className="mr-2 text-gray-400">number</label>
            <input
              disabled
              className=" border border-gray-400 w-10"
              aria-invalid={form.formState.errors.number ? "true" : "false"}
            />
            {form.formState.errors.number?.type === "required" && (
              <p role="alert">Number is required</p>
            )}
          </div>
          <div>
            <label className=" text-gray-400">Day</label>
            <input
              value="Day"
              {...form.register("unit")}
              type="radio"
              disabled
            />
          </div>
          <div>
            <label className=" text-gray-400">Week</label>
            <input
              value="Week"
              {...form.register("unit")}
              type="radio"
              disabled
            />
          </div>
          <div>
            <label className=" text-gray-400">Month</label>
            <input
              value="Month"
              {...form.register("unit")}
              type="radio"
              disabled
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="mr-2">number</label>
            <input
              className=" border border-gray-500 w-10"
              {...form.register("number", { required: true })}
              aria-invalid={form.formState.errors.number ? "true" : "false"}
            />
            {form.formState.errors.number?.type === "required" && (
              <p role="alert">Number is required</p>
            )}
          </div>
          <div>
            <label>Day</label>
            <input value="Day" {...form.register("unit")} type="radio" />
          </div>
          <div>
            <label>Week</label>
            <input value="Week" {...form.register("unit")} type="radio" />
          </div>
          <div>
            <label>Month</label>
            <input value="Month" {...form.register("unit")} type="radio" />
          </div>
        </>
      )}

      {isUsingDatePicker ? (
        <button
          className=" bg-blue-500 ml-5 p-1 rounded-lg text-white disabled:opacity-70 disabled:cursor-not-allowed "
          type="submit"
          disabled={!isUsingDatePicker}
        >
          NEXT
        </button>
      ) : (
        <button
          className=" bg-blue-500 ml-5 p-1 rounded-lg text-white disabled:opacity-70 disabled:cursor-not-allowed "
          type="submit"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          NEXT
        </button>
      )}

      <SingleDatePicker form={form} />
    </form>
  );
};

export default Test;
