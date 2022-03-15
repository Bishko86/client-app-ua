import { Params } from '@angular/router';
import { DEFAULT_ROUTER_FEATURENAME, getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
//  export interface State {
//      [DEFAULT_ROUTER_FEATURENAME]: fromRouter.RouterReducerState<any>
//  }

export interface State {
    router: RouterReducerState<any>;
  }
export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

export const selectRoute = createSelector(
  selectCurrentRoute,
  (state) => {
    return state.routeConfig.path;
  }
)

export const selectRouter = createFeatureSelector<
IAppState, 
RouterReducerState<any>
>(DEFAULT_ROUTER_FEATURENAME)

export const selectRouteNestedParams = createSelector(selectRouter, (state) => {
    let currentRoute = state.state.root;
    let params: Params = {};
    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
      params = {
        ...params,
        ...currentRoute.params,
        ...currentRoute.data,
      };
    }
    return params;
  });

  
export const selectRouteNestedParam = (param: string) =>
createSelector(selectRouteNestedParams, (params) => params && params[param]);

export const selectQueryId = selectRouteNestedParam('id');