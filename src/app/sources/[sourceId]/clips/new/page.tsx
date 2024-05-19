import { api } from "@/trpc/server";
import Link from "next/link";
import Clip from "../Clip";

export default async function ClipCreation({
  params: { sourceId },
  searchParams,
}: {
  params: { sourceId: string };
  searchParams: {start: string, end: string};
}) {
  const source = await api.source.find({ id: sourceId });

  if (!source || !source.url) {
    return <h1>Source not found</h1>
  }

  console.log(searchParams);
  return (
    <div className="px-4">
      <Link href={`/sources/${sourceId}`}>
        Go back
      </Link>
      <Clip
        source={source}
        start={parseInt(searchParams.start)}
        end={parseInt(searchParams.end)}
      />
    </div>
  );
}
