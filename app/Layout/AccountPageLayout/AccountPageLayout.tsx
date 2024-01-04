import { Outlet } from '@remix-run/react';
import type { FC } from 'react';
import Sidebar from '~/components/Store/SideBar/SideBar';
import styles from "./styles.module.css";


const links = [{ slug: "myDetails", name: "My Details", path: "/account" }, { slug: "myOrders", name: "My Orders", path: "/account/orders" }, { slug: "settings", name: "Account Settings", path: "/account/settings" }]

const AccountPageLayout: FC = () => {
	// const breadcrumbs = [
	// 	{ label: "Buy", link: "/" },
	// 	{ label: "Something", link: "/" },
	// 	{ label: "Else", link: "/" },
	// ];

	return (
		<section className={styles.section}>
			{/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
			<Sidebar links={links} />
			<Outlet />
		</section>
	)
}

export default AccountPageLayout