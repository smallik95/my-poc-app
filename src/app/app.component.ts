import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-poc-app';
  employee:any[]=[];

  filterEmployee(employee:any[]):any[]
  {
    
    //Filter employee list where the salery is greater than 1000 and  yearof experience more than 10 years
    return employee.filter((emp:any)=>emp.salary>1000 && emp.yoe>10);
  }
}