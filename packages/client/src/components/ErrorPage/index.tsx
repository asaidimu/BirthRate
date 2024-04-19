import { For } from "solid-js";

export default ({
  code,
  message,
  asset,
}: {
  code: string;
  message: string | Array<string>;
  asset: string;
}) => {
  const msg = Array.isArray(message) ? message : [message];
  return (
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="w-1/2 flex justify-center">
        <img class="w-[80%]" src={asset} />
      </div>
      <div class="flex flex-col p-4 gap-4">
        <h1 class=" text-center text-9xl">{code}</h1>
        <For each={msg}>
          {(m) => <span class=" text-center text-2xl">{m}</span>}
        </For>
        <div class="p-8 text-center w-full">
            <button
            onClick={() => {
                window.history.back()
            }}
            class="btn btn-primary w-64">Go back</button>
        </div>
      </div>
    </div>
  );
};
