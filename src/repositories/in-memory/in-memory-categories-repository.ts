import { Prisma, Category } from "generated/prisma";
import { CategoriesRepository, CategoryUpdateInput } from "../categories-repository";

export class InMemoryCategorysRepository implements CategoriesRepository {
  private categories: Category[] = [];
  private defaultColor: string = "#ffffff3d";

  async create(data: Prisma.CategoryCreateInput) {
    const category: Category = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      color: data.color ?? this.defaultColor,
    };

    this.categories.push(category);

    return category;
  }

  async update(id: string, data: CategoryUpdateInput) {
    const categoryIndex = this.categories.findIndex((category) => category.id == id);

    this.categories[categoryIndex] = { ...this.categories[categoryIndex], ...data };

    return this.categories[categoryIndex];
  }

  async list(page: number) {
    return this.categories.slice((page - 1) * 20, page * 20);
  }

  async findByName(name: string) {
    const category =  this.categories.find(cat => cat.name == name);

    return category || null;
  }

  async findById(id: string) {
     const category =  this.categories.find(cat => cat.id == id);

    return category || null;
  }
}
