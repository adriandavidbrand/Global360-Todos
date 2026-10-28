import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../models/Todo';

@Service()
export class TodoService {
    private httpClient = inject(HttpClient);
    private todosSaving: { [key: string]: Todo } = {};

    public loading = signal(false);
    public todos = signal<Todo[]>([]);
    public error = signal(false);

    load(date: string) {
        this.error.set(false);
        this.loading.set(true);
        this.httpClient.get<Todo[]>(`/api/Todo/${date}`).subscribe({
            next: todos => {
                this.loading.set(false);
                this.todos.set(todos);
            },
            error: () => {
                this.error.set(true);
                this.loading.set(false);
            }
        });
    }

    add(date: string) {
        this.todos.update(todos => [...todos, { id: 0, name: '', date: `${date}T00:00`, complete: false }]);
    }

    save(todo: Todo) {
        this.error.set(false);
        const savingKey = `todo${todo.id}`;
        this.todos.update(todos => todos.map(t => t.id === todo.id ? todo : t));
        this.todosSaving[savingKey] = todo;

        // Don't spam the server
        setTimeout(() => {
            if (this.todosSaving[savingKey] === todo) {
                delete this.todosSaving[savingKey];
                this.persist(todo);
            }
        }, 500);
    }

    delete(id: number) {
        this.error.set(false);
        this.todos.update(todos => todos.filter(t => t.id !== id));
        if (id !== 0) {
            this.httpClient.delete(`/api/Todo/${id}`).subscribe({ error: () => { this.error.set(true); } });
        }
    }

    sortByDate() {
        this.todos.update(todos => [...todos].sort((t1, t2) => t1.date > t2.date ? 1 : -1))
    }

    sortByName() {
        this.todos.update(todos => [...todos].sort((t1, t2) => t1.name > t2.name ? 1 : -1))
    }

    private persist(todo: Todo) {
        this.error.set(false);
        this.httpClient.post<Todo>('/api/Todo', todo).subscribe({
            next: ({ id }) => {
                if (todo.id === 0) {
                    this.todos.update(todos => todos.map(t => t.id === 0 ? { ...t, id } : t))
                }
            },
            error: () => { this.error.set(true); }
        });
    }
}
