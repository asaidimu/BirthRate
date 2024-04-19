interface DailyChartData {
    date: Date,
    total: number
}

type OrderStatus = "pending" | "complete" | "cancelled"

interface Order {
      "id": number,
      "time": Date | string,
      "total": number,
      "status": OrderStatus ,
      "user": string
}


