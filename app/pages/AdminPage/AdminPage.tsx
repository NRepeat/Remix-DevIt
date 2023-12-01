import { SerializeFrom } from "@remix-run/node"
import { FC } from "react"
import AdminPanel, { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel"

const AdminPage: FC<SerializeFrom<AdminPanelProps>> = ({customers}) => {
  return (
    <AdminPanel customers = {customers}/>
  )
}

export default AdminPage