import Spinner from "@/app/components/Spinner";


const Loading = () => {
    return (
        <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
            <Spinner />
        </div>
    );
};

export default Loading;