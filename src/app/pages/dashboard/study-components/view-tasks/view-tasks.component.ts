import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasklistService } from '../../../../services/tasklist.service';
import { Task } from '../../../../models/Task';
import { Subscription } from 'rxjs';
import { RouteMap } from '../../../../routing/routes';
import { TaskType } from '../../../../models/InternalDTOs';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit, OnDestroy {

  // contains Ids of completed tasks
  completedTasks: string[] = []

  subscribers: Subscription[] = [];

  displayedColumnsForExperiments = ['title', 'description', 'route'];

  tasklist: Task[] = []

  constructor(
    private router: Router,
    private tasklistService: TasklistService
  ) {}

  ngOnInit() {
    this.tasklistService.update()
    this.getCompletedTasklist();
    this.getTasklist();
  }

  private getCompletedTasklist(): void {
    this.subscribers.push(
      this.tasklistService.completedTaskList.subscribe(completedTasks => {
        this.completedTasks = completedTasks
      })
    )
  }

  private getTasklist(): void {
    this.subscribers.push(
      this.tasklistService.taskList.subscribe(tasks => {
        this.tasklist = tasks
      })
    )
  }

  run(task: Task) {
    const taskRoute = RouteMap[task.id].route;
    if(taskRoute) {
      this.router.navigate([taskRoute]);
    }
  }

  get NABTask() {    
    return this.tasklist ? this.tasklist.filter(t => t.type === TaskType.NAB) : []
  }

  get experimentalTasks() {
    return this.tasklist ? this.tasklist.filter(t => t.type === TaskType.Experimental) : []
  }

  // returns true if the given task is complete, and false otherwise
  taskIsComplete(task: Task): boolean {
    if(!this.completedTasks || !task || !task.id) return false
    return this.completedTasks.includes(task.id) ? true : false
  }

  ngOnDestroy() {
    this.subscribers.forEach(x => x.unsubscribe());
  }

}
