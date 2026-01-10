export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-slate-950 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Premium Cuts. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
