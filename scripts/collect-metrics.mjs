import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reportsDir = "reports";
const reportPath = join(reportsDir, "complexity-report.json");
const summaryPath = join(reportsDir, "complexity-summary.json");

mkdirSync(reportsDir, { recursive: true });

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const moduleReports = report.reports ?? [];

let maxCyclomatic = {
  value: Number.NEGATIVE_INFINITY,
  file: null,
  functionName: null,
};

for (const moduleReport of moduleReports) {
  for (const fn of moduleReport.functions ?? []) {
    if (
      typeof fn.cyclomatic === "number" &&
      fn.cyclomatic > maxCyclomatic.value
    ) {
      maxCyclomatic = {
        value: fn.cyclomatic,
        file: moduleReport.path ?? null,
        functionName: fn.name ?? "<anonymous>",
      };
    }
  }

  if (
    typeof moduleReport.cyclomatic === "number" &&
    moduleReport.cyclomatic > maxCyclomatic.value
  ) {
    maxCyclomatic = {
      value: moduleReport.cyclomatic,
      file: moduleReport.path ?? null,
      functionName: "<module>",
    };
  }
}

const maintainabilityValues = moduleReports
  .map((moduleReport) => moduleReport.maintainability)
  .filter((value) => typeof value === "number");

const averageMaintainability = maintainabilityValues.length
  ? Number(
      (
        maintainabilityValues.reduce((sum, value) => sum + value, 0) /
        maintainabilityValues.length
      ).toFixed(2),
    )
  : null;

const summary = {
  generatedAt: new Date().toISOString(),
  maxCyclomaticComplexity: maxCyclomatic.value,
  maxCyclomaticFile: maxCyclomatic.file,
  maxCyclomaticFunction: maxCyclomatic.functionName,
  averageMaintainabilityIndex: averageMaintainability,
  moduleCount: moduleReports.length,
};

writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

console.log(JSON.stringify(summary, null, 2));
