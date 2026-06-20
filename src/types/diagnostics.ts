export interface Diagnostic {
  severity:
    | "warning"
    | "error";

  message: string;
}