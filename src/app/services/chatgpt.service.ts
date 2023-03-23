import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ChatgptService {

  constructor() { }
  readonly configuration = new Configuration({

    organization: environment.organization,
    apiKey: environment.apiKey,
  });

  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string) {
    return from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 256
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    );
  }

  getImageFromOpenAI(text: string) {
    return from(this.openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.data && data.data.length > 0 && data.data[0].url),
      map(data => data.data[0].url)
    );
  }

}

