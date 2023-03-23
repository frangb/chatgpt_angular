import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatgptService } from './services/chatgpt.service';
import { environment } from './../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  consulta = '';
  respuesta = '';

  ngOnInit(): void {
  }

  constructor(private chatgpt: ChatgptService) {}

  enviar() {
    this.chatgpt.getDataFromOpenAI(this.consulta).subscribe(data => {
      console.log(data);
      this.respuesta = data;
  })


  }
}
