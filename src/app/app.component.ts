import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map }from'rxjs/operators'
import { TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  taskTitle:string = '';
  taskContent:string = '';
  todolist!:string[];
  myForm !:FormGroup;
  selected:boolean=false;

  get title(){
    return this.myForm.get('title');
  }

  get content(){
    return this.myForm.get('content');
  }

  constructor(private cdr:ChangeDetectorRef, private todolistservice:TodolistService, private fb:FormBuilder){}

  ngOnInit(){
    this.todolist = this.todolistservice.getTodoList();
    this.myForm = this.fb.group(
      {
        title:[null,[Validators.required],this.titleValidator()],
        content:[null,[Validators.required]],
      },
    )
  }


  onTodoSubmit():void{
    if(this.selected){
      this.todolistservice.editTodo(this.taskTitle,this.title?.value,this.content?.value)
      this.todolist = this.todolistservice.getTodoList();
    }
    else{
      this.todolistservice.saveTodo(this.title?.value,this.content?.value)
    }
    this.myForm.reset();
    this.setEmptyTask();
    this.selected = false;
    this.cdr.detectChanges();
  }

  onDeleteTask(taskTitle:string):void{
    this.todolistservice.deleteTodo(taskTitle);
    this.todolist = this.todolistservice.getTodoList();
    if (taskTitle===this.taskTitle)
    {
      this.setEmptyTask();
      this.myForm.reset();
    }
  }

  onSelectTask(taskTitle:string):void{
    //selecting same task
    if(taskTitle===this.taskTitle)
    {
      //no change at all
      if((this.title?.value===taskTitle)&&(this.content?.value===this.taskContent))
        return;
    }
    this.myForm.reset();
    this.taskTitle = taskTitle;
    this.taskContent = this.todolistservice.getTodo(taskTitle);
    this.selected = true;
    this.myForm.setValue({'title':this.taskTitle,
                          'content':this.taskContent})
  }

  onNewTask(){
    this.setEmptyTask();
    this.myForm.reset();
    this.selected=false;
  }

  setEmptyTask():void{
    this.taskTitle='';
    this.taskContent='';
  }

  resetForm(){
    this.myForm.reset();
    this.setEmptyTask();
    this.selected = false;
  }

  onRevert(){
    this.myForm.setValue({'title':this.taskTitle,
                          'content':this.taskContent})
    this.selected = true;
  }

  titleValidator():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      if((control.value===null)||(control.value===''))
        return of({duplicated:true})
      else
        return of(this.todolistservice.todoTitleExist(control.value)).pipe(
          map(
            result=>{
              if((result)&&(control.value!==this.taskTitle))
                  return {duplicated:true}
              else  return null
            }
          )
        )
    }
  }

  disableRevert():boolean{
    if(!this.selected)
      return true;
    if((this.title?.value===this.taskTitle)&&(this.content?.value===this.taskContent))
      return true;
    return false;
  }

  changeMade():boolean{
    if((this.title?.value===this.taskTitle)&&(this.content?.value===this.taskContent))
      return false;
    return true;
  }
}
