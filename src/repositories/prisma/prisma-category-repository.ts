import { Category, Prisma } from "generated/prisma";

import { prisma } from "@/lib/prisma";
import { CategoriesRepository } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({ data });
    return category;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async list(page: number) {
    const categories = await prisma.category.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });

    return categories;
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({ where: { name: name } });

    return category;
  }
}
