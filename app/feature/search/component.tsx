import { Form, useNavigation } from "@remix-run/react";

export function ErrorElement() {
  const navigation = useNavigation();
  return (
    <div className="p-4 lg:px-0">
      <h1 className="mb-2">Oops.. something went wrong!</h1>
      <Form>
        <button className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-black">
          {navigation.state === "loading" ? "Loading..." : "Try Again"}
        </button>
      </Form>
    </div>
  );
}
