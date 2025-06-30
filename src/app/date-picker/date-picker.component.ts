import { JsonPipe, NgFor } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgFor],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  // returns todays date -> Sun Jun 15 2025 18:15:44 GMT+0530 (India Standard Time)
  today = new Date();
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);

  baseMonth = signal([
    new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate()
    ),
    new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      this.today.getDate()
    ),
  ]);

  months = computed(() => [
    this.generateCalendar(this.baseMonth()[0]),
    this.generateCalendar(this.baseMonth()[1]),
  ]);

  generateCalendar(startDate: Date): {
    monthLabel: string;
    days: { date: Date; offset: number | null }[];
  } {
    //gives year in YYYY format as integer
    const year = startDate.getFullYear();

    // return month number but 0 index based , for June -> 05
    const month = startDate.getMonth();

    // keeping day=0 will give last day of month-1
    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const days: { date: Date; offset: number | null }[] = [];

    // Use of setDate
    //   const date = new Date('2023-05-15');
    // date.setDate(20);
    // console.log(date); // May 20, 2023

    for (
      let i = new Date(firstDay);
      i <= new Date(lastDay);
      i.setDate(i.getDate() + 1)
    ) {
      days.push({
        date: new Date(i.getFullYear(), i.getMonth(), i.getDate()),
        offset: i.getDate() === 1 ? i.getDay() + 1 : null,
      });
    }

    const monthName = startDate.toLocaleDateString('en-US', { month: 'long' });
    const tempYear = startDate.toLocaleDateString('en-US', { year: 'numeric' });

    return {
      monthLabel: `${monthName} ${tempYear}`,
      days,
    };
  }

  selectedDate(date: Date, idx: number) {
    console.log('Calendar No.', idx);

    if (this.startDate() && this.endDate()) {
      this.startDate.set(date);
      this.endDate.set(null);
    } else if (this.startDate()) {
      const tempDate = this.startDate();
      if (this.startDate()! > date) {
        this.startDate.set(date);
        this.endDate.set(tempDate);
      } else {
        this.endDate.set(date);
      }
    } else {
      this.startDate.set(date);
    }

    console.log('selected start date', this.startDate());
    console.log('selected End Date', this.endDate());
  }

  isSelected(date: Date) {
    if (date == this.startDate() || date === this.endDate()) {
      return true;
    }
    return false;
  }

  inRange(date: Date) {
    if (date > this.startDate()! && date < this.endDate()!) {
      return true;
    }
    return false;
  }
  checkConsole() {
    console.log(this.generateCalendar(this.today));
    console.log(this.months());
  }
}
