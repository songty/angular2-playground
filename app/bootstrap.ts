import {bind, bootstrap} from 'angular2/angular2';
import {ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  ROUTER_BINDINGS,
  HTTP_BINDINGS,
  bind(ROUTER_PRIMARY_COMPONENT).toValue(AppCmp)
]);
