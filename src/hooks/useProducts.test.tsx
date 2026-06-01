import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { baseProductFormData } from "../test/fixtures/inventory";
import { useProducts } from "./useProducts";

describe("useProducts", () => {
  let now = 3000;

  beforeEach(() => {
    localStorage.clear();
    now = 3000;
    vi.spyOn(Date, "now").mockImplementation(() => now++);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("REQ-F01 carga productos desde localStorage convirtiendo fechas", () => {
    localStorage.setItem(
      "products",
      JSON.stringify([
        {
          id: "product-1",
          ...baseProductFormData,
          createdAt: "2026-05-01T00:00:00.000Z",
        },
      ]),
    );

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].createdAt).toBeInstanceOf(Date);
    expect(result.current.getProduct("product-1")?.name).toBe("Martillo");
  });

  test("REQ-F01 registra, actualiza, busca y elimina productos", () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.addProduct(baseProductFormData);
    });

    act(() => {
      result.current.addProduct({
        code: "MAT-001",
        name: "Clavos",
        description: "Clavo galvanizado",
        category: "Materiales",
        unit: "kg",
      });
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.searchProducts("martillo")).toHaveLength(1);
    expect(result.current.searchProducts("galvanizado")).toHaveLength(1);
    expect(result.current.searchProducts("Materiales")).toHaveLength(1);

    const created = result.current.products[0];

    act(() => {
      result.current.updateProduct(created.id, {
        ...baseProductFormData,
        name: "Martillo Pro",
      });
    });

    expect(result.current.getProduct(created.id)?.name).toBe("Martillo Pro");

    act(() => {
      result.current.deleteProduct(created.id);
    });

    expect(result.current.products).toHaveLength(1);
    expect(localStorage.getItem("products")).toContain("Clavos");
  });
});
