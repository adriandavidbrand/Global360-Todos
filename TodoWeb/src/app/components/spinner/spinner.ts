import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-spinner',
  styleUrl: './spinner.css',
  templateUrl: './spinner.html',
})
export class Spinner {
  text = input('');

  spinning = input(false, {
    transform: (v: boolean | null) => v ?? false,
  });
}
