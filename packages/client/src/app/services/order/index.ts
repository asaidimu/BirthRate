// import { RequestHelper } from "../../lib/api";

export default function createOrdersService ({api}:{ api: RequestHelper }) {
    async function getDailyVolumeData() {
        type VolumeData =  { data: Array<DailyChartData>}
        const response:VolumeData = await api.get<VolumeData>("/order/volume/daily") as VolumeData
        if(response) {
            return response.data
        }
    }

    async function getOrdersWith({ status }: { status: OrderStatus}) {
        type OrderData = { orders: Array<Order>}
        const response:OrderData | boolean = await api.get<OrderData>(`/order/${status}`)
        if(response){
            return (response as OrderData).orders
        }
    }

    async function completeOrder({ id }: { id: number}) {
        return await api.put<boolean>("/order", {id, status: "complete"})
    }

    async function cancelOrder({ id }: { id: number}) {
        return await api.put<boolean>("/order", {id, status: "cancelled"})
    }

    async function getOrders() {
        type OrderData = { orders: Array<Order>}
        const response:OrderData | boolean = await api.get<OrderData>(`/order/all`)
        if(response){
            return (response as OrderData).orders
        }
    }

    return  {
        getOrders,
        getDailyVolumeData,
        getOrdersWith,
        completeOrder,
        cancelOrder
    }
}

export type OrdersService = ReturnType<typeof createOrdersService>
