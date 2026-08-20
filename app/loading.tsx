import Spinner from "@/components/Spinner";


const Loading = () => {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <Spinner size="xl" />
        </div>
    );
};

export default Loading;