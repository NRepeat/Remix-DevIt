import {  useParams } from "@remix-run/react"
import ErrorOutofStock from "~/components/ErrorOutofStock/ErrorOutofStock"



const Error = () => {
  const {id} = useParams();
  return (
    <div><ErrorOutofStock error = {id}/></div>
  )
}

export default Error