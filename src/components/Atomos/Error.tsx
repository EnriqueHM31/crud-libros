export default function Error({ error }: { error: string }) {
    return <div className="rounded-xl bg-red-500/10 p-6 text-red-500">{error}</div>;;
}