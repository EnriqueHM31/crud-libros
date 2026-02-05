import { PagesRoutes } from "./routes/pages.routes";
import { Toaster } from "sonner";
import { useThemeStore } from "./store/theme.store";
function App() {
    const { mode } = useThemeStore();
    return (
        <div className="min-h-screen w-full">
            <PagesRoutes />

            <Toaster
                position="top-right"
                toastOptions={{
                    className: "bg-primary-dark text-white dark:bg-blue-600 dark:text-white",
                }}
                duration={3000}
                richColors={true}
                theme={mode}
            />
        </div>
    );
}

export default App;
