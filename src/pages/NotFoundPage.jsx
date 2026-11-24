import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-navy">This page doesn't exist</h1>
      <p className="mt-2 text-slate-500">The link may be wrong, or the page may have moved.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}