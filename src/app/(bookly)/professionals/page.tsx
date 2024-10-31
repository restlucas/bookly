import Filter from "./filter";
import List from "./list";

export default function Professionals(props: any) {
  return (
    <div className="mb-8 grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_3fr]">
      <Filter filters={props.searchParams} />
      <List />
    </div>
  );
}
