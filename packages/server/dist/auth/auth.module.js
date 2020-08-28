"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local.strategy");
const cookie_serializer_1 = require("./cookie-serializer");
const database_module_1 = require("../database/database.module");
const admin_auth_guard_1 = require("./admin.auth.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'local',
            }),
            database_module_1.DatabaseModule,
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            admin_auth_guard_1.UserAuthGuard,
            cookie_serializer_1.CookieSerializer,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map