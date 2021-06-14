import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent {
  @Input() aliasedForControls: { [key: string]: string } = {};
  @Input() form: FormGroup;

  private haveValidationErrorsForControl(controlName: string): boolean {
    if (this.form[controlName]) {
      return false;
    }
    const control = this.form.get(controlName);

    if (!control.touched) {
      return false;
    }
    return control?.errors !== null;
  }

  getValidationErrors(): Array<string> {
    const errors = [];

    for (const controlName of Object.keys(this.form.controls)) {
      if (!this.haveValidationErrorsForControl(controlName)) {
        continue;
      }
      for (const [keyError, valueError] of Object.entries(this.form.get(controlName).errors)) {
        let outputString = keyError;
        const controlNameAlias = (this.aliasedForControls && this.aliasedForControls[controlName]) || controlName;

        switch (keyError) {
          case 'required':
            outputString = `Значение поля: ${controlNameAlias} обязательно для ввода`;
            break;
          case 'minlength':
            outputString = `Минимальная длина для поля ${controlNameAlias} равна ${valueError?.requiredLength}`;
            break;
          case 'maxlength':
            outputString = `Максимальная длина для поля ${controlNameAlias} равна ${valueError?.requiredLength}`;
            break;
          case 'WrongEmailFormat':
            outputString = `Электронная почта не соответствует формату`;
            break;
          default:
            break;
        }
        errors.push(outputString);
      }
    }
    return errors;
  }


}
