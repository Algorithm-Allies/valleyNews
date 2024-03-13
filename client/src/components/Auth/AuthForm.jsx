import { Form } from "react-router-dom";
function AuthForm({ children }) {
  return (
    <Form method="post" className="w-full bg-brown-400 p-8 rounded-lg">
      {children}
    </Form>
  );
}

export default AuthForm;
