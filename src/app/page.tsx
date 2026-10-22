import { readFileSync } from "node:fs";
import { join } from "node:path";
import Scripts from "./scripts";

export default function Home() {
  const html = readFileSync(join(process.cwd(), "src/app/body.html"), "utf8");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Scripts />
    </>
  );
}
