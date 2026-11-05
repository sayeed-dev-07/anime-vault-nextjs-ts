import Spinner from "@/components/Spinner";


const Loading = () => {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="comic-panel flex flex-col items-center gap-4 bg-card px-10 py-8">
                <Spinner size="xl" />
                <p className="text-xs font-black uppercase tracking-[.16em]">Loading the vault...</p>
            </div>
        </div>
    );
};

export default Loading;
