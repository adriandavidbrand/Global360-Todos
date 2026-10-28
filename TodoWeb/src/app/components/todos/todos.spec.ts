import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todos } from './todos';
import { provideLocationMocks } from '@angular/common/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { inputBinding } from '@angular/core';

describe('Todos', () => {
  let component: Todos;
  let fixture: ComponentFixture<Todos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todos],
      providers: [
        provideRouter([{ path: 'todos/2026-10-28', component: Todos }]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ date: '2026-10-28' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Todos, {
      bindings: [inputBinding('date', () => '2026-10-28')]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
