import { Prisma, Category } from "generated/prisma";

export interface CategoryUpdateInput{
    name?:string
    color?:string;
}

export interface CategoriesRepository{
    create(data: Prisma.CategoryCreateInput):Promise<Category>;
    update(id:string,data: Prisma.CategoryUpdateInput | CategoriesRepository):Promise<Category>;
    list(page:number):Promise<Category[]>;
    findByName(name:string):Promise<Category | null>;
    findById(id: string):Promise<Category | null>;
}