"use client";

import { FormEvent, useMemo, useState } from "react";
import { initialProducts, Product } from "../lib/stockpilot-data";

export function StockPilotInventoryManager() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: "0",
    reorderPoint: "0",
    price: "0",
    supplier: "",
  });

  const lowStock = useMemo(
    () => products.filter((product) => product.quantity <= product.reorderPoint),
    [products],
  );

  const handleAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newProduct.name.trim() || !newProduct.sku.trim()) {
      return;
    }

    setProducts((current) => [
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        sku: newProduct.sku.trim().toUpperCase(),
        quantity: Number(newProduct.quantity),
        reorderPoint: Number(newProduct.reorderPoint),
        price: Number(newProduct.price),
        supplier: newProduct.supplier.trim() || "Unassigned supplier",
        velocity: 8,
        returns: 0,
      },
      ...current,
    ]);

    setNewProduct({
      name: "",
      sku: "",
      quantity: "0",
      reorderPoint: "0",
      price: "0",
      supplier: "",
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <>
      <section className="section">
        <div className="stats-grid stats-grid-three">
          <article className="stat-card card">
            <span>Total products</span>
            <strong>{products.length}</strong>
            <small>Active SKUs currently tracked</small>
          </article>
          <article className="stat-card card warn">
            <span>Low-stock alerts</span>
            <strong>{lowStock.length}</strong>
            <small>Items currently below threshold</small>
          </article>
          <article className="stat-card card">
            <span>Suppliers covered</span>
            <strong>{new Set(products.map((product) => product.supplier)).size}</strong>
            <small>Supplier relationships represented</small>
          </article>
        </div>
      </section>

      <section className="section two-column">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Inventory Actions</p>
            <h2>Add, update, and remove products</h2>
          </div>
          <form className="card product-form" onSubmit={handleAddProduct}>
            <div className="form-grid">
              <div className="field">
                <label>Product name</label>
                <input
                  value={newProduct.name}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Matcha tins"
                />
              </div>
              <div className="field">
                <label>SKU</label>
                <input
                  value={newProduct.sku}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, sku: event.target.value }))
                  }
                  placeholder="MT-990"
                />
              </div>
              <div className="field">
                <label>Quantity</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, quantity: event.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Reorder point</label>
                <input
                  type="number"
                  value={newProduct.reorderPoint}
                  onChange={(event) =>
                    setNewProduct((current) => ({
                      ...current,
                      reorderPoint: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="field">
                <label>Unit price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, price: event.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Supplier info</label>
                <input
                  value={newProduct.supplier}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, supplier: event.target.value }))
                  }
                  placeholder="Atlas Supply"
                />
              </div>
            </div>
            <button type="submit" className="primary-button">
              Add product
            </button>
          </form>
        </div>

        <div className="card inventory-table-wrap">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <span>{product.sku}</span>
                  </td>
                  <td>
                    <strong>{product.quantity}</strong>
                    <span>Reorder at {product.reorderPoint}</span>
                  </td>
                  <td>{product.supplier}</td>
                  <td>
                    <div className="action-row">
                      <button type="button" onClick={() => updateQuantity(product.id, 1)}>
                        + Sale return
                      </button>
                      <button type="button" onClick={() => updateQuantity(product.id, -1)}>
                        - Sale
                      </button>
                      <button type="button" onClick={() => updateQuantity(product.id, 5)}>
                        + Restock
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
