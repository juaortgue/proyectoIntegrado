import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'USUARIOS',
    type: 'link',
    icon: 'supervised_user_circle'
  },
  {
    state: '/training',
    name: 'TRAINING',
    type: 'link',
    icon: 'fitness_center'
  },
  {
    state: '/exercises',
    name: 'EXERCISES',
    type: 'link',
    icon: 'rowing'
  }
  ,
  {
    state: '/gyms',
    name: 'GYMS',
    type: 'link',
    icon: 'account_balance'
  }
  
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
