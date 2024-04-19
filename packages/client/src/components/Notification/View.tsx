import { BiSolidErrorCircle } from "solid-icons/bi";
import { BsInfoCircle } from "solid-icons/bs";
import { FaSolidCircleCheck } from "solid-icons/fa";
import { IoWarning } from "solid-icons/io";
import { For, Match, Switch } from "solid-js";

const NotificationIcon = (props: { level: NotificationLevel }) => {
  return (
    <Switch>
      <Match when={props.level.localeCompare("info") === 0}>
        <BsInfoCircle class="fill-info" />
      </Match>
      <Match when={props.level.localeCompare("success") === 0}>
        <FaSolidCircleCheck class="fill-success" />
      </Match>
      <Match when={props.level.localeCompare("warn") === 0}>
        <IoWarning class="fill-warning" />
      </Match>
      <Match when={props.level.localeCompare("error") === 0}>
        <BiSolidErrorCircle class="fill-error" />
      </Match>
    </Switch>
  );
};

export default function NotificationView(props: {
  notifications: Array<UiNotification>;
}) {
  const Notification = ({ level, message }: UiNotification) => {
    return (
      <div class="alert rounded-md p-0 gap-0">
        <div class={`h-full w-1 bg-${level}`} />
        <div class="p-2 flex items-center gap-2">
          <NotificationIcon level={level} />
          <span>{message}</span>
        </div>
      </div>
    );
  };
  return (
    <div class="toast toast-top toast-start">
      <span class="alert-success alert-error alert-warning alert-info bg-info bg-warning bg-error bg-success hidden" />
      <For each={props.notifications}>{(i) => <Notification {...i} />}</For>
    </div>
  );
}
