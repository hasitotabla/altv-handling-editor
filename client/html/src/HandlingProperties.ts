export const HANDLING_PROPERTY_DESCRIPTIONS: { [key: string]: string } = {
  acceleration: ``,
  antiRollBarBiasFront: `The bias between front and rear for the antiroll bar. (0 front, 1 rear)`,
  antiRollBarBiasRear: ``,
  antiRollBarForce: `The spring constant that is transmitted to the opposite wheel when under compression larger numbers are a larger force.</br>Larger Numbers = less body roll`,
  brakeBiasFront: `This line controls the distribution of braking force between the front and rear axles.</br></br>
  Values: (Similar to fDriveBiasFront)</br></br>
  - <b>0.0 means the rear axle only receives brake force.</b></br>
  - <b>1.0 means the front axle only receives brake force.</b></br>
  - <b>0.5 gives both axles equal brake force.</b></br>
  - <b>Values between 0.01 and 0.49 means the rear axle will receive more brake force.</b></br>
  - <b>Values between 0.51 and 0.99 means the front axles will receive more brake force than the rear.</b>`,
  brakeBiasRear: ``,
  brakeForce: `Obvious one. Multiplies the game's calculation of deceleration.</br></br>
  - <b>Bigger numbers = harder braking.</b></br></br>
  Values: 0.01 - 2.0 and above.</br></br>
  - <b>1.0 uses brake force calculation unmodified.</b>`,
  camberStiffnesss: `How much the vehicle is pushed towards its roll direction. Road camber also affects roll and applied forces.</br>Values smaller than 0.0 or greater than 1.0 create unrealistic forces.`,
  centreOfMassOffset: `Shifts the center of gravity in meters from side to side.<br/><br/>
  Values: (0 means that the center of gravity will be in the center of the vehicle.)<br/><br/>
  - <b>X: -10.0 to 10.0. Positive values move the center of gravity right.</b><br/>
  - <b>Y: -10.0 to 10.0. Positive values move the center of gravity forwards.</b><br/>
  - <b>Z: -10.0 to 10.0. Positive values move the center of gravity upwards.</b>`,
  clutchChangeRateScaleDownShift: `Clutch speed multiplier on down shifts. (Bigger numbers = faster shifts)`,
  clutchChangeRateScaleUpShift: `Clutch speed multiplier on up shifts. (Bigger numbers = faster shifts)`,
  collisionDamageMult: `Multiplies the game's calculation of damage to the vehicle by collision.`,
  damageFlags: ``,
  deformationDamageMult: `Multiplies the game's calculation of deformation damage.`,
  downforceModifier: ``,
  driveBiasFront: `This is used to determine whether a vehicle is front, rear, or four wheel drive. (0.0 = rear wheel drive, 0.5 = 4 wheel drive, 1.0 = front wheel drive. Any value between 0.01 and 0.99 is four wheel drive.)`,
  driveInertia: `Describes how fast an engine will rev. Values: 0.01 - 2.0.`,
  driveMaxFlatVel: `This determines the vehicle speed at redline in the top gear (not the show).`,
  engineDamageMult: `Multiplies the game's calculation of damage to the engine, causing explosion or engine failure. (Values for the above four: 0.0 - 10.0.)`,
  handBrakeForce: `Another obvious one. Braking power of the handbrake. Bigger numbers = harder braking. (Values: 0.0<)`,
  handlingFlags: ``,
  inertiaMultiplier: ``,
  initialDragCoeff: `Sets the drag coefficient of the vehicle. Increase to simulate aerodynamic drag. (Value: 10-120)`,
  initialDriveForce: `This modifies the game's calculation of drive force (from the output of the transmission). (Values: 0.01 - 2.0 and above.)`,
  initialDriveGears: `Obviously, this line determines how many forward speeds/gears a vehicle's transmission contains. (Values: 1 or more.)`,
  initialDriveMaxFlatVel: `This determines the vehicle speed at redline in the top gear (not the show).`,
  lowSpeedTractionLossMult: `How much traction is reduced at low speed.</br></br>
  <b>- 0.0 means normal traction. It affects mainly car burnout when pressing gas (W/UP).</b></br></br>
  <b>- Decreasing value will cause less burnout, less sliding at start.</b></br></br>
  <b>- Higher value will cause more burnout.</b>`,
  mass: `This is the weight of the vehicle in kilograms. Only used when the vehicle collides with another vehicle or non-static object.`,
  modelFlags: ``,
  monetaryValue: ``,
  oilVolume: `Amount of oil.`,
  percentSubmerged: `The percentage of the vehicle's "floating height" after it falls into the water, before sinking.</br></br>
  - <b>Default - 85% for vanilla, land vehicles. The value will stop sinking the vehicle to float for a moment before sinking. Boats excluded.</b></br></br>
  - <b>Value: Any percentage. Should be given in decimal. Example: 0.70 (70%)</b></br></br>
  - <b>An invalid number will cause the vehicle to sink without the driver drowning.</b>`,
  percentSubmergedRatio: ``,
  petrolTankVolume: `Amount of petrol that will leak after damaging a vehicle's tank.`,
  rollCentreHeightFront: `Larger Numbers = less rollovers.`,
  rollCentreHeightRear: `This value modify the weight transmission during an acceleration between the front and rear. high positive value can make your car able to do wheelies. <b>Larger Numbers = less rollovers</b>`,
  seatOffsetDistX: `Value: Driver > passenger`,
  seatOffsetDistY: `Value: Trunk > hood`,
  seatOffsetDistZ: `Value: Undercarriage > roof`,
  steeringLock: `This multiplies the game's calculation of the <b>angle of the steer wheel</b> will turn while at full turn. Steering lock is directly related to over/under-steer.<br/><br/>
  - <b>Values between 0.1 - 0.2 will simulate a long wheelbase.</b><br/><br/>
  - <b>Values around 0.75 and above will turn extremely fast. Higher values will cause the vehicle to spin out easily.</b>`,
  steeringLockRatio: ``,
  suspensionBiasFront: `This value determines which suspension is stronger, front or rear.<br/><br/>
  - <b>If value is above 0.50 then front is stiffer, when below, rear is stiffer.</b><br/><br/>`,
  suspensionBiasRear: ``,
  suspensionCompDamp: `Damping during strut compression. (Bigger values = stiffer)`,
  suspensionForce: `Affects how strong suspension is.</br></br>
  <b>1/(Force x Wheels) = Lower limit for zero force at full extension.</b>`,
  suspensionLowerLimit: `Visual limit of how far can wheels move up / down from original position.`,
  suspensionRaise: `The amount that the suspension raises the body off the wheels.`,
  suspensionReboundDamp: `Damping during strut rebound.</br></br>
  <b>Bigger values = stiffer.</b>`,
  suspensionUpperLimit: ``,
  tractionBiasFront: `Determines the distribution of traction from front to rear.</br></br>
  Values: 0.01 - 0.99.</br></br>
  - <b>0.01 = only rear axle has traction.</b><br/><br>
  - <b>0.99 = only front axle has traction.</b><br/><br>
  - <b>0.5 = both axles have equal traction.</b><br/><br>
  - <b>Entering a value of 0.0 or 1.0 causes the vehicle to have no traction.</b>`,
  tractionBiasRear: ``,
  tractionCurveLateral: `Shape of lateral traction curve.`,
  tractionCurveLateralRatio: ``,
  tractionCurveMax: `Cornering grip of the vehicle as a multiplier of the tire surface friction.`,
  tractionCurveMaxRatio: ``,
  tractionCurveMin: `Accelerating/braking grip of the vehicle as a multiplier of the tire surface friction.`,
  tractionCurveMinRatio: ``,
  tractionLossMult: `Affects how much grip is changed when driving on asphalt and mud.</br></br>
  <b>Higher values make the car less responsive and prone to sliding.</b>`,
  tractionSpringDeltaMax: `This value determines at what distance <b>above the ground</b> the car will <b>lose traction</b>.`,
  tractionSpringDeltaMaxRatio: ``,
  weaponDamageMult: `Multiplies the game's calculation of damage to the vehicle by weapons.`,
};
