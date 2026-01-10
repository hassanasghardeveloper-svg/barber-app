import AdminNav from "@/components/AdminNav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <AdminNav />
            {children}
        </div>
    );
}
