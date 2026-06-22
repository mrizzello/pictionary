import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../team';
import { EditTeamName } from '../edit-team-name/edit-team-name';
import { MaterialModule } from '../material.module';
import { Level, WordService } from '../word';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  teamService = inject(TeamService);
  wordService = inject(WordService);
  dialog = inject(MatDialog);

  protected readonly levels: { value: Level; label: string }[] = [
    { value: 'easy', label: '🟢' },
    { value: 'middle', label: '🟡' },
    { value: 'difficult', label: '🔴' },
    { value: 'mixte', label: '🎲' },
  ];

  setLevel(level: Level) {
    this.wordService.setLevel(level);
  }

  editTeamName(team: 'team1' | 'team2') {
    const dialogRef = this.dialog.open(EditTeamName, {
      data: { name: this.teamService[team]() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService[team].set(result);
      }
    });
  }
}