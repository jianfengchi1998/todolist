import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todolist-part',
  templateUrl: './todolist-part.component.html',
  styleUrls: ['./todolist-part.component.css']
})
export class TodolistPartComponent implements OnInit {

  @Input() title!:string;
  @Output() deleteTask:EventEmitter<string> = new EventEmitter();
  @Output() selectTask:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectTask(){
    this.selectTask.emit(this.title);
  }

  onDeleteTask(){
    this.deleteTask.emit(this.title);
  }
}
