import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ColorGameComponent } from './pages/tasks/color-game/color-game.component';
import { ShapeGameComponent } from './pages/tasks/shape-game/shape-game.component';
import { GoNogoComponent } from './pages/tasks/go-nogo/go-nogo.component';
import { DigitSpanComponent } from './pages/tasks/digit-span/digit-span.component';
import { TaskSwitchingComponent } from './pages/tasks/task-switching/task-switching.component';
import { DemandSelectionComponent } from './pages/tasks/demand-selection/demand-selection.component';
import { SimonTaskPrelimComponent } from './pages/tasks/simon-task-prelim/simon-task-prelim.component';
import { SimonTaskFinalComponent } from './pages/tasks/simon-task-final/simon-task-final.component';
import { SmileyFaceComponent } from './pages/tasks/smiley-face/smiley-face.component';
import { FingerTappingTaskComponent } from './pages/tasks/finger-tapping-task/finger-tapping-task.component';
import { NBackComponent } from './pages/tasks/n-back/n-back.component';
import { StroopTaskComponent } from './pages/tasks/stroop-task/stroop-task.component';
import { TrailMakingComponent } from './pages/tasks/trail-making/trail-making.component';
import { ViewExperimentsComponent } from './pages/dashboard/view-experiments/view-experiments.component';
import { ViewTasksComponent } from './pages/dashboard/view-tasks/view-tasks.component';
import { MturkLoginComponent } from './pages/mturk-login/mturk-login.component'
import { Role } from './models/InternalDTOs';
import { CanActivateRouteGuard } from './CanActivateRouteGuard';
import { FinalPageComponent } from './pages/participant/final-page/final-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login/mturk', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    data: { roles: [Role.ADMIN] },
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: '', redirectTo: 'experiments', pathMatch: 'full' },
      { path: 'experiments', component: ViewExperimentsComponent },
      { path: 'tasks', component: ViewTasksComponent }
    ]
  },
  { path: 'login/mturk', component: MturkLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'experiments/color-game', component: ColorGameComponent },
  { path: 'experiments/shape-game', component: ShapeGameComponent },
  { path: 'experiments/go-nogo', component: GoNogoComponent },
  { path: 'experiments/digit-span', component: DigitSpanComponent },
  { path: 'experiments/ts', component: TaskSwitchingComponent },
  { path: 'experiments/dst', component: DemandSelectionComponent },
  { path: 'experiments/simon-1', component: SimonTaskPrelimComponent },
  { path: 'experiments/simon-2', component: SimonTaskFinalComponent },
  { path: 'experiments/smiley-face', component: SmileyFaceComponent },
  { path: 'experiments/ftt', component: FingerTappingTaskComponent },
  { path: 'experiments/n-back', component: NBackComponent },
  { path: 'experiments/stroop', component: StroopTaskComponent },
  { path: 'experiments/trail-making', component: TrailMakingComponent },
  { path: 'complete', component: FinalPageComponent },
  { path: '**', redirectTo: '/login/mturk', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
