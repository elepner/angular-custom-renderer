import { Injectable } from '@angular/core';
import { PaperScope, Project } from 'paper';

@Injectable({
  providedIn: 'root',
})
export class PaperScopeService {
  private scope = new PaperScope();
  constructor() {
    this.scope.settings.applyMatrix = false;
    this.scope.settings.insertItems = false;
  }

  /**
   * PaperJS has some shady mechanisms for tracking active projects and objects are tied to the scope
   * even though nobody asks it. Therefore wrap project creation in the service to control it in one place
   */
  createProject(canvas: HTMLCanvasElement) {
    const prevActiveProject = this.scope.project;
    const project = new Project(canvas);
    if (prevActiveProject) this.scope.project = prevActiveProject;
    return project;
  }
}
