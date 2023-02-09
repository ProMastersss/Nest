import { Injectable } from '@nestjs/common';
import {
  createJSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCServer,
  JSONRPCServerMiddlewareNext,
} from 'json-rpc-2.0';

@Injectable()
export class JsonRPCServer {
  private server: JSONRPCServer;

  constructor() {
    this.server = new JSONRPCServer();
    this.server.applyMiddleware(this.exceptionMiddleware);
  }

  getServer() {
    return this.server;
  }

  async exceptionMiddleware(
    next: JSONRPCServerMiddlewareNext<void>,
    request: JSONRPCRequest,
    serverParams: void,
  ) {
    try {
      return await next(request, serverParams);
    } catch (error) {
      if (error.code) {
        return createJSONRPCErrorResponse(
          request.id,
          error.code,
          error.message,
        );
      } else {
        throw error;
      }
    }
  }
}
