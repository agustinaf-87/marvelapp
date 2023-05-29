import { Component } from "@angular/core";
import { LoaderService } from "../../services/loader-service/loader.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
