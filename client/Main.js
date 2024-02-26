import * as alt from "alt-client";
import {
  OPEN_KEY,
  VEHICLE_HANDLING_PROPERTIES,
  castEditableHandlingToGame,
  castGameToEditableHandling,
} from "../shared/Shared.js";

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

function copyText(text) {
  alt.copyToClipboard(text);
}

function updateFormData() {
  if (!webviewHandle) return;

  const vehicle = alt.Player.local.vehicle;
  if (!vehicle) return;

  const vehicleHandling = VEHICLE_HANDLING_PROPERTIES.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: vehicle.handling[key] ?? -1,
        modelDefault: vehicle.handling[key] ?? -1,
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
    handle.on("handling:copyText", copyText.bind(this));

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
    const castedValue = castEditableHandlingToGame(value);
    if (vehicle.handling[key] === castedValue) continue;
    vehicle.handling[key] = castedValue;
  }

  if (isOpened) updateFormData();
});

alt.onServer("handling:reset", (vehicleId, data) => {
  const vehicle = alt.Vehicle.getByRemoteID(vehicleId);
  if (!vehicle) return;

  vehicle.handling.reset();
  if (isOpened) updateFormData();
});
