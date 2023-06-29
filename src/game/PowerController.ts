export default interface PowerController {
    getPower(): number
    setPower(power: number): void
    addPower(power: number): void
    removePower(power: number): void
    getPowerMax(): number
    setPowerMax(power: number): void
    getPowerPercent(): number
    addPowerPercent(power: number): void
    removePowerPercent(power: number): void
}