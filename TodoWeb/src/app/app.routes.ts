import { Routes } from '@angular/router';

import { Todos } from './components/todos/todos';
import { reverseDate } from './functions/reverseDate';

export const routes: Routes = [
    {
        path: '',
        redirectTo: () => `todos/${reverseDate(new Date())}`,
        pathMatch: 'full',
    },
    { path: 'todos/:date', component: Todos }
];
