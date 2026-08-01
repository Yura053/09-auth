import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Сторінку, яку ви шукаєте, не знайдену.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "Сторінку, яку ви шукаєте, не знайдену.",
    url: "https://notehub.com/",
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

export default function NotFoundPage() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
