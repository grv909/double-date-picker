import { Injectable } from '@angular/core';
import { getCurrentUser, signIn, signOut } from '@aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  email?: string;
  attributes?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.checkAuthState();
  }

  private async checkAuthState() {
    try {
      const user = await getCurrentUser();
      this.currentUserSubject.next({
        username: user.username,
        attributes: user,
      });
    } catch (error) {
      this.currentUserSubject.next(null);
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const result = await signIn({
        username,
        password,
      });

      if (result.isSignedIn) {
        const user = await getCurrentUser();
        this.currentUserSubject.next({
          username: user.username,
          attributes: user,
        });
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut();
      this.currentUserSubject.next(null);
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
