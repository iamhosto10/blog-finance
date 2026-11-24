import Home from "../components/Home/Home";
import JsonLd from "@/components/CommonComponents/JsonLd";
import { buildWebSiteJsonLd } from "@/lib/structuredData";

export default async function Page() {
  return (
    <>
      <JsonLd data={buildWebSiteJsonLd()} />
      <Home />
    </>
  );
}
