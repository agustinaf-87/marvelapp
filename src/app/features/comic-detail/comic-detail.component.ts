import { Component, OnInit } from "@angular/core";
import { IComic } from "src/app/core/models/interfaces/comics/comic.interface";
import { ComicDetailService } from "./services/comic-detail.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-comic-detail",
  templateUrl: "./comic-detail.component.html",
  styleUrls: ["./comic-detail.component.scss"],
})
export class ComicDetailComponent implements OnInit {
  constructor(
    private comicDetailService: ComicDetailService,
    private route: ActivatedRoute
  ) {}
  comic!: IComic;

  public detailCardForm!: FormGroup;
  readNot = true;

  ngOnInit(): void {
    this.getFilterComicById();
    this.detailCardForm = new FormGroup({
      staticPublishDate: new FormControl(""),
      staticWriterName: new FormControl(""),
      staticDescription: new FormControl(""),
    });
  }
  getFilterComicById() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.comicDetailService.getComicById(id).subscribe((data) => {
      this.detailCardForm
        .get("staticPublishDate")
        ?.setValue(data.results[0].dates[0].date);
      this.detailCardForm
        .get("staticWriterName")
        ?.setValue(data.results[0].creators.items[0].name);
      this.detailCardForm
        .get("staticDescription")
        ?.setValue(data.results[0].description);
      this.comic = data.results[0];
    });
  }
}
