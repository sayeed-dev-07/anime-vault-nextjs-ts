import Spinner from "@/components/Spinner";


const Loading = () => {
    return (
        <div className="min-h-[20vh] w-full flex items-center justify-center">
            <Spinner />
        </div>
    );
};

export default Loading;