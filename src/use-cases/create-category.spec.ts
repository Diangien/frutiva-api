import { beforeEach, describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "./create-category";
import { InMemoryCategorysRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";

describe("Create Category Use Case", () => {
  let sut: CreateCategoryUseCase;
  let categoriesRepository: InMemoryCategorysRepository;

  beforeEach(() => {
    categoriesRepository = new InMemoryCategorysRepository();
    sut = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a category", async () => {
    const { category } = await sut.execute({ name: "Legumes", color: "green" });

    expect(category.name).toEqual("Legumes");
  });

  it("should not be able to create a category with same name", async () => {
    await categoriesRepository.create({
      id: "1234",
      name: "Legumes",
      color: "Roxo",
    });

    await expect(sut.execute({ name: "Legumes", color: "green" })).rejects.toBeInstanceOf(
      CategoryAlreadyExistsError
    );
  });
});
