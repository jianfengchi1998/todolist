import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  todolist: string[] = new Array(0);

  constructor() { }

  getTodo(taskTitle: string): string {
    const todo = localStorage.getItem(taskTitle)
    if (todo !== null)
      return todo;
    return "Error retriving todo";
  }

  getTodoList(): string[] {
    const todolist = localStorage.getItem('todolist')
    if (todolist !== null)
      this.todolist = JSON.parse(todolist);
    else this.todolist = [];
    return this.todolist;
  }

  saveTodoList(todolist: string[]): void {
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }

  saveTodo(taskTitle: string, taskContent: string): void {
    localStorage.setItem(taskTitle, taskContent);
    this.todolist.push(taskTitle);
    this.saveTodoList(this.todolist);
  }

  deleteTodo(taskTitle: string): void {
    localStorage.removeItem(taskTitle);
    this.todolist = this.todolist.filter(
      (taskname) => {
        if (taskname !== taskTitle)
          return taskname
        else return;
      }
    )
    this.saveTodoList(this.todolist);
  }

  editTodo(originalTaskTitle:string, editedTaskTitle:string, content:string){
    localStorage.removeItem(originalTaskTitle);
    localStorage.setItem(editedTaskTitle, content);
    for(let i=0;i<this.todolist.length;i++)
    {
      if(this.todolist[i]===originalTaskTitle)
      {
        this.todolist[i]=editedTaskTitle;
      }
    }
    this.saveTodoList(this.todolist);
  }

  todoTitleExist(taskTitle:string):boolean{
    for(let i = 0;i<this.todolist.length;i++)
    {
      if(this.todolist[i]===taskTitle)
        return true;
    }
    return false;
  }
}
