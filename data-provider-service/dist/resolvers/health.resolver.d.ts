import { LegacyAdapterService } from '../services/legacy-adapter.service';
declare class HealthStatus {
    status: string;
    timestamp: Date;
    counts: string;
}
export declare class HealthResolver {
    private readonly legacyAdapterService;
    constructor(legacyAdapterService: LegacyAdapterService);
    getHealthCheck(): Promise<HealthStatus>;
}
export {};
