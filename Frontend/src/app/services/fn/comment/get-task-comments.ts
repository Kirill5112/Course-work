/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';

export interface GetTaskComments$Params {
  taskId: number;
}

export function getTaskComments(http: HttpClient, rootUrl: string, params: GetTaskComments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CommentDto>>> {
  const rb = new RequestBuilder(rootUrl, getTaskComments.PATH, 'get');
  if (params) {
    rb.path('taskId', params.taskId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CommentDto>>;
    })
  );
}

getTaskComments.PATH = '/api/tasks/{taskId}/comments';
