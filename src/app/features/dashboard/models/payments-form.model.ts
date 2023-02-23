import { FormControl } from "@angular/forms";

export interface PaymentsForm {
  title: FormControl<string | null>,
  date: FormControl<string | null>,
  amount: FormControl<string | null>
}
