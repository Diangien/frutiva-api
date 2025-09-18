import fastify from "fastify";
import { userRoutes } from "./http/routes/users.js";
import { categoriesRoutes } from "./http/routes/category.js";
import { productsRoutes } from "./http/routes/products.js";
import { suppliersRoutes } from "./http/routes/supplier.js";
import { stockRoutes } from "./http/routes/stock.js";

export const app = fastify();

app.register(userRoutes, { prefix: "/users" });
app.register(categoriesRoutes, { prefix: "/categories" });
app.register(productsRoutes, { prefix: "/products" });
app.register(suppliersRoutes, { prefix: "/suppliers" });
app.register(stockRoutes, { prefix: "/stock" });