import { AfterViewInit, Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public isLoading: boolean = false;
  constructor(public loadingService: LoadingService){}

  public ngAfterViewInit() {
    this.loadingService.loading$
      .subscribe((res) =>
        setTimeout(() => {
          this.isLoading = res
        })
      );
  }
}
