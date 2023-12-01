import { Form, Link } from "@remix-run/react";

const CreateCustomerPanel = () => {
  return (
    <>
      Add user
      <Form action={`/admin/customer/action/create`} method="post">
        <input type="text" name="name" required />
        <input type="text" name="secondName" required />
        <input type="text" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Submit</button>
      </Form>
      <Link to={'/admin/customers/'}>Close</Link>
    </>
  );
};

export default CreateCustomerPanel;
