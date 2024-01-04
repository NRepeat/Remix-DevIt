import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import AccountPage from "~/Layout/AccountPageLayout/AccountPageLayout";
import { customerAuthenticator } from "~/services/auth.server";
import { getResponseError } from "~/services/errorResponse.server";

export function loader({ request }: LoaderFunctionArgs) {
	try {
		const authCustomer = customerAuthenticator.isAuthenticated(request)
		return json({ authCustomer })
	} catch (error) {
		getResponseError(error)
	}
}



export default function () {
	return <AccountPage />
}
