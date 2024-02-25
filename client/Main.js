import * as alt from "alt-client";

const OPEN_KEY = 66; // B
const VEHICLE_HANDLING_PROPERTIES = [
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

let isOpened = false;
let webviewHandle;

function onVehicleUpdate(data) {
  const vehicle = alt.Player.local.vehicle;
  if (!vehicle) return;

  alt.emitServer("handling:sync", data);
}

function resetVehicleHandling() {
  const vehicle = alt.Player.local.vehicle;
  if (!vehicle) return;

  vehicle.handling.reset();
  updateFormData();

  alt.emitServer("handling:reset");
}

function copyVehicleHandling() {
  const vehicle = alt.Player.local.vehicle;
  if (!vehicle) return;

  const handling = vehicle.handling;
  const handlingString = JSON.stringify(handling);
  alt.copyToClipboard(handlingString);
}

function castHandlingValue(value) {
  switch (typeof value) {
    case "object":
      return JSON.stringify(value);

    case "string":
      return parseFloat(value) || value;

    default:
      return value;
  }
}

function updateFormData() {
  if (!webviewHandle) return;

  const vehicle = alt.Player.local.vehicle;
  if (!vehicle) return;

  const vehicleHandling = VEHICLE_HANDLING_PROPERTIES.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: castHandlingValue(vehicle.handling[key] ?? -1),
        modelDefault: castHandlingValue(vehicle.handling[key] ?? -1),
      },
    }),
    {}
  );

  webviewHandle.emit("handling:open", vehicleHandling);
}

function openMenu() {
  if (!alt.Player.local.vehicle?.valid) return;

  if (!webviewHandle) {
    let handle = new alt.WebView(
      "http://resource/client/html/public/index.html"
    );

    handle.focus();
    handle.on("handling:update", onVehicleUpdate.bind(this));
    handle.on("handling:reset", resetVehicleHandling.bind(this));
    handle.on("handling:copy", copyVehicleHandling.bind(this));

    webviewHandle = handle;
  }

  updateFormData();
  webviewHandle.emit("handling:setVisibility", true);
  alt.showCursor(true);
  alt.toggleGameControls(false);

  isOpened = true;
}

function closeMenu() {
  if (webviewHandle) {
    webviewHandle.emit("handling:setVisibility", false);
  }

  alt.showCursor(false);
  alt.toggleGameControls(true);

  isOpened = false;
}

alt.on("keydown", (key) => {
  if (key !== OPEN_KEY) return;

  if (!isOpened) openMenu();
  else closeMenu();
});

alt.onServer("handling:sync", (vehicleId, data) => {
  const vehicle = alt.Vehicle.getByRemoteID(vehicleId);
  if (!vehicle) return;

  for (const [key, value] of Object.entries(data)) {
    if (vehicle.handling[key] === value) continue;

    vehicle.handling[key] = parseFloat(value) || value;
  }
});

alt.onServer("handling:reset", (vehicleId, data) => {
  const vehicle = alt.Vehicle.getByRemoteID(vehicleId);
  if (!vehicle) return;

  vehicle.handling.reset();
});
