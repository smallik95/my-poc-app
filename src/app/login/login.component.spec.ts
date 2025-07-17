import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should log username and password when both are provided', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');
      component.username = 'testuser';
      component.password = 'password123';

      // Act
      component.onSubmit();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser', 'Password:', 'password123');
    });

    it('should not log anything when username is missing', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');
      component.username = '';
      component.password = 'password123';

      // Act
      component.onSubmit();

      // Assert
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not log anything when password is missing', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');
      component.username = 'testuser';
      component.password = '';

      // Act
      component.onSubmit();

      // Assert
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register user with valid data', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');
      const name = 'John Doe';
      const email = 'john@example.com';
      const mobile = '1234567890';

      // Act
      component.register(name, email, mobile);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('User registered:', { name, email, mobile });
    });

    it('should log invalid data when name is missing', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');

      // Act
      component.register('', 'john@example.com', '1234567890');

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Invalid Data');
    });

    it('should log invalid data when email is invalid', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'log');

      // Act
      component.register('John Doe', 'invalid-email', '1234567890');

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Invalid Data');
    });
  });

  describe('validateRegistrationData', () => {
    it('should return false when no data is provided', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'error');

      // Act
      const result = component['validateRegistrationData'](null);

      // Assert
      expect(result).toBeFalse();
      expect(consoleSpy).toHaveBeenCalledWith('No data provided');
    });

    it('should return false when username is invalid', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'error');
      const data = { username: 'ab', email: 'test@example.com', mobile: '1234567890', age: 25 };

      // Act
      const result = component['validateRegistrationData'](data);

      // Assert
      expect(result).toBeFalse();
      expect(consoleSpy).toHaveBeenCalledWith('Invalid username');
    });

    it('should return false when email is invalid', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'error');
      const data = { username: 'testuser', email: 'invalid-email', mobile: '1234567890', age: 25 };

      // Act
      const result = component['validateRegistrationData'](data);

      // Assert
      expect(result).toBeFalse();
      expect(consoleSpy).toHaveBeenCalledWith('Invalid email');
    });

    it('should return false when mobile number is invalid', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'error');
      const data = { username: 'testuser', email: 'test@example.com', mobile: '123', age: 25 };

      // Act
      const result = component['validateRegistrationData'](data);

      // Assert
      expect(result).toBeFalse();
      expect(consoleSpy).toHaveBeenCalledWith('Invalid mobile number');
    });

    it('should return false when age is invalid', () => {
      // Arrange
      const consoleSpy = spyOn(console, 'error');
      const data = { username: 'testuser', email: 'test@example.com', mobile: '1234567890', age: 15 };

      // Act
      const result = component['validateRegistrationData'](data);

      // Assert
      expect(result).toBeFalse();
      expect(consoleSpy).toHaveBeenCalledWith('Invalid age');
    });

    it('should return true when all data is valid', () => {
      // Arrange
      const data = { username: 'testuser', email: 'test@example.com', mobile: '1234567890', age: 25 };

      // Act
      const result = component['validateRegistrationData'](data);

      // Assert
      expect(result).toBeTrue();
    });
  });

  describe('handleUserRegistration', () => {
    it('should save user when data is valid', () => {
      // Arrange
      spyOn(component as any, 'validateRegistrationData').and.returnValue(true);
      const userObj = { id: 123 };
      spyOn(component as any, 'createUserObject').and.returnValue(userObj);
      const saveSpy = spyOn(component as any, 'saveUser');
      const data = { username: 'testuser', email: 'test@example.com' };

      // Act
      component.handleUserRegistration(data);

      // Assert
      expect(saveSpy).toHaveBeenCalledWith(userObj);
    });

    it('should not proceed when validation fails', () => {
      // Arrange
      spyOn(component as any, 'validateRegistrationData').and.returnValue(false);
      const createSpy = spyOn(component as any, 'createUserObject');
      const saveSpy = spyOn(component as any, 'saveUser');
      const data = { username: 'test' };

      // Act
      component.handleUserRegistration(data);

      // Assert
      expect(createSpy).not.toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe('saveUser', () => {
    it('should save user to localStorage', () => {
      // Arrange
      const localStorageSpy = spyOn(localStorage, 'setItem');
      const consoleSpy = spyOn(console, 'log');
      const user = { id: 123, username: 'testuser' };

      // Act
      component['saveUser'](user);

      // Assert
      expect(localStorageSpy).toHaveBeenCalledWith('user_123', JSON.stringify(user));
      expect(consoleSpy).toHaveBeenCalledWith('User successfully registered:', user);
    });

    it('should handle errors when saving fails', () => {
      // Arrange
      const error = new Error('Storage error');
      spyOn(localStorage, 'setItem').and.throwError(error);
      const consoleSpy = spyOn(console, 'error');
      const user = { id: 123, username: 'testuser' };

      // Act
      component['saveUser'](user);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Failed to store user:', error);
    });
  });
});