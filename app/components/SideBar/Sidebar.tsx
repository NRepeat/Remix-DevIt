import {  useRouteLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import Filter from "~/components/Filtr/Filtr"
import { loader } from "~/root"


const Sidebar = () => {

const data = useRouteLoaderData<typeof loader>("root")
invariant(data,"missing data")

  return (
    <div>
      <Filter  categories ={data.cat}/>
    </div>
  )
}

export default Sidebar