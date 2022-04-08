import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistPartComponent } from './todolist-part.component';

describe('TodolistPartComponent', () => {
  let component: TodolistPartComponent;
  let fixture: ComponentFixture<TodolistPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
