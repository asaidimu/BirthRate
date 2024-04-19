import { IoPower } from "solid-icons/io";
import { useApplicationContext } from "../../app/context";
import ThemeChanger from "../../components/ThemeChange";

export default function UserNavigationBar() {
  const { user, app } = useApplicationContext();
  return (
    <div class="z-50">
      <div class="navbar p-4 border-b border-base-300 gap-4">
        <div class="px-2 flex-1">
          <a class="normal-case text-xl">{app.title}</a>
        </div>
        <div class="flex-none gap-4">
          <ThemeChanger />
          <button
            onClick={() => user.signOut()}
            class="h-12 w-12 swap-on flex items-center justify-center"
          >
            <IoPower class="fill-base-content" size="24px" />
          </button>
        </div>
      </div>
    </div>
  );
}
