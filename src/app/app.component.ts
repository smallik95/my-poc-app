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
  ngOnInit(): void {
    this.employee=[
      {name:"John",salary:1500,yoe:12},
      {name:"Jane",salary:800,yoe:15},
      {name:"Bob",salary:2000,yoe:8}
    ];
    let s= 200/0;    
  }
  

}