import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, effect, inject, model } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected todosService = inject(TodoService);
  protected date = model.required<string>();
  protected unsaved = computed(() => this.todosService.todos().some(todo => todo.id === 0));
  protected previousDay = computed(() => reverseDate(addDays(this.date(), -1)));
  protected nextDay = computed(() => reverseDate(addDays(this.date(), 1)));
  protected idToDelete = 0;

  constructor() {
    this.route.params.subscribe(params => {
      this.todosService.load(params['date']);
    });

    effect(() => {
      this.router.navigate(['..', this.date()], { relativeTo: this.route });
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
