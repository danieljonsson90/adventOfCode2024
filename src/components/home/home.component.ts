import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as AllFunctions from '../../functions';
import { LoginComponent } from '../login.component';

@UntilDestroy()
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  result = 0;
  listOne: number[] = [];
  listTwo: number[] = [];
  options = Array.from({ length: 24 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  problemOptions = Array.from({ length: 2 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.options.unshift({
      value: 0,
      label: 'Välj',
    });
    this.problemOptions.unshift({
      value: 0,
      label: 'Välj',
    });

    this.form = this.fb.group({
      dropdownControl: new FormControl('0'), // Standardvärde
      dropdownProblemControl: new FormControl('0'), // Standardvärde
    });

    this.form
      .get('dropdownControl')
      ?.valueChanges.pipe(
        switchMap((val) => {
          if (+val) {
            this.result = 0;
            this.form.get('dropdownProblemControl')?.patchValue('0');
            return this.http
              .get(`assets/day${val}.txt`, {
                responseType: 'text',
              })
              .pipe(
                untilDestroyed(this),
                tap((data) => {
                  const problemOneKey =
                    `day${val}ProblemOne` as keyof typeof AllFunctions;
                  const problemTwoKey =
                    `day${val}ProblemTwo` as keyof typeof AllFunctions;
                  const problemOne = AllFunctions[problemOneKey];
                  const problemTwo = AllFunctions[problemTwoKey];
                  this.problemOneOrTwo(
                    () => problemOne(data, this.result),
                    () => problemTwo(data, this.result)
                  );
                })
              );
          } else {
            return of(undefined);
          }
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private problemOneOrTwo(problemOne: () => number, problemTwo: () => number) {
    this.form
      .get('dropdownProblemControl')
      ?.valueChanges.pipe()
      .subscribe((val) => {
        if (val === '1') {
          this.result = 0;
          this.result = problemOne();
        } else if (val === '2') {
          this.result = 0;
          this.result = problemTwo();
        } else {
          this.result = 0;
        }
      });
  }
}
