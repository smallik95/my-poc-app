import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
  describe('filterEmployee', () => {
    let component: AppComponent;
    let fixture: any;

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });

    it('should filter employees with salary > 1000 and yoe > 10', () => {
      const employees = [
        { name: 'John', salary: 1500, yoe: 12 },
        { name: 'Jane', salary: 800, yoe: 15 },
        { name: 'Bob', salary: 2000, yoe: 8 }
      ];
      const result = component.filterEmployee(employees);
      expect(result).toEqual([{ name: 'John', salary: 1500, yoe: 12 }]);
    });

    it('should return empty array when no employees meet criteria', () => {
      const employees = [
        { name: 'John', salary: 800, yoe: 5 },
        { name: 'Jane', salary: 900, yoe: 8 }
      ];
      const result = component.filterEmployee(employees);
      expect(result).toEqual([]);
    });

    it('should return empty array for empty input', () => {
      const result = component.filterEmployee([]);
      expect(result).toEqual([]);
    });

    it('should filter multiple qualifying employees', () => {
      const employees = [
        { name: 'John', salary: 1500, yoe: 12 },
        { name: 'Jane', salary: 1200, yoe: 15 },
        { name: 'Bob', salary: 800, yoe: 20 }
      ];
      const result = component.filterEmployee(employees);
      expect(result).toEqual([
        { name: 'John', salary: 1500, yoe: 12 },
        { name: 'Jane', salary: 1200, yoe: 15 }
      ]);
    });
  });
});
