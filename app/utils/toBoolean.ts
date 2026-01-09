export const toBool = (v: any): boolean | undefined => {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return undefined;
};


export const yesNo = (v?: boolean | null) =>
  v === true ? "Yes" : v === false ? "No" : "—";


export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
};

export const clean = <T extends Record<string, any>>(obj: T) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  ) as Partial<T>;
};

