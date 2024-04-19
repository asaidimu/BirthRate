import { Item, Login, LoginGroup, Order, OrderItem, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const mockGroup = (root?: boolean): LoginGroup => ({
    id: root ? 1 : 2,
    name: root ? "root" : "users",
    createdOn: new Date(),
});

export const mockLogin = (root?: boolean): Login => ({
    id: Number(faker.random.numeric()),
    groups: root ? [1] : [2],
    username: faker.internet.userName(),
    password: faker.internet.password(),
    active: true,
    createdOn: new Date(),
});

export const mockLoginData = ({username, password}: Pick<Login, "username" | "password">,root?: boolean): Login => ({
    id: Number(faker.random.numeric()),
    groups: root ? [1] : [2],
    username,
    password,
    active: true,
    createdOn: new Date(),
});


export const mockUser = (id: number): User => ({
    id: id,
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
});

export const mockUserData = (): Omit<User, "id"> & Pick<Login, "username"|"password"> => ({
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
});

export const mockMenuItem = ():Item => ({
  id: Number(faker.random.numeric()),
  name       : faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price      : Number(faker.commerce.price()),
  image      : faker.image.food(),
  available  : Number(faker.random.numeric()),
  removed    : false,
})

export const mockMenuItemData = ():Omit<Item, "id"> => ({
  name       : faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price      : Number(faker.commerce.price()),
  image      : faker.image.food(),
  available  : Number(faker.random.numeric()),
  removed    : false,
})

export const mockOrderItems = (count: number = 1):{ items:Array<Pick<OrderItem, "quantity"> & Pick<Item, "id">>} => ({
    items: Array.from(Array(count)).map((_, i) => ({
        id: i + 1,
        quantity: 1
    }))
})

export const mockOrder = (total: number, userId: number): Order => ({
  id: Number(faker.random.numeric()),
  time: new Date(),
  total: total !== -1 ? total : Number(faker.commerce.price()),
  userId,
  status: "pending"
})
