import { Component, OnInit } from '@angular/core';
import { Experiment } from 'src/app/models/Experiment';
import { ExperimentsService } from 'src/app/services/experiments.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateExperimentDialogComponent } from './create-experiment-dialog/create-experiment-dialog.component';
import { Task } from 'src/app/models/Task';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationService } from '../../../services/confirmation.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-experiments',
  templateUrl: './view-experiments.component.html',
  styleUrls: ['./view-experiments.component.scss']
})
export class ViewExperimentsComponent implements OnInit {

  constructor(
    private experimentsService: ExperimentsService,
    public dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) { }

  experiments: Experiment[] = [];

  tasks: Task[] = [];

  ngOnInit(): void {
    this.getExperiments();
  }

  openCreateExperimentDialog() {
    const dialogRef = this.dialog.open(CreateExperimentDialogComponent, {width: "30%"})

    dialogRef.afterClosed().subscribe((data: Experiment) => {      
      if(data) this._createExperiment(data);
    })
  }

  private updateExperiments() {
    this.experimentsService.updateExperiments()
  }

  private _createExperiment(experiment: Experiment) {
    this.experimentsService.createExperiment(experiment).subscribe(() => {
      this.updateExperiments()
    })
  }

  getExperiments() {
    this.experimentsService.experiments.subscribe(experiments => {
      this.experiments = experiments
    })
  }

  onDelete(code: string) {
    this.confirmationService.openConfirmationDialog(`Are you sure you want to delete experiment ${code}?`).subscribe(ok => {
      if(ok) this.deleteExperiment(code)
    })
  }

  private deleteExperiment(code: string) {
    this.experimentsService.deleteExperiment(code).subscribe((data: HttpResponse<any>) => {
      this.updateExperiments();
      this.snackbarService.openSuccessSnackbar(`Successfully deleted experiment ${code}`)
    })
  }

}