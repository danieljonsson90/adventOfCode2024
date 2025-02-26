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
import {
  dayOneProblemOne,
  dayOneProblemTwo,
  handleData,
} from '../../functions/day1';
import { dayTwoProblemOne, dayTwoProblemTwo } from '../../functions/day2';
import { dayThreeProblemOne, dayThreeProblemTwo } from '../../functions/day3';
import { dayFourProblemOne, dayFourProblemTwo } from '../../functions/day4';
import { dayFiveProblemOne, dayFiveProblemTwo } from '../../functions/day5';
import { daySixProblemOne, daySixProblemTwo } from '../../functions/day6';

@UntilDestroy()
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
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
          if (val) {
            return this.http
              .get(`assets/day${val}.txt`, {
                responseType: 'text',
              })
              .pipe(
                untilDestroyed(this),
                tap((data) => {
                  switch (val) {
                    case '1': {
                      this.dayOne(data);
                      break;
                    }
                    case '2': {
                      this.problemOneOrTwo(
                        () => dayTwoProblemOne(data, this.result),
                        () => dayTwoProblemTwo(data, this.result)
                      );
                      break;
                    }
                    case '3': {
                      this.problemOneOrTwo(
                        () => dayThreeProblemOne(data, this.result),
                        () => dayThreeProblemTwo(data, this.result)
                      );
                      break;
                    }
                    case '4': {
                      this.problemOneOrTwo(
                        () => dayFourProblemOne(data, this.result),
                        () => dayFourProblemTwo(data, this.result)
                      );
                      break;
                    }
                    case '5': {
                      this.problemOneOrTwo(
                        () => dayFiveProblemOne(data, this.result),
                        () => dayFiveProblemTwo(data, this.result)
                      );
                      break;
                    }
                    case '6': {
                      this.problemOneOrTwo(
                        () => daySixProblemOne(data, this.result),
                        () => daySixProblemTwo(data, this.result)
                      );
                      break;
                    }
                    default: {
                      return;
                    }
                  }
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

  dayOne(data: string) {
    [this.listOne, this.listTwo] = handleData(data);

    this.problemOneOrTwo(
      () => dayOneProblemOne(this.listOne, this.listTwo, this.result),
      () => dayOneProblemTwo(this.listOne, this.listTwo, this.result)
    );
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
