export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export type HandlingValue = string | number | Vector3;

export type InternalHandlingValue = {
  modelDefault: HandlingValue;
  value: HandlingValue;
};

export type HandlingValueTypes = "f" | "vec";
