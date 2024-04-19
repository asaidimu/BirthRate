import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { useNavigate } from "@solidjs/router";
import { z } from "zod";
import { useApplicationContext } from "../../app/context";
/* @ts-ignore */
import signUpImage from "../../assets/images/sign_up.svg";
import { Show, onMount } from "solid-js";
import TermsModal from "./TermsModal";

export default () => {
    const { user } = useApplicationContext();
    const navigate = useNavigate();
    let modal!: HTMLDialogElement;

    /* @ts-ignore */
    const { form, errors } = createForm({
        extend: validator({
            schema: z
                .object({
                    firstName: z.string().min(2),
                    lastName: z.string().min(2),
                    username: z.string().min(3),
                    email: z.string().email(),
                    password: z.string().min(8),
                    altPassword: z.string().min(8),
                    terms: z.literal(true)
                })
                .refine(
                    ({ password, altPassword }) =>
                        password.localeCompare(altPassword) == 0,
                    { path: ["passwords"], message: "Passwords must match" }
                ),
        }),
        onSubmit: async (values) => {
            const { firstName, lastName, username, password, email } = values;
            const fullName = `${firstName} ${lastName}`;
            const created = await user.signUp({
                fullName,
                username,
                password,
                email,
            });
            if (created) {
                navigate("/");
            }
        },
    });

    const hasError = (key: string) => {
        const error = errors()[key];
        const result = error !== null && error !== undefined;
        return result
    };

    const getError = (key: string) => {
        const error = errors()[key];
        let result = null;
        if (Array.isArray(error) && error[0]) {
            result = error[0].replace("String", "Value");
        }
        return result;
    };

    return (
        <div class="flex gap-4 items-center h-screen">
            <div class="w-1/2 flex justify-center">
                <img class="w-[80%]" src={signUpImage} />
            </div>

            <div>
                <div class="flex flex-col space-y-4">
                    <h1 class="text-5xl">Welcome Aboard</h1>
                    <span>Fill out this form to get started</span>
                </div>
                <form class="flex flex-col gap-4 py-4" use:form>
                    <div class="flex gap-4">
                        <div class="form-control w-full max-w-xs">
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                classList={{
                                    "input-error": hasError("firstName"),
                                }}
                                class="input input-bordered w-full max-w-xs"
                            />
                            <label class="label">
                                <Show when={hasError("firstName")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError("firstName")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                classList={{
                                    "input-error": hasError("lastName"),
                                }}
                                class="input input-bordered w-full max-w-xs"
                            />
                            <label class="label">
                                <Show when={hasError("lastName")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError("lastName")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="form-control w-full max-w-xs">
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                classList={{
                                    "input-error": hasError("username"),
                                }}
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
                                name="email"
                                type="text"
                                placeholder="Email Address"
                                classList={{ "input-error": hasError("email") }}
                                class="input input-bordered w-full max-w-xs"
                            />
                            <label class="label">
                                <Show when={hasError("email")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError("email")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="form-control w-full max-w-xs">
                            <input
                                new-password
                                name="password"
                                type="password"
                                placeholder="Password"
                                classList={{
                                    "input-error": hasError("password") || hasError("passwords"),
                                }}
                                class="input input-bordered w-full max-w-xs"
                            />
                            <label class="label">
                                <Show when={hasError("password") || hasError("passwords")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError("password") !== null
                                            ? getError("password")
                                            : getError("passwords")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <input
                                new-password
                                name="altPassword"
                                type="password"
                                placeholder="Enter password again"
                                classList={{
                                    "input-error":
                                        hasError("altPassword") || hasError("passwords"),
                                }}
                                class="input input-bordered w-full max-w-xs"
                            />
                            <label class="label">
                                <Show when={hasError("altPassword") || hasError("passwords")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError("altPassword") !== null
                                            ? getError("altPassword")
                                            : getError("passwords")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                    </div>
                    <div class="form-control w-full">
                        <div>
                            <div class="flex flex-wrap gap-4 content-center">
                                <input
                                    name="terms"
                                    type="checkbox"
                                    classList={{
                                        "checkbox-error": hasError("terms"),
                                    }}
                                    class="checkbox"
                                />
                                <span class="text-sm">
                                    {" "}
                                    I agree to the{" "}
                                    <a
                                        onClick={() => modal.showModal()}
                                        class="link link-info link-hover"
                                    >
                                        Terms and Conditions
                                    </a>
                                </span>
                            </div>
                            <Show when={hasError("terms")}>
                                <span class="label-text-alt text-error font-bold">
                                You must read and agree to the terms and conditions.
                                </span>
                            </Show>
                        </div>
                    </div>
                    <button class="btn btn-primary">Sign Up</button>
                </form>
                <TermsModal ref={modal} />
            </div>
        </div>
    );
};
