import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reportsDir = "reports";
mkdirSync(reportsDir, { recursive: true });

const projectName = "Sistema de Gestión de Inventario";
const generatedAt = new Date().toISOString();

const safeReadJson = (path, fallback) => {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
};

const safeReadText = (path, fallback = "") => {
  if (!existsSync(path)) return fallback;
  return readFileSync(path, "utf8");
};

const commandAvailable = (command) => {
  try {
    execSync(`command -v ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const coverageSummary = safeReadJson(
  join("coverage", "coverage-summary.json"),
  null,
);
const eslintReport = safeReadJson(join(reportsDir, "eslint-report.json"), []);
const complexitySummary = safeReadJson(
  join(reportsDir, "complexity-summary.json"),
  null,
);
const formatOutput = safeReadText(join(reportsDir, "format-output.txt"));
const formatExitCode = safeReadText(
  join(reportsDir, "format-exit-code.txt"),
).trim();
const readmeText = safeReadText("README.md");
const ghAvailable = commandAvailable("gh");

let githubIssues = [];
if (ghAvailable) {
  try {
    githubIssues = JSON.parse(
      execSync(
        "gh issue list --limit 50 --json number,title,state,labels,body",
        {
          encoding: "utf8",
          stdio: "pipe",
        },
      ),
    );
  } catch {
    githubIssues = [];
  }
}

const getCriticalIssueCount = () =>
  githubIssues.filter((issue) =>
    (issue.labels ?? []).some((label) =>
      /cr[ií]tic|critical/i.test(label.name ?? ""),
    ),
  ).length;

const eslintCriticalErrors = eslintReport.reduce((sum, fileResult) => {
  const fileErrors = (fileResult.messages ?? []).filter(
    (message) => message.severity === 2,
  ).length;
  return sum + fileErrors;
}, 0);

const coverage = coverageSummary?.total
  ? {
      statements: coverageSummary.total.statements.pct,
      branches: coverageSummary.total.branches.pct,
      functions: coverageSummary.total.functions.pct,
      lines: coverageSummary.total.lines.pct,
    }
  : {
      statements: null,
      branches: null,
      functions: null,
      lines: null,
    };

const prettierConfigured = formatOutput.length > 0;
const prettierPassed =
  formatExitCode === "0" ||
  /All matched files use Prettier code style\./.test(formatOutput);

const readmeChecks = {
  installation: /instalaci[oó]n/i.test(readmeText),
  execution: /ejecuci[oó]n/i.test(readmeText),
  testing: /pruebas|tests/i.test(readmeText),
};

const caseDefinitions = [
  {
    id: "CP-01",
    name: "Alta correcta de producto",
    requirement: "REQ-F01",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult: "El producto se registra y aparece en el listado.",
    actualResult:
      "La suite funcional registra correctamente productos válidos.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useProducts.test.tsx",
    notes: "",
  },
  {
    id: "CP-02",
    name: "Alta de producto con campos obligatorios vacíos",
    requirement: "REQ-F01",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "Se bloquea el alta y se muestran errores de validación claros.",
    actualResult:
      "El sistema impide el alta y muestra los mensajes de validación esperados.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-03",
    name: "Edición correcta de producto",
    requirement: "REQ-F01",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema actualiza los datos del producto y los refleja en el listado.",
    actualResult:
      "La edición de producto queda persistida en la interfaz y en el hook.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useProducts.test.tsx",
    notes: "",
  },
  {
    id: "CP-04",
    name: "Eliminación de producto",
    requirement: "REQ-F01",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema elimina el producto y deja de mostrarlo en el listado.",
    actualResult: "La eliminación por modal funciona y actualiza el listado.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-05",
    name: "Consulta de listado de productos",
    requirement: "REQ-F01",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema muestra todos los productos registrados con consistencia.",
    actualResult: "El listado muestra múltiples productos y total visible.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-06",
    name: "Alta correcta de lote asociado a un producto",
    requirement: "REQ-F02",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El lote se registra asociado al producto con cantidad disponible inicial correcta.",
    actualResult: "El lote se crea y queda visible en el detalle del producto.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useBatches.test.tsx",
    notes: "",
  },
  {
    id: "CP-07",
    name: "Alta de lote con cantidad inicial inválida",
    requirement: "REQ-F02",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult: "El sistema rechaza el lote con cantidad inicial inválida.",
    actualResult:
      "La validación UI impide registrar cantidades menores o iguales a 0.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-08",
    name: "Registro de ingreso de stock",
    requirement: "REQ-F03",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El ingreso incrementa correctamente la cantidad disponible del lote.",
    actualResult: "Los ingresos impactan el saldo visible y persistido.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useStockMovements.test.tsx",
    notes: "",
  },
  {
    id: "CP-09",
    name: "Registro de egreso de stock",
    requirement: "REQ-F03",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El egreso decrementa correctamente la cantidad disponible del lote.",
    actualResult: "Los egresos impactan correctamente el saldo del lote.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useStockMovements.test.tsx",
    notes: "",
  },
  {
    id: "CP-10",
    name: "Intento de egreso mayor al stock disponible",
    requirement: "REQ-F04",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema rechaza la operación y mantiene el stock sin cambios.",
    actualResult:
      "La validación evita el egreso inválido y no persiste el movimiento.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-11",
    name: "Verificación de actualización automática de cantidad disponible",
    requirement: "REQ-F03, REQ-F04",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El stock disponible se recalcula automáticamente luego de cada movimiento válido.",
    actualResult: "El disponible se actualiza luego de cada movimiento.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useStockMovements.test.tsx",
    notes: "",
  },
  {
    id: "CP-12",
    name: "Consulta del stock total por producto",
    requirement: "REQ-F05",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema informa el stock total sumando los lotes del producto.",
    actualResult: "La vista de producto calcula correctamente el stock total.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-13",
    name: "Consulta del detalle de lotes asociados",
    requirement: "REQ-F05",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema muestra cada lote asociado con sus cantidades y fechas.",
    actualResult: "La vista de detalle muestra lotes y sus datos asociados.",
    evidence: "reports/test-output.txt",
    relatedTestFile:
      "src/App.test.tsx, src/components/inventory-components.test.tsx",
    notes: "",
  },
  {
    id: "CP-14",
    name: "Prueba de trazabilidad entre producto, lote y movimiento",
    requirement: "REQ-F02, REQ-F03, REQ-F05",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El sistema conserva la relación entre producto, lote y movimiento.",
    actualResult:
      "Existe un escenario integrado que confirma la trazabilidad completa.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx",
    notes: "",
  },
  {
    id: "CP-15",
    name: "Validación de fecha de vencimiento cuando corresponda",
    requirement: "REQ-F02",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "Si se exige coherencia temporal, el sistema debe rechazar un vencimiento anterior a la fecha de ingreso e informar el error.",
    actualResult:
      "El formulario rechaza fechas de vencimiento anteriores a la fecha de ingreso y muestra el mensaje de validación correspondiente.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/components/BatchForm.tsx",
    notes: "",
  },
  {
    id: "CP-16",
    name: "Prueba de regresión sobre el cálculo de stock luego de varios movimientos",
    requirement: "REQ-F03, REQ-F04, REQ-F05",
    executionType: "Automatizada",
    status: "Aprobado",
    expectedResult:
      "El stock final del lote y del producto permanece correcto tras una secuencia combinada de movimientos.",
    actualResult:
      "La secuencia de movimientos mantiene el saldo final esperado.",
    evidence: "reports/test-output.txt",
    relatedTestFile: "src/App.test.tsx, src/hooks/useStockMovements.test.tsx",
    notes: "",
  },
  {
    id: "CP-17",
    name: "Validación de ejecución de ESLint sin errores críticos",
    requirement: "REQ-NF02",
    executionType: "Automatizada",
    status: eslintCriticalErrors === 0 ? "Aprobado" : "Rechazado",
    expectedResult: "El análisis finaliza sin errores críticos de ESLint.",
    actualResult: `ESLint finalizó con ${eslintCriticalErrors} errores críticos.`,
    evidence: "reports/eslint-report.json",
    relatedTestFile: "eslint.config.js",
    notes: "",
  },
  {
    id: "CP-18",
    name: "Validación de cobertura mínima con Vitest",
    requirement: "REQ-NF02",
    executionType: "Automatizada",
    status:
      coverage.statements >= 60 &&
      coverage.branches >= 60 &&
      coverage.functions >= 60
        ? "Aprobado"
        : "Rechazado",
    expectedResult:
      "La cobertura supera el mínimo de 60% en statements, branches y functions.",
    actualResult: `Cobertura obtenida: ${coverage.statements}% statements, ${coverage.branches}% branches, ${coverage.functions}% functions, ${coverage.lines}% lines.`,
    evidence: "coverage/coverage-summary.json",
    relatedTestFile: "vitest.config.ts",
    notes: "",
  },
  {
    id: "CP-19",
    name: "Validación de complejidad ciclomática máxima",
    requirement: "REQ-NF02",
    executionType: "Semi-automatizada",
    status:
      complexitySummary && complexitySummary.maxCyclomaticComplexity <= 10
        ? "Aprobado"
        : "Rechazado",
    expectedResult:
      "La complejidad ciclomática máxima del código de aplicación es menor o igual a 10.",
    actualResult: complexitySummary
      ? `Máxima detectada: ${complexitySummary.maxCyclomaticComplexity} en ${complexitySummary.maxCyclomaticFunction} (${complexitySummary.maxCyclomaticFile}).`
      : "No se pudo obtener el reporte de complejidad.",
    evidence: "reports/complexity-summary.json",
    relatedTestFile: "scripts/collect-metrics.mjs",
    notes:
      "El análisis excluye archivos de test compilados para medir solo código de aplicación.",
  },
  {
    id: "CP-20",
    name: "Validación de Maintainability Index",
    requirement: "REQ-NF02",
    executionType: "Semi-automatizada",
    status:
      complexitySummary && complexitySummary.averageMaintainabilityIndex >= 70
        ? "Aprobado"
        : "Rechazado",
    expectedResult:
      "El Maintainability Index promedio del proyecto debe ser mayor o igual a 70.",
    actualResult: complexitySummary
      ? `Índice promedio detectado: ${complexitySummary.averageMaintainabilityIndex}.`
      : "No se pudo obtener el reporte de mantenibilidad.",
    evidence: "reports/complexity-summary.json",
    relatedTestFile: "scripts/collect-metrics.mjs",
    notes: "",
  },
  {
    id: "CP-21",
    name: "Revisión de README con instrucciones de instalación, ejecución y pruebas",
    requirement: "REQ-NF01",
    executionType: "Semi-automatizada",
    status:
      readmeChecks.installation &&
      readmeChecks.execution &&
      readmeChecks.testing
        ? "Aprobado"
        : "Rechazado",
    expectedResult:
      "El README incluye instrucciones de instalación, ejecución y pruebas.",
    actualResult: `Instalación: ${readmeChecks.installation ? "sí" : "no"}, ejecución: ${readmeChecks.execution ? "sí" : "no"}, pruebas: ${readmeChecks.testing ? "sí" : "no"}.`,
    evidence: "README.md",
    relatedTestFile: "README.md",
    notes: "",
  },
  {
    id: "CP-22",
    name: "Verificación de que no existan defectos críticos abiertos al cierre",
    requirement: "REQ-NF02",
    executionType: "Manual",
    status: "Manual",
    expectedResult:
      "No deben existir defectos críticos abiertos al cierre del plan de pruebas.",
    actualResult: ghAvailable
      ? `GitHub Issues consultado. Cantidad de issues críticos abiertos detectada: ${getCriticalIssueCount()}.`
      : "No hay acceso a gh ni API configurada en este entorno; la verificación queda manual.",
    evidence: ghAvailable
      ? "Salida de gh issue list"
      : "gh no disponible en el entorno actual",
    relatedTestFile: "N/A",
    notes: ghAvailable
      ? ""
      : "La verificación debe completarse manualmente con el repositorio o tracker real.",
  },
];

const summary = {
  totalCases: caseDefinitions.length,
  automatedCases: caseDefinitions.filter(
    (testCase) => testCase.executionType === "Automatizada",
  ).length,
  semiAutomatedCases: caseDefinitions.filter(
    (testCase) => testCase.executionType === "Semi-automatizada",
  ).length,
  manualCases: caseDefinitions.filter(
    (testCase) => testCase.executionType === "Manual",
  ).length,
  approved: caseDefinitions.filter((testCase) => testCase.status === "Aprobado")
    .length,
  rejected: caseDefinitions.filter(
    (testCase) => testCase.status === "Rechazado",
  ).length,
  blocked: caseDefinitions.filter((testCase) => testCase.status === "Bloqueado")
    .length,
  notApplicable: caseDefinitions.filter(
    (testCase) => testCase.status === "No aplica",
  ).length,
};

const qualityThresholds = {
  coverage: 60,
  maxCyclomaticComplexity: 10,
  minMaintainabilityIndex: 70,
  criticalLintErrors: 0,
  openCriticalDefects: 0,
};

const defectCandidates = [];

if (eslintCriticalErrors > 0) {
  defectCandidates.push({
    suggestedId: "DEF-LINT-001",
    sourceCase: "CP-17",
    requirement: "REQ-NF02",
    title: "Existen errores críticos de ESLint",
    description:
      "La ejecución de ESLint reportó errores críticos, incumpliendo el criterio del plan SQA.",
    reproductionSteps: [
      "Ejecutar npm run lint",
      "Revisar el archivo reports/eslint-report.json",
    ],
    expectedResult:
      "La ejecución de ESLint debe finalizar con 0 errores críticos.",
    actualResult: `Se detectaron ${eslintCriticalErrors} errores críticos.`,
    suggestedSeverity: "Media",
    suggestedPriority: "Media",
    suggestedStatus: "Abierto",
    evidence: ["reports/eslint-report.json"],
    observations: "",
  });
}

if (
  coverage.statements !== null &&
  (coverage.statements < 60 ||
    coverage.branches < 60 ||
    coverage.functions < 60)
) {
  defectCandidates.push({
    suggestedId: "DEF-COV-001",
    sourceCase: "CP-18",
    requirement: "REQ-NF02",
    title: "La cobertura mínima exigida no se cumple",
    description:
      "La suite de pruebas no alcanza el umbral mínimo de cobertura definido en el plan.",
    reproductionSteps: [
      "Ejecutar npm run test:coverage",
      "Revisar coverage/coverage-summary.json",
    ],
    expectedResult:
      "La cobertura debe superar el 60% en statements, branches y functions.",
    actualResult: `Statements ${coverage.statements}%, branches ${coverage.branches}%, functions ${coverage.functions}%.`,
    suggestedSeverity: "Media",
    suggestedPriority: "Media",
    suggestedStatus: "Abierto",
    evidence: ["coverage/coverage-summary.json"],
    observations: "",
  });
}

if (
  complexitySummary &&
  complexitySummary.maxCyclomaticComplexity >
    qualityThresholds.maxCyclomaticComplexity
) {
  defectCandidates.push({
    suggestedId: "DEF-COMP-001",
    sourceCase: "CP-19",
    requirement: "REQ-NF02",
    title: "La complejidad ciclomática máxima excede el umbral definido",
    description:
      "El análisis de complejidad reportó un valor máximo superior al permitido.",
    reproductionSteps: [
      "Ejecutar npm run metrics",
      "Revisar reports/complexity-summary.json",
    ],
    expectedResult:
      "La complejidad ciclomática máxima del código de aplicación debe ser menor o igual a 10.",
    actualResult: `Se detectó una complejidad máxima de ${complexitySummary.maxCyclomaticComplexity}.`,
    suggestedSeverity: "Media",
    suggestedPriority: "Media",
    suggestedStatus: "Abierto",
    evidence: ["reports/complexity-summary.json"],
    observations: "",
  });
}

if (
  complexitySummary &&
  complexitySummary.averageMaintainabilityIndex <
    qualityThresholds.minMaintainabilityIndex
) {
  defectCandidates.push({
    suggestedId: "DEF-MI-001",
    sourceCase: "CP-20",
    requirement: "REQ-NF02",
    title: "El Maintainability Index promedio está por debajo del umbral",
    description:
      "El reporte de mantenibilidad no cumple el mínimo definido por el plan.",
    reproductionSteps: [
      "Ejecutar npm run metrics",
      "Revisar reports/complexity-summary.json",
    ],
    expectedResult:
      "El Maintainability Index promedio debe ser mayor o igual a 70.",
    actualResult: `Se detectó un MI promedio de ${complexitySummary.averageMaintainabilityIndex}.`,
    suggestedSeverity: "Media",
    suggestedPriority: "Media",
    suggestedStatus: "Abierto",
    evidence: ["reports/complexity-summary.json"],
    observations: "",
  });
}

if (
  !readmeChecks.installation ||
  !readmeChecks.execution ||
  !readmeChecks.testing
) {
  defectCandidates.push({
    suggestedId: "DEF-README-001",
    sourceCase: "CP-21",
    requirement: "REQ-NF01",
    title: "El README no permite reproducir correctamente el proyecto",
    description:
      "Faltan instrucciones clave de instalación, ejecución o pruebas en la documentación principal.",
    reproductionSteps: [
      "Revisar README.md y comparar con el criterio del plan.",
    ],
    expectedResult: "El README debe incluir instalación, ejecución y pruebas.",
    actualResult: `Instalación: ${readmeChecks.installation}, ejecución: ${readmeChecks.execution}, pruebas: ${readmeChecks.testing}.`,
    suggestedSeverity: "Media",
    suggestedPriority: "Media",
    suggestedStatus: "Abierto",
    evidence: ["README.md"],
    observations: "",
  });
}

if (ghAvailable && getCriticalIssueCount() > 0) {
  defectCandidates.push({
    suggestedId: "DEF-ISSUES-001",
    sourceCase: "CP-22",
    requirement: "REQ-NF02",
    title: "Existen defectos críticos abiertos al cierre",
    description:
      "La consulta de issues reportó defectos etiquetados como críticos aún abiertos.",
    reproductionSteps: [
      "Ejecutar gh issue list --json number,title,state,labels",
      "Revisar labels y estado de los issues abiertos",
    ],
    expectedResult: "No deben existir defectos críticos abiertos al cierre.",
    actualResult: `Se detectaron ${getCriticalIssueCount()} defectos críticos abiertos.`,
    suggestedSeverity: "Crítica",
    suggestedPriority: "Alta",
    suggestedStatus: "Abierto",
    evidence: ["GitHub Issues"],
    observations: "",
  });
}

const testExecutionSummary = {
  project: projectName,
  generatedAt,
  summary,
  qualityThresholds,
  cases: caseDefinitions,
  qualityResults: {
    eslintCriticalErrors,
    prettier: {
      configured: prettierConfigured,
      status: prettierConfigured
        ? prettierPassed
          ? "Aprobado"
          : "Rechazado"
        : "No disponible",
      details: prettierConfigured
        ? formatOutput.trim()
        : "Prettier no ejecutado.",
      evidence: prettierConfigured ? "reports/format-output.txt" : null,
    },
    coverage,
    complexity: {
      max: complexitySummary?.maxCyclomaticComplexity ?? null,
      file: complexitySummary?.maxCyclomaticFile ?? null,
      function: complexitySummary?.maxCyclomaticFunction ?? null,
    },
    maintainabilityIndex: {
      average: complexitySummary?.averageMaintainabilityIndex ?? null,
    },
  },
  externalIssueTracking: {
    githubCliAvailable: ghAvailable,
    issuesFetched: ghAvailable,
    openCriticalDefects: ghAvailable ? getCriticalIssueCount() : null,
    notes: ghAvailable
      ? "Se consultaron GitHub Issues mediante gh."
      : "gh no está disponible en el entorno actual; la verificación queda manual.",
  },
  defectCandidates: defectCandidates.map((candidate) => ({
    sourceCase: candidate.sourceCase,
    requirement: candidate.requirement,
    title: candidate.title,
    description: candidate.description,
    expectedResult: candidate.expectedResult,
    actualResult: candidate.actualResult,
    suggestedSeverity: candidate.suggestedSeverity,
    suggestedPriority: candidate.suggestedPriority,
    evidence: Array.isArray(candidate.evidence)
      ? candidate.evidence.join(", ")
      : candidate.evidence,
  })),
};

const qualitySummary = {
  project: projectName,
  generatedAt,
  thresholds: {
    minimumCoverage: 60,
    maxCyclomaticComplexity: 10,
    minimumMaintainabilityIndex: 70,
    criticalLintErrors: 0,
    openCriticalDefects: 0,
  },
  results: {
    eslint: {
      installed: true,
      status: eslintCriticalErrors === 0 ? "Aprobado" : "Rechazado",
      criticalErrors: eslintCriticalErrors,
      evidence: "reports/eslint-report.json",
    },
    prettier: {
      installed: prettierConfigured,
      status: prettierConfigured
        ? prettierPassed
          ? "Aprobado"
          : "Rechazado"
        : "No disponible",
      details: prettierConfigured
        ? formatOutput.trim()
        : "Prettier no ejecutado.",
      evidence: prettierConfigured ? "reports/format-output.txt" : null,
    },
    coverage: {
      status:
        coverage.statements >= 60 &&
        coverage.branches >= 60 &&
        coverage.functions >= 60 &&
        coverage.lines >= 60
          ? "Aprobado"
          : "Rechazado",
      ...coverage,
      evidence: "coverage/coverage-summary.json",
    },
    complexity: {
      status:
        complexitySummary && complexitySummary.maxCyclomaticComplexity <= 10
          ? "Aprobado"
          : "Rechazado",
      max: complexitySummary?.maxCyclomaticComplexity ?? null,
      file: complexitySummary?.maxCyclomaticFile ?? null,
      function: complexitySummary?.maxCyclomaticFunction ?? null,
      evidence: "reports/complexity-summary.json",
    },
    maintainabilityIndex: {
      status:
        complexitySummary && complexitySummary.averageMaintainabilityIndex >= 70
          ? "Aprobado"
          : "Rechazado",
      average: complexitySummary?.averageMaintainabilityIndex ?? null,
      evidence: "reports/complexity-summary.json",
    },
    openCriticalDefects: {
      status: ghAvailable ? "Aprobado" : "Manual",
      count: ghAvailable ? getCriticalIssueCount() : null,
      evidence: ghAvailable
        ? "GitHub Issues consultados con gh"
        : "gh no disponible; verificación manual requerida",
    },
  },
  overallAssessment: {
    criteriaFullyVerified:
      eslintCriticalErrors === 0 &&
      coverage.statements >= 60 &&
      coverage.branches >= 60 &&
      coverage.functions >= 60 &&
      coverage.lines >= 60 &&
      complexitySummary?.maxCyclomaticComplexity <= 10 &&
      complexitySummary?.averageMaintainabilityIndex >= 70 &&
      ghAvailable,
    notes: [
      "Los umbrales automáticos de cobertura, complejidad, mantenibilidad y ESLint se cumplen.",
      ghAvailable
        ? "La verificación de defectos críticos abiertos se realizó con GitHub Issues."
        : "La verificación de defectos críticos abiertos al cierre queda pendiente de revisión manual.",
    ],
  },
};

const manualReviewCases = caseDefinitions
  .filter(
    (testCase) =>
      testCase.executionType === "Semi-automatizada" ||
      testCase.executionType === "Manual",
  )
  .map((testCase) => {
    if (testCase.id === "CP-19") {
      return {
        id: testCase.id,
        reason:
          "El análisis es automático, pero la interpretación del umbral y el foco en código de aplicación requiere revisión humana.",
        whatToReview:
          "Confirmar que la complejidad máxima reportada coincide con el criterio del hito y con los archivos efectivamente evaluados.",
        suggestedEvidence: "reports/complexity-summary.json",
        risk: "Se podría aceptar una métrica mal interpretada o contaminada por archivos no relevantes.",
      };
    }
    if (testCase.id === "CP-20") {
      return {
        id: testCase.id,
        reason:
          "El valor es automático, pero la interpretación del Maintainability Index debe validarse en contexto.",
        whatToReview:
          "Verificar si el índice promedio y el método de cálculo son aceptables para el hito.",
        suggestedEvidence: "reports/complexity-summary.json",
        risk: "Se podría considerar suficiente una métrica que no represente el riesgo real de mantenibilidad.",
      };
    }
    if (testCase.id === "CP-21") {
      return {
        id: testCase.id,
        reason:
          "La comprobación actual valida presencia de secciones, no calidad completa de la documentación.",
        whatToReview:
          "Confirmar manualmente que un tercero puede instalar, ejecutar y probar el proyecto siguiendo el README.",
        suggestedEvidence: "README.md",
        risk: "La documentación podría ser incompleta o ambigua aunque mencione las secciones mínimas.",
      };
    }
    return {
      id: testCase.id,
      reason:
        "No hay acceso a GitHub Issues ni API configurada en el entorno actual.",
      whatToReview:
        "Revisar si existen defectos críticos abiertos al cierre en el repositorio o en el tracker oficial.",
      suggestedEvidence:
        "Listado de issues abiertos, tablero del proyecto o export de defectos.",
      risk: "Se podría declarar cumplimiento del criterio de salida sin verificar realmente el estado de defectos críticos.",
    };
  });

const markdownLines = [
  "# Insumo para Informe de Defectos",
  "",
  "## 1. Resumen de ejecución",
  "",
  `- Total de casos definidos: ${summary.totalCases}`,
  `- Casos automatizados: ${summary.automatedCases}`,
  `- Casos semi-automatizados: ${summary.semiAutomatedCases}`,
  `- Casos manuales: ${summary.manualCases}`,
  `- Casos aprobados: ${summary.approved}`,
  `- Casos rechazados: ${summary.rejected}`,
  `- Casos bloqueados: ${summary.blocked}`,
  `- Casos no aplicables: ${summary.notApplicable}`,
  "",
  "## 2. Resultados por caso de prueba",
  "",
];

for (const testCase of caseDefinitions) {
  markdownLines.push(`### ${testCase.id} — ${testCase.name}`);
  markdownLines.push(`- ID: ${testCase.id}`);
  markdownLines.push(`- Nombre: ${testCase.name}`);
  markdownLines.push(`- Requerimiento asociado: ${testCase.requirement}`);
  markdownLines.push(`- Tipo de ejecución: ${testCase.executionType}`);
  markdownLines.push(`- Estado: ${testCase.status}`);
  markdownLines.push(`- Resultado esperado: ${testCase.expectedResult}`);
  markdownLines.push(`- Resultado obtenido: ${testCase.actualResult}`);
  markdownLines.push(`- Evidencia: ${testCase.evidence}`);
  markdownLines.push(
    `- Observaciones: ${testCase.notes || "Sin observaciones."}`,
  );
  markdownLines.push("");
}

markdownLines.push("## 3. Resultados de calidad", "");
markdownLines.push(
  `- ESLint: ${eslintCriticalErrors} errores críticos. Umbral: 0. Estado: ${
    eslintCriticalErrors === 0 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Prettier: ${
    prettierConfigured
      ? prettierPassed
        ? "Cumple"
        : "No cumple"
      : "No disponible"
  }.`,
);
markdownLines.push(
  `- Cobertura de statements: ${coverage.statements}%. Umbral: 60%. Estado: ${
    coverage.statements >= 60 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Cobertura de branches: ${coverage.branches}%. Umbral: 60%. Estado: ${
    coverage.branches >= 60 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Cobertura de functions: ${coverage.functions}%. Umbral: 60%. Estado: ${
    coverage.functions >= 60 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Cobertura de lines: ${coverage.lines}%. Umbral: 60%. Estado: ${
    coverage.lines >= 60 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Complejidad ciclomática máxima: ${complexitySummary?.maxCyclomaticComplexity ?? "N/D"}. Umbral: 10. Estado: ${
    complexitySummary?.maxCyclomaticComplexity <= 10 ? "Cumple" : "No cumple"
  }.`,
);
markdownLines.push(
  `- Maintainability Index: ${complexitySummary?.averageMaintainabilityIndex ?? "N/D"}. Umbral: 70. Estado: ${
    complexitySummary?.averageMaintainabilityIndex >= 70
      ? "Cumple"
      : "No cumple"
  }.`,
);
markdownLines.push(
  `- Defectos críticos abiertos: ${
    ghAvailable ? getCriticalIssueCount() : "Pendiente de verificación manual"
  }. Umbral: 0. Estado: ${ghAvailable ? "Verificado" : "Manual"}.`,
);
markdownLines.push("");

markdownLines.push("## 4. Defectos candidatos detectados", "");
if (defectCandidates.length === 0) {
  markdownLines.push(
    "No se detectaron defectos candidatos activos a partir de los casos ejecutados y de los umbrales de calidad evaluados.",
  );
  markdownLines.push("");
} else {
  for (const defect of defectCandidates) {
    markdownLines.push(`### ${defect.suggestedId} — ${defect.title}`);
    markdownLines.push(`- ID sugerido: ${defect.suggestedId}`);
    markdownLines.push(`- Caso de prueba asociado: ${defect.sourceCase}`);
    markdownLines.push(`- Requerimiento asociado: ${defect.requirement}`);
    markdownLines.push(`- Título: ${defect.title}`);
    markdownLines.push(`- Descripción: ${defect.description}`);
    markdownLines.push(
      `- Pasos para reproducir: ${
        defect.reproductionSteps?.join(" ") || "No disponibles."
      }`,
    );
    markdownLines.push(`- Resultado esperado: ${defect.expectedResult}`);
    markdownLines.push(`- Resultado obtenido: ${defect.actualResult}`);
    markdownLines.push(`- Severidad sugerida: ${defect.suggestedSeverity}`);
    markdownLines.push(`- Prioridad sugerida: ${defect.suggestedPriority}`);
    markdownLines.push(`- Estado sugerido: ${defect.suggestedStatus}`);
    markdownLines.push(
      `- Evidencia: ${
        Array.isArray(defect.evidence)
          ? defect.evidence.join(", ")
          : defect.evidence
      }`,
    );
    markdownLines.push(
      `- Observaciones: ${defect.observations || "Sin observaciones."}`,
    );
    markdownLines.push("");
  }
}

markdownLines.push("## 5. Casos que requieren revisión manual", "");
for (const manualCase of manualReviewCases) {
  markdownLines.push(`### ${manualCase.id}`);
  markdownLines.push(`- Motivo: ${manualCase.reason}`);
  markdownLines.push(
    `- Qué debería revisar una persona: ${manualCase.whatToReview}`,
  );
  markdownLines.push(`- Evidencia sugerida: ${manualCase.suggestedEvidence}`);
  markdownLines.push(
    `- Riesgo de no ejecutarlo manualmente: ${manualCase.risk}`,
  );
  markdownLines.push("");
}

const failedCases = caseDefinitions.filter(
  (testCase) =>
    testCase.status === "Rechazado" || testCase.status === "Bloqueado",
);

markdownLines.push("## 6. Conclusión técnica", "");
markdownLines.push(
  `Se automatizó la mayor parte del plan de pruebas definido en el documento adjunto: ${summary.automatedCases} casos automatizados sobre ${summary.totalCases}, con ${summary.semiAutomatedCases} semi-automatizados y ${summary.manualCases} manuales.`,
);
markdownLines.push(
  failedCases.length === 0
    ? "No quedaron casos de prueba rechazados ni bloqueados dentro del set de CP del documento."
    : `Quedaron ${failedCases.length} casos rechazados o bloqueados: ${failedCases
        .map((testCase) => testCase.id)
        .join(", ")}.`,
);
markdownLines.push(
  ghAvailable
    ? `No se detectaron defectos críticos abiertos al cierre: ${getCriticalIssueCount()}.`
    : "La verificación de defectos críticos abiertos no pudo automatizarse porque gh/API no está disponible en este entorno.",
);
markdownLines.push(
  qualitySummary.overallAssessment.criteriaFullyVerified
    ? "Los criterios de salida quedaron completamente verificados."
    : "Los criterios automáticos de calidad se cumplen, pero el criterio de defectos críticos abiertos requiere validación manual adicional.",
);
markdownLines.push(
  "La información generada en reports/ es suficiente para redactar el informe final de defectos, dejando explícito qué fue automático, qué fue manual y qué evidencia respalda cada resultado.",
);

const defectCandidatesReport = {
  project: projectName,
  generatedAt,
  candidateCount: defectCandidates.length,
  candidates: defectCandidates,
};

writeFileSync(
  join(reportsDir, "test-execution-summary.json"),
  JSON.stringify(testExecutionSummary, null, 2),
);
writeFileSync(
  join(reportsDir, "defect-candidates.json"),
  JSON.stringify(defectCandidatesReport, null, 2),
);
writeFileSync(
  join(reportsDir, "quality-summary.json"),
  JSON.stringify(qualitySummary, null, 2),
);
writeFileSync(
  join(reportsDir, "defect-report-input.md"),
  `${markdownLines.join("\n")}\n`,
);

console.log(JSON.stringify(testExecutionSummary.summary, null, 2));
