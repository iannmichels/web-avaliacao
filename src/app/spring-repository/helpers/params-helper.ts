import { PageParams, RepositoryParams, SortPageParams } from '../types/generic/params';
import { HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { LazyLoadEvent } from 'primeng/api';

export function toHttpParams(repoParams: RepositoryParams): HttpParams {
  if (!repoParams) { return new HttpParams(); }

  let httpParams = new HttpParams({
    fromObject: _.pickBy(repoParams, (value, key) => key !== 'pageParams')
  });
  if (repoParams.pageParams) {
    const pageParams = repoParams.pageParams;
    _.forIn<SortPageParams>(pageParams.sort || {}, (order, prop) => {
      httpParams = httpParams.append('sort', prop + ',' + order);
    });
    ['size', 'page'].filter(prop => _.isNumber(pageParams[prop])).forEach(prop => {
      httpParams = httpParams.append(prop, pageParams[prop].toString());
    });
  }

  return httpParams;
}

export function toPageParams(event: LazyLoadEvent, defaultSort?: SortPageParams): PageParams {
  const pageParams: PageParams = {};
  if (event) {
    pageParams.page = Math.ceil(event.first / event.rows);
    if (event.sortField) {
      pageParams.sort = { [event.sortField]: event.sortOrder > 0 ? 'asc' : 'desc' };
    } else if (!event.sortField && defaultSort) {
      pageParams.sort = defaultSort;
    }
  } else if (defaultSort) {
    pageParams.sort = defaultSort;
  }
  return pageParams;
}
