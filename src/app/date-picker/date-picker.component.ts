import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

 // returns todays date -> Sun Jun 15 2025 18:15:44 GMT+0530 (India Standard Time)
today = new Date();




generateCalendar(startDate: Date){

//gives year in YYYY format as integer
  const year = startDate.getFullYear();

  
  

// return month number but 0 index based , for June -> 05
  const month = startDate.getMonth();

  // keeping day=0 will give last day of month-1
  const firstDay = new Date(year,month,1);

  const lastDay = new Date(year,month+1,0);

  const days :Date[]= [];

// Use of setDate
//   const date = new Date('2023-05-15');
// date.setDate(20);
// console.log(date); // May 20, 2023

  for(let i = new Date(firstDay);i<= new Date(lastDay);i.setDate(i.getDate()+1)){
   
    days.push(new Date(i.getFullYear(),i.getMonth(),i.getDate()));
    

    
  }
  console.log(days);
  
  
  
  
  

  



}
checkConsole(){
 this.generateCalendar(this.today);
  
  
}

}
