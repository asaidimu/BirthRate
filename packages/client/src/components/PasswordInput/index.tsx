import { BiSolidShow, BiSolidHide } from "solid-icons/bi";

export default function PasswordInput(props: any) {
    return (
        <div class="join">
            <div>
                <div class="join-item">
                    <input  {...props} />
                </div>
                <label class="swap join-item">
                    <input type="checkbox" />
                    <span class="swap-off">
                    <BiSolidShow fill="white" />
                    </span>
                    <span class="swap-on">
                    <BiSolidHide fill="white" />
                    </span>
                </label>
            </div>
        </div>
    );
}
