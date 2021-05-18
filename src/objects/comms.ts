import {BehaviorSubject} from 'rxjs';
import {Members} from '@objects/faces/members';

export const LeftNavItems$ = new BehaviorSubject<string[]>([]);
export const RightNavItems$ = new BehaviorSubject<Members|null>(null);
export const Readme$ = new BehaviorSubject<string>(``);
