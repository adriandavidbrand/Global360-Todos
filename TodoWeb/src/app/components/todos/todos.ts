import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, effect, inject, model } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TodoService } from '../../services/todo-service';
import { Spinner } from '../spinner/spinner';
import { reverseDate } from '../../functions/reverseDate';
import { addDays } from '../../functions/addDays';
import { Todo } from '../../models/Todo';

@Component({
  imports: [Spinner, DatePipe, RouterLink, NgClass],
  selector: 'app-todos',
  styleUrl: './todos.css',
  templateUrl: './todos.html',
})
export class Todos {
  private router = inject(Router);
  protected todosService = inject(TodoService);
  protected date = model.required<string>();
  protected unsaved = computed(() => this.todosService.todos().some(todo => todo.id === 0));
  protected previousDay = computed(() => reverseDate(addDays(this.date(), -1)));
  protected nextDay = computed(() => reverseDate(addDays(this.date(), 1)));
  protected idToDelete = 0;

  constructor() {
    effect(() => {
      this.router.navigate([`/todos/${this.date()}`]);
      this.todosService.load(this.date());
    });
  }

  toggleComplete(todo: Todo) {
    this.todosService.save({ ...todo, complete: !todo.complete });
  }

  saveName(todo: Todo, name: string) {
    this.todosService.save({ ...todo, name });
  }

  saveTime(todo: Todo, time: string) {
    this.todosService.save({ ...todo, date: `${this.date()}T${time}` });
  }

  delete() {
    this.todosService.delete(this.idToDelete);
  }
}
