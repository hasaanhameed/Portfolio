import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hasaan Hameed — CS & AI Portfolio" },
      {
        name: "description",
        content:
          "Final year Computer Science student at NUST building AI-powered web and mobile applications, with hands-on experience in LLMs, RAG pipelines, and full-stack development.",
      },
      { property: "og:title", content: "Hasaan Hameed — CS & AI Portfolio" },
      {
        property: "og:description",
        content: "Selected work in AI agents, LLM integrations, and full-stack systems.",
      },
    ],
  }),
  component: Portfolio,
});
