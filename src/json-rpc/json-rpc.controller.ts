import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JSONRPCRequest } from 'json-rpc-2.0';
import { JsonRPCServer } from './json-rpc-server';

@Controller('json-rpc')
export class JsonRpcController {
  constructor(private jsonRPCServer: JsonRPCServer) {}

  @Post()
  async jsonRPC(@Body() jsonRPCRequest: JSONRPCRequest, @Res() res: Response) {
    const jsonRPCResponse = await this.jsonRPCServer
      .getServer()
      .receive(jsonRPCRequest);

    if (jsonRPCResponse) {
      res.statusCode = 200;
      res.json(jsonRPCResponse);
    } else {
      // If response is absent, it was a JSON-RPC notification method.
      // Respond with no content status (204).
      res.sendStatus(204);
    }
  }
}
