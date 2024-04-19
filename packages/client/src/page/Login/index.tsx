import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { useNavigate } from "@solidjs/router";
import { LoginCredentials } from "@syllogi/validator";
import { Show, createSignal } from "solid-js";
import { ZodSchema } from "zod";
import { useApplicationContext } from "../../app/context";
import groceries from "../../assets/images/groceries.svg";
import { A } from "@solidjs/router";

export default () => {
    let formRef!: HTMLFormElement;
    const [serverError, setServerError] = createSignal(false);
    const { user } = useApplicationContext();
    const navigate = useNavigate();
    const { form, errors, isValid, isSubmitting, validate } = createForm({
        extend: validator({ schema: LoginCredentials as ZodSchema }),
        onSubmit: async (values: LoginCredentials) => {
            setServerError(false);
            const session = await user.signIn(values);
            if (session) {
                navigate("/");
            } else {
                setServerError(true);
            }
        },
    });

    const hasError = (key: string) => {
        const error = errors()[key];
        return error !== null;
    };

    const getError = (key: string) => {
        const error = errors()[key];
        let result = "";
        if (Array.isArray(error) && error[0]) {
            result = error[0];
        }
        return result;
    };
    return (
        <div class="flex gap-4 items-center h-screen">
            <div class="w-1/2 flex justify-center">
                <img class="w-[80%]" src={groceries} />
            </div>
            <form class="flex flex-col gap-4 p-4 w-80" use:form>
                <div class="space-y-4">
                    <h1 class="font-bold text-4xl">Welcome Back!</h1>
                    <p>Please Sign in to gain access.</p>
                    <Show when={serverError()}>
                        <p class="text-error font-bold">
                            Invalid username or password!
                        </p>
                    </Show>
                </div>
                <div class="form-control w-full max-w-xs">
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        classList={{ "input-error": hasError("username") }}
                        class="input input-bordered w-full max-w-xs"
                    />
                    <label class="label">
                        <Show when={hasError("username")}>
                            <span class="label-text-alt text-error font-bold">
                                {getError("username")}
                            </span>
                        </Show>
                    </label>
                </div>
                <div class="form-control w-full max-w-xs">
                    <input
                        current-password
                        name="password"
                        type="password"
                        placeholder="Password"
                        classList={{ "input-error": hasError("password") }}
                        class="input input-bordered w-full max-w-xs"
                    />
                    <label class="label">
                        <Show when={hasError("password")}>
                            <span class="label-text-alt text-error font-bold">
                                {getError("password")}
                            </span>
                        </Show>
                    </label>
                </div>
                <button class="btn btn-primary">
                    <Show
                        when={!isSubmitting()}
                        fallback={() => (
                            <span class="loading loading-bars loading-xs"></span>
                        )}
                    >
                        Sign In
                    </Show>
                </button>
                <a href="" class="w-full text-center link link-info link-hover">
                    {" "}
                    Forgot Password ?{" "}
                </a>
                <span class="text-sm text-center">
                    {" "}
                    Don't have an account?{" "}
                    <A href="/signup" class="link link-info link-hover">
                        Sign up
                    </A>
                </span>
            </form>
        </div>
    );
};
