import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
/* @ts-ignore */
import shop from "../../assets/images/shopping_app.svg";
import { useApplicationContext } from "../../app/context";

export default () => {
    const {user } = useApplicationContext()
    const navigate = useNavigate()
    onMount(async () => {
        const info = await user.getUserInfo()
        if(info) {
            navigate(`/${info.role}/dashboard`)
        } else {
            navigate("/signin")
        }
    })
    return (
        <div class="h-screen w-screen flex items-center justify-center flex-col gap-8 p-8">
            <div class="w-96">
                <img src={shop} />
            </div>
            <span class="loading loading-bars loading-lg"></span>
        </div>
    );
};

