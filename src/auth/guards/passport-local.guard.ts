import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class localStrategyGuard extends AuthGuard('local-passport') {}


