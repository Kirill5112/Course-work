/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamDto } from '../../models/team-dto';

export interface UpdateTeam$Params {
  projectId: number;
  id: number;
      body: TeamDto
}

export function updateTeam(http: HttpClient, rootUrl: string, params: UpdateTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamDto>> {
  const rb = new RequestBuilder(rootUrl, updateTeam.PATH, 'put');
  if (params) {
    rb.path('projectId', params.projectId, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamDto>;
    })
  );
}

updateTeam.PATH = '/api/teams/{projectId}/{id}';
