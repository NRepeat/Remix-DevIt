import { Outlet, useLocation } from '@remix-run/react';
import type { FC } from 'react';
import Sidebar from '~/components/Store/SideBar/SideBar';
import styles from "./styles.module.css";


const links = [{ slug: "myDetails", name: "My Details", path: "/account" }, { slug: "myOrders", name: "My Orders", path: "/account/orders" }, { slug: "settings", name: "Account Settings", path: "/account/settings" }]

const AccountPageLayout: FC = () => {
	const { pathname } = useLocation()
	const crumbs = pathname.split("/")
	const breadcrumbs = (crumbs: string[]) => {
		const arr: { label: string, link: string }[] = [];

		crumbs.map((crumb, i) => arr.push({ label: crumb, link: crumb }))
		return arr;
	}
	console.log("🚀 ~ file: AccountPageLayout.tsx:13 ~ breadcrumbs ~ breadcrumbs:", breadcrumbs(crumbs))
	return (
		<section className={styles.section}>
			{/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
			<Sidebar links={links} />
			<Outlet />
		</section>
	)
}

export default AccountPageLayout