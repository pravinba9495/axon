import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from '../../../services/confirmation.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/sessionStorage.service';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ApathyQuestionnaireResponse } from '../../../models/Questionnaire';
import { TaskManagerService } from '../../../services/task-manager.service';
import { AuthService } from '../../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-starkstein-apathy-scale',
  templateUrl: './starkstein-apathy-scale.component.html',
  styleUrls: ['./starkstein-apathy-scale.component.scss']
})
export class StarksteinApathyScaleComponent implements OnInit {

  responses: string[] = ['Not at all', 'Slightly', 'Some', 'A lot'];

  apathyQuestionnaire = this.fb.group({
    Q1: ['', [Validators.required]],
    Q2: ['', [Validators.required]],
    Q3: ['', [Validators.required]],
    Q4: ['', [Validators.required]],
    Q5: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private questionnaireService: QuestionnaireService,
    private taskManager: TaskManagerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
   /*  if(!this.taskManager.hasExperiment()) {
      this.taskManager.handleErr()
    } */
  }

  cancel() {
    const msg = "Are you sure you want to quit? You will be unable to register for this experiment again";
    this.confirmationService.openConfirmationDialog(msg).subscribe(accept => {
      if(accept) {
        this.sessionStorage.clearSessionStorage()
        this.router.navigate(['/login/mturk'])
      }
    })
  }

  submit() {
    const userID = this.authService.getDecodedToken().UserID
    const experimentCode = this.taskManager.getExperimentCode()

    const response: ApathyQuestionnaireResponse = {
      userID: userID,
      experimentCode: experimentCode,
      Q1: this.apathyQuestionnaire.get("Q1").value,
      Q2: this.apathyQuestionnaire.get("Q2").value,
      Q3: this.apathyQuestionnaire.get("Q3").value,
      Q4: this.apathyQuestionnaire.get("Q4").value,
      Q5: this.apathyQuestionnaire.get("Q5").value,
 
    }
    this.questionnaireService.saveApathyQuestionnaireResponse(response).pipe(take(1)).subscribe(ok => {
      if(ok) {
        this.taskManager.next();
      } else {
        this.taskManager.handleErr()
      }
    }, err => {
      console.error(err)
      this.taskManager.handleErr()
    })

  }
}
