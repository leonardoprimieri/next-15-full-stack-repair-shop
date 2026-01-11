"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "lucide-react";

export function SearchButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {status.pending ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        "Search"
      )}
    </Button>
  );
}
