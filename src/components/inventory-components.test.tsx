import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { BatchDetail } from "./BatchDetail";
import { BatchList } from "./BatchList";
import { ProductDetail } from "./ProductDetail";
import { SearchBar } from "./SearchBar";
import { StockMovementList } from "./StockMovementList";
import { Batch, Product, StockMovement } from "../types";

const product: Product = {
  id: "product-1",
  code: "PROD-001",
  name: "Martillo",
  description: "Martillo de acero",
  category: "Herramientas",
  unit: "piezas",
  createdAt: new Date("2026-05-01T00:00:00.000Z"),
};

const baseBatch: Batch = {
  id: "batch-1",
  productId: "product-1",
  batchNumber: "LOTE-001",
  initialQuantity: 10,
  availableQuantity: 10,
  entryDate: new Date("2026-05-01T00:00:00.000Z"),
  expiryDate: null,
  createdAt: new Date("2026-05-01T00:00:00.000Z"),
};

const movements: StockMovement[] = [
  {
    id: "mov-1",
    batchId: "batch-1",
    type: "ingreso",
    quantity: 5,
    reason: "Reposicion",
    createdAt: new Date("2026-05-01T10:00:00.000Z"),
  },
  {
    id: "mov-2",
    batchId: "batch-1",
    type: "egreso",
    quantity: 3,
    createdAt: new Date("2026-05-01T11:00:00.000Z"),
  },
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SearchBar", () => {
  test("REQ-F05 limpia la búsqueda y notifica el valor vacío", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} placeholder="Buscar inventario" />);

    await user.type(
      screen.getByPlaceholderText("Buscar inventario"),
      "martillo",
    );
    expect(onSearch).toHaveBeenLastCalledWith("martillo");

    await user.click(screen.getByTitle(/Limpiar búsqueda/i));

    expect(screen.getByPlaceholderText("Buscar inventario")).toHaveValue("");
    expect(onSearch).toHaveBeenLastCalledWith("");
  });
});

describe("StockMovementList", () => {
  test("REQ-F03 muestra estado vacío de movimientos", () => {
    render(
      <StockMovementList
        movements={[]}
        onDelete={vi.fn()}
        productUnit="piezas"
      />,
    );

    expect(
      screen.getByText(/No hay movimientos registrados/i),
    ).toBeInTheDocument();
  });

  test("REQ-F03 muestra ingresos, egresos, razón faltante y confirma eliminación", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <StockMovementList
        movements={movements}
        onDelete={onDelete}
        productUnit="piezas"
      />,
    );

    expect(screen.getByText("+ Ingreso")).toHaveClass("bg-emerald-500/15");
    expect(screen.getByText("- Egreso")).toHaveClass("bg-rose-500/15");
    expect(screen.getByText("Reposicion")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();

    await user.click(
      within(screen.getByRole("row", { name: /Reposicion/i })).getByRole(
        "button",
        { name: /Eliminar/i },
      ),
    );
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: /^Eliminar$/i }),
    );

    expect(onDelete).toHaveBeenCalledWith("mov-1");
  });

  test("REQ-F03 cancela eliminación de movimiento", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <StockMovementList
        movements={[movements[0]]}
        onDelete={onDelete}
        productUnit="piezas"
      />,
    );

    await user.click(screen.getByRole("button", { name: /Eliminar/i }));
    await user.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: /^Cancelar$/i,
      }),
    );

    expect(onDelete).not.toHaveBeenCalled();
  });
});

describe("BatchList", () => {
  test("REQ-F02 muestra estado vacío de lotes", () => {
    render(
      <BatchList
        batches={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        productUnit="piezas"
      />,
    );

    expect(screen.getByText(/No hay lotes registrados/i)).toBeInTheDocument();
  });

  test("REQ-F02 muestra lote sin vencimiento, sin botón de movimientos cuando no hay callback y cancela eliminación", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <BatchList
        batches={[baseBatch]}
        onEdit={vi.fn()}
        onDelete={onDelete}
        productUnit="piezas"
      />,
    );

    const row = screen.getByRole("row", { name: /LOTE-001/i });
    expect(within(row).getByText("-")).toHaveClass("text-slate-500");
    expect(
      within(row).queryByRole("button", { name: /Movimientos/i }),
    ).not.toBeInTheDocument();

    await user.click(within(row).getByRole("button", { name: /Eliminar/i }));
    await user.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: /^Cancelar$/i,
      }),
    );

    expect(onDelete).not.toHaveBeenCalled();
  });

  test("REQ-F02 muestra disponible cero, vencimiento vigente y dispara callbacks", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onView = vi.fn();
    const activeBatch: Batch = {
      ...baseBatch,
      id: "batch-activo",
      batchNumber: "LOTE-ACTIVO",
      availableQuantity: 0,
      expiryDate: new Date("2999-12-31T00:00:00.000Z"),
    };

    render(
      <BatchList
        batches={[activeBatch]}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
        calculateAvailable={() => 0}
        productUnit="piezas"
      />,
    );

    const row = screen.getByRole("row", { name: /LOTE-ACTIVO/i });
    expect(within(row).getByText("0 piezas")).toHaveClass("bg-rose-500/15");

    const dateCell = within(row).getByText((_content, element) => {
      return (
        element?.tagName.toLowerCase() === "span" &&
        element.className === "text-slate-300" &&
        !!element.textContent?.includes("2999")
      );
    });
    expect(dateCell).not.toHaveClass("text-rose-400");

    await user.click(within(row).getByRole("button", { name: /Movimientos/i }));
    await user.click(within(row).getByRole("button", { name: /Editar/i }));
    await user.click(within(row).getByRole("button", { name: /Eliminar/i }));
    await user.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: /^Eliminar$/i,
      }),
    );

    expect(onView).toHaveBeenCalledWith(activeBatch);
    expect(onEdit).toHaveBeenCalledWith(activeBatch);
    expect(onDelete).toHaveBeenCalledWith("batch-activo");
  });
});

describe("ProductDetail", () => {
  test("REQ-F05 usa availableQuantity cuando no recibe calculateAvailable y permite volver", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(
      <ProductDetail
        product={product}
        batches={[{ ...baseBatch, availableQuantity: 4 }]}
        onAddBatch={vi.fn()}
        onEditBatch={vi.fn()}
        onDeleteBatch={vi.fn()}
        onBack={onBack}
      />,
    );

    expect(screen.getAllByText("4 piezas").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /Volver/i }));

    expect(onBack).toHaveBeenCalled();
  });

  test("REQ-F02 cancela formulario de lote nuevo sin guardar", async () => {
    const user = userEvent.setup();
    const onAddBatch = vi.fn();

    render(
      <ProductDetail
        product={product}
        batches={[]}
        onAddBatch={onAddBatch}
        onEditBatch={vi.fn()}
        onDeleteBatch={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /\+ Nuevo Lote/i }));
    expect(
      within(screen.getByRole("dialog")).getAllByRole("heading", {
        name: /Nuevo Lote/i,
      }).length,
    ).toBeGreaterThan(0);

    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /Cancelar/i,
      }),
    );

    expect(onAddBatch).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("heading", { name: /Nuevo Lote/i }),
    ).not.toBeInTheDocument();
  });

  test("REQ-F02 edita lote con fecha de vencimiento existente", async () => {
    const user = userEvent.setup();
    const onEditBatch = vi.fn();
    const editableBatch: Batch = {
      ...baseBatch,
      expiryDate: new Date("2026-12-31T00:00:00.000Z"),
    };

    render(
      <ProductDetail
        product={product}
        batches={[editableBatch]}
        onAddBatch={vi.fn()}
        onEditBatch={onEditBatch}
        onDeleteBatch={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Editar/i }));
    await user.clear(screen.getByLabelText(/Número de Lote/i));
    await user.type(screen.getByLabelText(/Número de Lote/i), "LOTE-EDITADO");
    await user.click(screen.getByRole("button", { name: /Guardar Cambios/i }));

    expect(onEditBatch).toHaveBeenCalledWith(
      "batch-1",
      expect.objectContaining({
        batchNumber: "LOTE-EDITADO",
        expiryDate: "2026-12-31",
      }),
    );
  });
});

describe("BatchDetail", () => {
  test("REQ-F03 muestra movimiento neto positivo y vencimiento vigente", () => {
    render(
      <BatchDetail
        product={product}
        batch={{
          ...baseBatch,
          expiryDate: new Date("2999-12-31T00:00:00.000Z"),
        }}
        movements={[movements[0]]}
        onAddMovement={vi.fn()}
        onDeleteMovement={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText("+5 piezas")).toHaveClass("text-emerald-400");
    expect(screen.getByText("15 piezas")).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) => {
        return Boolean(
          element?.classList.contains("text-slate-100") &&
          element.textContent?.includes("2999"),
        );
      }),
    ).toBeInTheDocument();
  });

  test("REQ-F03 muestra movimiento neto negativo y vencimiento vencido", () => {
    render(
      <BatchDetail
        product={product}
        batch={{
          ...baseBatch,
          expiryDate: new Date("2020-01-01T00:00:00.000Z"),
        }}
        movements={[movements[1]]}
        onAddMovement={vi.fn()}
        onDeleteMovement={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText("-3 piezas")).toHaveClass("text-rose-400");
    expect(
      screen.getByText((_content, element) => {
        return (
          element?.className === "mt-3 text-lg font-semibold text-rose-400" &&
          element.textContent !== "-3 piezas"
        );
      }),
    ).toBeInTheDocument();
  });

  test("REQ-F03 permite cancelar formulario de movimiento y volver", async () => {
    const user = userEvent.setup();
    const onAddMovement = vi.fn();
    const onBack = vi.fn();

    render(
      <BatchDetail
        product={product}
        batch={baseBatch}
        movements={[]}
        onAddMovement={onAddMovement}
        onDeleteMovement={vi.fn()}
        onBack={onBack}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /\+ Nuevo Movimiento/i }),
    );
    expect(
      within(screen.getByRole("dialog")).getAllByRole("heading", {
        name: /Registrar Movimiento/i,
      }).length,
    ).toBeGreaterThan(0);

    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /Cancelar/i,
      }),
    );
    expect(
      screen.queryByRole("heading", { name: /Registrar Movimiento/i }),
    ).not.toBeInTheDocument();
    expect(onAddMovement).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /Volver/i }));
    expect(onBack).toHaveBeenCalled();
  });
});
