import { FaEdit, FaTrash } from "react-icons/fa";
import { useCategoriasStore } from "@/store/categorias";

export default function ListaCategorias() {
    const { categorias, seleccionarCategoria, setModalMode } = useCategoriasStore();

    if (!categorias || categorias.length === 0) return null;

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((categoria) => (
                <div
                    key={categoria.id}
                    className="group relative rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-primary-dark hover:bg-primary hover:dark:bg-blue-600 hover:text-white"
                >
                    {/* ICONOS */}
                    <div className="absolute right-3 top-3 flex gap-2">
                        <button
                            onClick={() => {
                                seleccionarCategoria(categoria);
                                setModalMode("edit");
                            }}
                            className="rounded-lg p-2 text-white bg-primary dark:bg-blue-600 group-hover:bg-white group-hover:text-primary   cursor-pointer"
                            title="Editar categoría"
                        >
                            <FaEdit size={14} />
                        </button>

                        <button
                            onClick={() => {
                                seleccionarCategoria(categoria);
                                // aquí luego puedes abrir modal de confirmación
                                console.log("Eliminar", categoria.id);
                            }}
                            className="rounded-lg p-2 text-white bg-primary dark:bg-blue-600 group-hover:bg-white group-hover:text-primary cursor-pointer"
                            title="Eliminar categoría"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>

                    {/* CONTENIDO */}
                    <h3 className="mb-2 text-2xl font-semibold group-hover:text-white text-gray-800 dark:text-white">
                        {categoria.nombre}
                    </h3>

                    <p className="text-sm text-gray-600 group-hover:text-gray-400 group-hover:dark:text-gray-200  dark:text-gray-400">
                        {categoria.descripcion || "Sin descripción"}
                    </p>
                </div>
            ))}
        </div>
    );
}
