import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category } from "generated/prisma";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";

interface CreateCategoryUseCaseRequest {
  name: string;
  color?: string;
}

interface CreateCategoryUseCaseResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(data: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(data.name);

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoriesRepository.create(data);

    return {
      category,
    };
  }
}
