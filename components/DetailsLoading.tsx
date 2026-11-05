import Spinner from "@/components/Spinner";

type DetailsLoadingProps = {
  kind: "anime" | "manga";
};

const DetailsLoading = ({ kind }: DetailsLoadingProps) => {
  const label = kind === "anime" ? "Anime" : "Manga";

  return (
    <div className="max-w-[1600px] mx-auto py-6 sm:py-10 animate-pulse" aria-busy="true" aria-live="polite">
      <div className="comic-panel bg-card p-5 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
          <div className="w-full max-w-[260px] aspect-[3/4] bg-muted border-[3px] border-border" />

          <div className="flex-1 space-y-5 pt-1">
            <p className="text-xs font-black uppercase tracking-[.16em] text-muted-foreground">
              Loading {label} details
            </p>
            <div className="h-10 sm:h-14 w-4/5 bg-muted" />
            <div className="h-5 w-2/5 bg-muted" />
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-3/4 bg-muted" />
            </div>
            <div className="flex gap-3 pt-3">
              <div className="h-9 w-24 bg-muted" />
              <div className="h-9 w-28 bg-muted" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8 text-muted-foreground">
        <Spinner size="lg" />
        <span className="sr-only">Loading {label} details</span>
      </div>
    </div>
  );
};

export default DetailsLoading;
