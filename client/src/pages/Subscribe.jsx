import React from "react";
import Mailbox from "../assets/mailbox.png";
import * as RadioGroup from "@radix-ui/react-radio-group";

const FREQUENCY_OPTIONS = ["Hourly", "Daily", "Weekly", "Biweekly", "Monthly"];
const DELIVERY_OPTIONS = ["Email", "SMS"];

export async function action({ request }) {
  let formData = await request.formData();
  let intent = formData.get("intent");
  // add subscription
  if (intent === "add") {
    try {
    } catch (e) {}
  }
  // edit subscription
  if (intent === "edit") {
    try {
    } catch (e) {}
  }
  // remove subscription
  if (intent === "delete") {
    try {
    } catch (e) {}
  }
}

function Subscribe() {
  return (
    <div className="h-screen bg-brown-100 py-20">
      <div className="max-w-4xl w-full mx-auto px-4 md:px-0">
        <div className="md:flex md:gap-8">
          <div className="hidden md:grid bg-brown-200 size-[400px]  place-content-center rounded">
            <img
              className="size-[250px]"
              aria-hidden="true"
              src={Mailbox}
              alt=""
            />
          </div>
          <form className="max-w-96 mx-auto md:flex-1 md:max-w-none">
            <div className="space-y-0.5 mb-6 text-center">
              <h2 className=" text-lg font-bold text-stone-700 text-pretty md:text-2xl ">
                Subscribe to{" "}
                <span className=" text-custom-orange">Central Valley News</span>
              </h2>
              <p className="text-xs text-stone-500 md:text-sm">
                Get the latest news from around the Central Valley!
              </p>
            </div>
            {/* <Unsubscribed /> */}
            <Subscribed />
          </form>
        </div>
      </div>
    </div>
  );
}

function FormOptions({ options, header }) {
  return (
    <div className="space-y-2 text-stone-700">
      <h4 className="font-bold text-xs">{header}</h4>
      <RadioGroup.Root
        className="flex flex-wrap gap-4"
        defaultValue={options[0]}
        aria-label="Subscription Frequency"
        name="frequency"
      >
        {options.map((option, idx) => (
          <div className="flex items-center gap-2">
            <RadioGroup.Item
              id={idx}
              value={option}
              className="bg-white shadow-sm  size-4 rounded-full "
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:size-2 after:rounded-full after:bg-custom-orange" />
            </RadioGroup.Item>
            <label htmlFor={idx} className="text-xs leading-none">
              {option}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
}

function Unsubscribed() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormOptions header="Frequency" options={FREQUENCY_OPTIONS} />
        <FormOptions header="Delivery Method" options={DELIVERY_OPTIONS} />
      </div>
      <button
        name="intent"
        value="add"
        className="block w-1/2 mx-auto text-xs rounded bg-custom-orange text-gray-100 h-8 font-bold hover:bg-orange-400 transition-colors md:h-12 md:text-base"
      >
        Subscribe
      </button>
    </div>
  );
}

function Subscribed() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <FormOptions header="Frequency" options={FREQUENCY_OPTIONS} />
          <FormOptions header="Delivery Method" options={DELIVERY_OPTIONS} />
        </div>
        <button
          name="intent"
          value="edit"
          className="block w-1/2 mx-auto text-xs rounded bg-custom-orange text-gray-100 h-8 font-bold hover:bg-orange-400 transition-colors md:h-12 md:text-base"
        >
          Update
        </button>
      </div>
      <div className="h-[2px] bg-brown-200"></div>
      <div className="space-y-1">
        <p className=" text-xs text-gray-500 md:text-sm">
          No longer want to receive updates from Central Valley News, fell free
          to unsubscribe
        </p>
        <button
          type="submit"
          name="intent"
          value="delete"
          className="block w-1/2 mx-auto rounded text-xs   text-stone-600 h-8 underline md:text-sm"
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
}

export default Subscribe;
