"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const legacy_adapter_service_1 = require("../services/legacy-adapter.service");
let HealthStatus = class HealthStatus {
    status;
    timestamp;
    counts;
};
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], HealthStatus.prototype, "status", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Date)
], HealthStatus.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], HealthStatus.prototype, "counts", void 0);
HealthStatus = __decorate([
    (0, graphql_2.ObjectType)()
], HealthStatus);
let HealthResolver = class HealthResolver {
    legacyAdapterService;
    constructor(legacyAdapterService) {
        this.legacyAdapterService = legacyAdapterService;
    }
    async getHealthCheck() {
        const health = await this.legacyAdapterService.getHealthCheck();
        return {
            status: health.status,
            timestamp: health.timestamp,
            counts: JSON.stringify(health.counts),
        };
    }
};
exports.HealthResolver = HealthResolver;
__decorate([
    (0, graphql_1.Query)(() => HealthStatus, { name: 'health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthResolver.prototype, "getHealthCheck", null);
exports.HealthResolver = HealthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [legacy_adapter_service_1.LegacyAdapterService])
], HealthResolver);
//# sourceMappingURL=health.resolver.js.map