export function CommentsCard() {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-background-300 p-4">
      <div className="flex items-center justify-between">
        <span>⭐⭐⭐⭐⭐</span>
        <span className="text-slate-400">21 de out, 2024</span>
      </div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim
        nec augue et malesuada. Pellentesque vitae nibh sodales, facilisis ante
        eget, elementum purus. Duis id pharetra tortor. In sit amet magna ex.
        Aenean placerat rhoncus turpis, nec tincidunt enim pulvinar quis.
        Vivamus eu dolor in metus faucibus sagittis.
      </p>
      <div className="flex items-center justify-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vibrant-green-100 text-2xl font-bold">
          LS
        </div>
        <div className="flex flex-col">
          <h5>Lucas Souza</h5>
          <span className="text-sm">Cliente</span>
        </div>
      </div>
    </div>
  );
}
