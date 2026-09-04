import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const defaultSlides = fileURLToPath(
  new URL("../tmp1_Lin/slides.md", import.meta.url),
);
const slidesPath = process.argv[2] ?? defaultSlides;
let markdown = await readFile(slidesPath, "utf8");

const sectionPattern =
  /(<!--\s*_class:\s*section\s*-->)([\s\S]*?)(?=\n---(?:\n|$)|$)/g;
const sectionTitles = [];
let sectionNumber = 0;

markdown = markdown.replace(sectionPattern, (slide) => {
  const title = slide.match(/^##\s+(.+)$/m)?.[1]?.trim();

  if (!title) {
    throw new Error("section スライドに ## 見出しがありません。" );
  }

  sectionNumber += 1;
  sectionTitles.push(title);
  const label = `SECTION ${String(sectionNumber).padStart(2, "0")}`;

  if (/^#\s+SECTION(?:\s+\d+)?\s*$/m.test(slide)) {
    return slide.replace(/^#\s+SECTION(?:\s+\d+)?\s*$/m, `# ${label}`);
  }

  return slide.replace(/(<!--\s*_class:\s*section\s*-->\s*)/, `$1\n# ${label}\n`);
});

const summaryPattern =
  /<!--\s*_class:\s*summary\s*-->[\s\S]*?^#\s+(.+)$/m;
const summaryTitle = markdown.match(summaryPattern)?.[1]?.trim();
const tocTitles = summaryTitle
  ? [...sectionTitles, summaryTitle]
  : sectionTitles;

if (tocTitles.length === 0) {
  throw new Error("目次へ追加できる section がありません。" );
}

const tocItems = tocTitles.map((title) => `- ${title}`).join("\n");
const generatedToc = `<!-- AUTO-TOC:START -->\n${tocItems}\n<!-- AUTO-TOC:END -->`;
const tocPattern =
  /(<!--\s*_class:\s*toc\s*-->\s*\n+#\s+[^\n]+\n)([\s\S]*?)(?=\n---(?:\n|$))/;

if (!tocPattern.test(markdown)) {
  throw new Error("<!-- _class: toc --> の目次ページが見つかりません。" );
}

markdown = markdown.replace(tocPattern, `$1\n${generatedToc}\n`);
await writeFile(slidesPath, markdown);

console.log(
  `${tocTitles.length}件の目次と${sectionTitles.length}件のSECTION番号を更新しました。`,
);
