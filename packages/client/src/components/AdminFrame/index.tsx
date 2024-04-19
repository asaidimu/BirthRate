import {
    BiSolidDashboard,
    BiSolidFoodMenu,
    BiSolidPizza,
} from "solid-icons/bi";
import breakfast from "../../assets/images/breakfast.svg";
import { A } from "@solidjs/router";
import AdminNavbar from "../AdminNavbar";
import "./styles.css"
export default (props: any) => {
    return (
        <div class="drawer drawer-open">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content overflow-hidden h-screen">
            <AdminNavbar />
            {
                props.children
                }</div>
            <div class="drawer-side w-80">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-64 h-full bg-base-200 text-base-cojtent space-y-4">
                    <div class="py-8">
                        <img src={breakfast} />
                    </div>
                    <li>
                        <A href="/admin/dashboard" class="text-lg text">
                            <BiSolidDashboard class="fill-base-content nav-icon" /> Dashboard
                        </A>
                    </li>
                    <li>
                        <A href="/admin/products" class="text-lg">
                            <BiSolidPizza class="fill-base-content nav-icon" /> Products
                        </A>
                    </li>
                    <li>
                        <A href="/admin/inventory" class="text-lg">
                            <BiSolidPizza class="fill-base-content nav-icon" /> Inventory
                        </A>
                    </li>
                    <li>
                        <A href="/admin/sales" class="text-lg">
                            <BiSolidFoodMenu class="fill-base-content nav-icon" /> Sales
                        </A>
                    </li>
                </ul>
            </div>
        </div>
    );
};
