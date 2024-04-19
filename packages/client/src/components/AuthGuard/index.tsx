import { useNavigate } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";
import { useApplicationContext } from "../../app/context";
import "./styles.css";

export const AuthGuard = (props:{role: UserRole}) => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = createSignal(false);
    const { user } = useApplicationContext();
    let modal!: HTMLDialogElement;

    const requestSignIn = () => {
        modal.close();
        navigate("/signin");
    };

    onMount(async () => {
        const hasSession = await user.isAuthorized(props);
        if (!hasSession) {
            modal.showModal();
        } else {
            modal.close();
            setAuthorized(true);
        }
    });

    return (
        <>
            <Show when={! authorized()}>
                <div class="w-screen h-screen fixed bg-base-100 top-0 left-0 z-50" />
            </Show>
            <dialog ref={modal} class="modal redirect">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Authentication Required!</h3>
                    <p class="py-4">Hello, you are not signed in at the moment. <br/> Click OK and you we'll redirect you to the sign in page.</p>
                    <div class="modal-action">
                        <button class="btn btn-success" onClick={() => requestSignIn()}>
                            OK
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};
