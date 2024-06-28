import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertDate(date: string): { value: number, unit: string } {
    const inputDate = new Date(date);
    const currentDate = new Date();
    let timeDifference = (currentDate.getTime() - inputDate.getTime()) / 1000; // time difference in seconds

    let value: number;
    let unit: string;

    if (timeDifference < 60) {
      // less than a minute
      value = Math.floor(timeDifference);
      unit = 'seconds';
    } else if (timeDifference < 3600) {
      // less than an hour
      value = Math.floor(timeDifference / 60);
      unit = 'minutes';
    } else if (timeDifference < 86400) {
      // less than a day
      value = Math.floor(timeDifference / 3600);
      unit = 'hours';
    } else {
      // more than a day
      value = Math.floor(timeDifference / 86400);
      unit = 'days';
    }

    return { value, unit };
  }
}
