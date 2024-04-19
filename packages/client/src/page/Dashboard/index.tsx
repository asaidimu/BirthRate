/* @ts-ignore */
import { useApplicationContext } from "../../app/context";
import { on, createEffect, createResource, Show } from "solid-js";
import { createContributionChart, createDailySalesVolumeChart } from "./charts";
import Loader from "../../components/Loader";
import Stats from "./Stats";
import { getFormattedDate } from "../../app/lib/DateUtils";

export default () => {
  const { user, orders } = useApplicationContext();
  let lineGraph!: HTMLCanvasElement;
  let donutGraph!: HTMLCanvasElement;
  const [dailyVolumeData] = createResource(
    async () => await orders.getDailyVolumeData()
  );
  const [info] = createResource(async () => await user.getUserInfo());
  createEffect(
    on(info, () => {
      if (!info.loading) {
        const values = dailyVolumeData();
        if (values) {
          createDailySalesVolumeChart(lineGraph, values);
          createContributionChart(donutGraph, values);
        }
      }
    })
  );

  return (
    <Show when={!info.loading} fallback={<Loader />}>
      <div class="w-full h-full flex flex-col p-2 gap-4">
        <h3 class="p-2">{`${getFormattedDate(new Date())}`}</h3>
        <div class="flex flex-col space-y-4">
          <div class="card bg-base-200 p-4 shadow-xl space-y-4 flex">
            <div class="flex items-center gap-8">
              <div class="stats h-full text-primary-content flex-grow">
                <div class="stat">
                  <div class="stat-title uppercase">Last 7 days' revenue.</div>
                  <div class="stat-value flex justify-center">
                    <div class="w-96 space-y-4">
                      <canvas ref={lineGraph} width="500" height="320" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="stats h-full text-primary-content flex-grow">
                <div class="stat">
                  <div class="stat-title uppercase">Sales Distribution</div>
                  <div class="stat-value flex justify-center">
                    <div class="w-56 space-y-4">
                      <canvas ref={donutGraph} width="500" height="320" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="stats h-full flex-grow">
                <div class="stat flex flex-col gap-4">
                  <div class="stat-title uppercase h-8">Account balance</div>
                  <ul class="stat-value flex flex-col gap-2">
                    <li class="space-y-2">
                      <h6 class="stat-title text-sm uppercase">CASH</h6>
                      <span class="text-xl stat-value">KES 49,400</span>
                    </li>
                    <li class="space-y-2">
                      <h6 class="stat-title text-sm">MPESA</h6>
                      <span class="text-xl stat-value">KES 49,400</span>
                    </li>
                    <li class="space-y-2">
                      <h6 class="stat-title text-xl">TOTAL</h6>
                      <span class="text-2xl">KES 40,400</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
