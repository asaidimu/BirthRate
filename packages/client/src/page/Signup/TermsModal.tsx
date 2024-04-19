import { Show, createSignal } from "solid-js";

export default function TermsModal(props: { ref: HTMLDialogElement }) {
    enum Terms {
        TERMS = 1,
        PRIVACY = 2,
    }
    const [selected, setSelected] = createSignal(Terms.TERMS);

    return (
        <dialog id="my_modal_1" class="modal" ref={props.ref}>
            <form method="dialog" class="modal-box max-w-4xl">
                <div class="tabs">
                    <a
                        class="tab tab-bordered tab-active"
                        onClick={() => setSelected(Terms.TERMS)}
                        classList={{ "tab-active": selected() === Terms.TERMS }}
                    >
                        <h3 classList={{ "font-bold text-lg": selected() === Terms.TERMS }}>
                            Terms and Conditions
                        </h3>
                    </a>
                    <a
                        class="tab tab-bordered"
                        onClick={() => setSelected(Terms.PRIVACY)}
                        classList={{ "tab-active": selected() === Terms.PRIVACY }}
                    >
                        <h3
                            classList={{ "font-bold text-lg": selected() === Terms.PRIVACY }}
                        >
                            Privacy Policy
                        </h3>
                    </a>
                </div>
                <div class="p-4 flex flex-col gap-4">
                    <Show when={selected() === Terms.TERMS}>
                        <div>
                            <h2 class="font-bold">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using our food ordering web app, you agree to
                                be bound by these terms and conditions. If you do not agree with
                                any part of these terms, you must refrain from using the app.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">2. Data Collection and Privacy</h2>
                            <p>
                                We may collect certain personal information from users,
                                including but not limited to, name, contact information, and
                                location. All data collected will be handled in accordance with
                                our Privacy Policy.
                            </p>
                            <p>
                                Your data will not be shared publicly but may be used
                                anonymously for market research purposes to improve our
                                services.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">3. Use of the App</h2>
                            <p>
                                Our food ordering web app is intended for personal,
                                non-commercial use only. You may not use the app for any illegal
                                or unauthorized purpose, and you agree to comply with all
                                applicable laws and regulations.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">4. Order and Payment</h2>
                            <p>
                                When placing an order, you agree that all information provided
                                is accurate and complete. Payment for orders must be made
                                through the provided payment options, and you agree to any
                                applicable fees or charges.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">5. Availability and Modifications</h2>
                            <p>
                                We strive to ensure the app's availability at all times, but we
                                do not guarantee uninterrupted access. We may modify, suspend,
                                or discontinue the app or any part of it without prior notice.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">6. Intellectual Property</h2>
                            <p>
                                All intellectual property rights related to the app, including
                                but not limited to trademarks, logos, and content, are owned by
                                us or our licensors. You may not use, reproduce, or distribute
                                any of our intellectual property without our prior written
                                consent.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">7. Limitation of Liability</h2>
                            <p>
                                We shall not be liable for any direct, indirect, incidental,
                                special, or consequential damages arising out of or in
                                connection with the use of the app, including but not limited
                                to, any errors or inaccuracies in the content, any unauthorized
                                access to or use of our servers, or any interruption or
                                cessation of service.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">8. Governing Law and Jurisdiction</h2>
                            <p>
                                These terms and conditions shall be governed by and construed in
                                accordance with the laws of Kenya. Any dispute arising out of or
                                in connection with these terms shall be subject to the exclusive
                                jurisdiction of the Kenyan courts.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">9. Changes to the Terms</h2>
                            <p>
                                We reserve the right to modify or update these terms and
                                conditions at any time without prior notice. It is your
                                responsibility to review these terms periodically for any
                                changes. Continued use of the app after such changes constitutes
                                acceptance of the revised terms.
                            </p>
                        </div>
                    </Show>
                    <Show when={selected() === Terms.PRIVACY}>
                        <div>
                            <h2 class="font-bold">1. Introduction</h2>
                            <p>
                                Thank you for using our food ordering web app. This Privacy
                                Policy explains how we collect, use, disclose, and safeguard
                                your personal information. By accessing and using our app, you
                                consent to the practices described in this Privacy Policy.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">2. Information We Collect</h2>
                            <p>
                                We may collect the following types of personal information from
                                users:
                            </p>
                            <ul>
                                <li>
                                    Name, email address, and contact information provided during
                                    account registration.
                                </li>
                                <li>
                                    Location data, which may be collected through GPS or other
                                    technologies when you use our app.
                                </li>
                                <li>
                                    Order and payment details when you place an order through the
                                    app.
                                </li>
                                <li>
                                    Usage data, including IP address, device type, and browser
                                    information.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="font-bold">3. Use of Your Information</h2>
                            <p>
                                We may use the collected information for the following purposes:
                            </p>
                            <ul>
                                <li>
                                    To provide, maintain, and improve our food ordering services.
                                </li>
                                <li>To process and fulfill your orders and payments.</li>
                                <li>
                                    To communicate with you regarding your orders, updates, and
                                    promotions.
                                </li>
                                <li>
                                    To analyze app usage and trends for market research and
                                    service enhancement.
                                </li>
                                <li>
                                    To respond to your inquiries and provide customer support.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="font-bold">4. Data Sharing</h2>
                            <p>We may share your information with the following entities:</p>
                            <ul>
                                <li>
                                    Third-party service providers who assist us in delivering our
                                    services (e.g., payment processors, delivery partners).
                                </li>
                                <li>
                                    Business partners with whom we may collaborate to offer
                                    promotions or special deals.
                                </li>
                                <li>
                                    Law enforcement agencies or other authorized entities if
                                    required by law or to protect our rights and interests.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="font-bold">5. Data Security</h2>
                            <p>
                                We implement reasonable measures to protect your personal
                                information from unauthorized access, use, or disclosure.
                                However, no method of transmission over the internet or
                                electronic storage is 100% secure, and we cannot guarantee
                                absolute security.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">6. Data Retention</h2>
                            <p>
                                We will retain your personal information for as long as
                                necessary to fulfill the purposes outlined in this Privacy
                                Policy, unless a longer retention period is required or
                                permitted by law.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">7. Children's Privacy</h2>
                            <p>
                                Our app is not intended for use by children under the age of 13.
                                We do not knowingly collect personal information from children.
                                If you are a parent or guardian and believe that your child has
                                provided us with personal information, please contact us, and we
                                will promptly delete the information.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">8. Your Choices</h2>
                            <p>
                                You may have the following choices regarding your personal
                                information:
                            </p>
                            <ul>
                                <li>
                                    You can review and update your account information within the
                                    app.
                                </li>
                                <li>
                                    You can opt-out of receiving promotional emails or
                                    notifications.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="font-bold">9. Changes to the Privacy Policy</h2>
                            <p>
                                We reserve the right to modify or update this Privacy Policy at
                                any time. Changes will be posted on this page with a revised
                                "Last updated" date. Continued use of the app after such changes
                                constitutes acceptance of the revised Privacy Policy.
                            </p>
                        </div>
                    </Show>
                </div>
                <div class="modal-action">
                    <button class="btn">Close</button>
                </div>
            </form>
        </dialog>
    );
}
