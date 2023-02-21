import { FormControl } from "@angular/forms";

export interface NewPassword {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>
}
