import { NgModule } from '@angular/core';
import { QuizViewerComponent } from './quiz-viewer/quiz-viewer.component';
import { QuizEditorComponent } from './quiz-editor/quiz-editor.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizTrialComponent } from './quiz-trial/quiz-trial.component';
import { SharedModule } from '../shared-modules/shared.module';

@NgModule({
  declarations: [
    QuizViewerComponent,
    QuizEditorComponent,
    QuizDetailsComponent,
    QuizTrialComponent,
  ],
  exports: [
    QuizViewerComponent,
    QuizEditorComponent,
    QuizDetailsComponent,
    QuizTrialComponent,
  ],
  imports: [SharedModule],
})
export class GeneralModule {}
