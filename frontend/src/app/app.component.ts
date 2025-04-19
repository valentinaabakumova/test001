
import { Component } from '@angular/core';
import { AlienService } from './services/alien.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message = '';
  messages: any[] = [];
  nickname = 'Major Foobar';

  constructor(private alienService: AlienService) {
    this.loadMessages();
  }

  sendMessage() {
    const body = {
      message: this.message,
      nickname: this.nickname
    };

    this.alienService.sendData(body).subscribe({
      next: () => {
        this.loadMessages();
        this.message = '';
      },
      error: (err) => console.error('❌ Error sending message:', err)
    });
  }

  loadMessages() {
    this.alienService.getData().subscribe(data => this.messages = data);
  }
}
