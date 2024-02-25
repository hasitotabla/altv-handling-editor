import * as alt from "alt-shared";

export const OPEN_KEY = 66; // B
export const VEHICLE_HANDLING_PROPERTIES = [
  "acceleration",
  "antiRollBarBiasFront",
  "antiRollBarBiasRear",
  "antiRollBarForce",
  "brakeBiasFront",
  "brakeBiasRear",
  "brakeForce",
  "camberStiffnesss",
  "centreOfMassOffset",
  "clutchChangeRateScaleDownShift",
  "clutchChangeRateScaleUpShift",
  "collisionDamageMult",
  "damageFlags",
  "deformationDamageMult",
  "downforceModifier",
  "driveBiasFront",
  "driveInertia",
  "driveMaxFlatVel",
  "engineDamageMult",
  "handBrakeForce",
  "handlingFlags",
  "inertiaMultiplier",
  "initialDragCoeff",
  "initialDriveForce",
  "initialDriveGears",
  "initialDriveMaxFlatVel",
  "lowSpeedTractionLossMult",
  "mass",
  "modelFlags",
  "monetaryValue",
  "oilVolume",
  "percentSubmerged",
  "percentSubmergedRatio",
  "petrolTankVolume",
  "rollCentreHeightFront",
  "rollCentreHeightRear",
  "seatOffsetDistX",
  "seatOffsetDistY",
  "seatOffsetDistZ",
  "steeringLock",
  "steeringLockRatio",
  "suspensionBiasFront",
  "suspensionBiasRear",
  "suspensionCompDamp",
  "suspensionForce",
  "suspensionLowerLimit",
  "suspensionRaise",
  "suspensionReboundDamp",
  "suspensionUpperLimit",
  "tractionBiasFront",
  "tractionBiasRear",
  "tractionCurveLateral",
  "tractionCurveLateralRatio",
  "tractionCurveMax",
  "tractionCurveMaxRatio",
  "tractionCurveMin",
  "tractionCurveMinRatio",
  "tractionLossMult",
  "tractionSpringDeltaMax",
  "tractionSpringDeltaMaxRatio",
  "weaponDamageMult",
];

export function castGameToEditableHandling(value) {
  switch (typeof value) {
    case "object":
      return JSON.stringify(value);

    default:
      return value;
  }
}

export function castEditableHandlingToGame(value) {
  try {
    const parsed = JSON.parse(value);
    if (!parsed) return parseFloat(value) || value;

    if (typeof parsed === "object") {
      if (!parsed.z) return new alt.Vector2(parsed.x, parsed.y);
      return new alt.Vector3(parsed.x, parsed.y, parsed.z);
    }

    return value;
  } catch (error) {
    console.log(error);
  }

  return value;
}
