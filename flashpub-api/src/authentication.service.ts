import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {

    constructor() {
    }

    async IsValidToken(authToken: string): Promise<boolean> {
        // for the moment we'll just rely on 
        // a hardcoded token. As we grow change
        // this to something more maintainable.

        return authToken === 'Basic iwy81nEmhTD9qXbiX0Q32HDZ37vzGS7Dzu5Mk44uWQTBH5YegfUrIOLdsrLHqsZs';
    }
}

