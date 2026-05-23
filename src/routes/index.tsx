import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arjun Mehta — Computer Science Portfolio" },
      {
        name: "description",
        content:
          "Computer science student and engineer building distributed systems, compilers, and pixel-perfect frontends.",
      },
      { property: "og:title", content: "Arjun Mehta — CS Portfolio" },
      {
        property: "og:description",
        content: "Selected work in systems, infra, and developer tooling.",
      },
    ],
  }),
  component: Portfolio,
});
