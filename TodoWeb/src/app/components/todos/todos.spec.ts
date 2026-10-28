import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todos } from './todos';
import { provideRouter } from '@angular/router';
import { inputBinding } from '@angular/core';

describe('Todos', () => {
  let component: Todos;
  let fixture: ComponentFixture<Todos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todos],
      providers: [
        provideRouter([{ path: 'todos/2026-10-28', component: Todos }])
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
