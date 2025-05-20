import { toZonedTime } from "date-fns-tz";
import { isSameDay, addMinutes } from "date-fns";
import type { IMedicalRepository } from "../domain/repositories/interface/IMedicalRepository";
import type { Speciality } from "../domain/entities/Speciality";

import holidays from '../infrastructure/database/holidays.json';

class ConsultationService {
  private timeZone = "America/Sao_Paulo";
  private openingHour = 8;
  private closingHour = 20;

  constructor(
    private medicalRepository: IMedicalRepository,
  ) { }

  calculateFinalHour(initialHour: Date, durationMinutes: number): Date {
    return addMinutes(initialHour, durationMinutes);
  }

  parseHour(initialHour: Date): Date {
    return toZonedTime(initialHour, this.timeZone);
  }

  async isInHoliday(initialHour: Date) {
    let isInHoliday = false;
    holidays.map(holiday => {
      const [monthStr, dayStr] = holiday.date.split('-');
      const holidayDate = new Date(
        initialHour.getFullYear(),
        parseInt(monthStr, 10) - 1, // Corrige o mês
        parseInt(dayStr, 10)
      );
      if (isSameDay(holidayDate, initialHour)) {
        isInHoliday = true;
      }
    });
    return isInHoliday;
  }

  isWithinOperatingHours(initialHour: Date, finalHour: Date): boolean {
    const startZoned = this.parseHour(initialHour);
    const endZoned = this.parseHour(finalHour);

    const openingTime = new Date(startZoned);
    openingTime.setUTCHours(this.openingHour, 0, 0, 0); // 08:00:00.000

    const closingTime = new Date(startZoned);
    closingTime.setUTCHours(this.closingHour, 0, 0, 0); // 20:00:00.000

    const isAfterOpening = startZoned >= this.parseHour(openingTime);
    const isBeforeClosing = endZoned <= this.parseHour(closingTime);
    const isDurationValid = endZoned > startZoned;

    console.log(startZoned, openingTime);
    console.log(endZoned, closingTime);
    console.log(isAfterOpening, isBeforeClosing, isDurationValid);

    return isAfterOpening && isBeforeClosing && isDurationValid;
  }

  async isMedicalAvailable(
    professionalId: number,
    speciality: Speciality,
    initialHour: Date
  ): Promise<boolean> {

    const finalHour = this.calculateFinalHour(initialHour, speciality.consultationDurationMinutes);

    const available = await this.medicalRepository.findAvailableMedical({
      initialHour: initialHour,
      endHour: finalHour,
      specialityId: speciality.id,
    });

    return available.some(m => m.id === professionalId);
  }

}

export {
  ConsultationService
}