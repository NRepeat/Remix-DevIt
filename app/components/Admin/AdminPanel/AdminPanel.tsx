import { Form } from "@remix-run/react"


const AdminPanel = () => {
  return (
    <>
      Add user
      <Form action="/admin/customer/create" method="post">
        <input type="text" name="name" />
        <input type="text" name="secondName" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
      Update User
      <Form action="/admin/customer/update" method="post">
        <input type="text" name="name" />
        <input type="text" name="secondName" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
      Get User
      <Form action="/admin/customer/get"  >
        <button type="submit">Submit</button>
      </Form>
      Delete User
      <Form action="/admin/customer/delete ">
        <button type="submit">Submit</button>
      </Form>
    </>

  )
}

export default AdminPanel