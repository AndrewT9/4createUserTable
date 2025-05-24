import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { uniqueNameValidator } from '../../utils/uniqueName.validator';
import { NameService } from '../../services/shared.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddComponent {
  public form!: FormGroup<{ name: FormControl<string> }>;

  @Output() created = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private nameService: NameService) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      name: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
          asyncValidators: [uniqueNameValidator(this.nameService)],
          updateOn: 'blur',
        },
      ],
    });
  }

  get nameCtrl() {
    return this.form.controls.name;
  }

  public create(): void {
    if (this.form.valid) {
      this.created.emit(this.form.value.name);
    }
  }

  public close(): void {
    this.cancel.emit();
  }
}
