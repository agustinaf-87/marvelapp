import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ComicServiceService } from "./comic-service.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ApiHashAuthInterceptor } from "src/app/core/interceptor/api-hash-auth/api-hash-auth.interceptor";

describe("ComicServiceService", () => {
  let service: ComicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ComicServiceService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiHashAuthInterceptor,
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    service = TestBed.inject(ComicServiceService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return comics with name starting with Ant", (done: DoneFn) => {
    const filter = {
      titleStartsWith: "Ant",
      offset: 0,
      limit: 20,
    };

    service.getAllFilteredComics(filter).subscribe({
      next: (data) => {
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].title).toContain("Ant");
        done();
      },
      error: done.fail,
    });
  });
  //  function done() {
  //   throw new Error("Function not implemented.");
  // }
});
