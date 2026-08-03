import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Category } from "@/lib/categories";

interface NotesParams {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesParams): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All notes" : slug[0];

  const title = `Notes filtered by : ${tag} | NoteHub`;
  const description = `View notes filtered by category: ${tag} on NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 600,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesParams) {
  const { slug } = await params;
  const tag = slug[0] == "all" ? undefined : (slug[0] as Category);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes(1, "", 12, tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient category={tag} />
      </HydrationBoundary>
    </>
  );
}
