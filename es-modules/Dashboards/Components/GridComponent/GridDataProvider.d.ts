import type DataTable from '../../../Data/DataTable';
export interface DataTableProvider {
    getDataTable(presentation?: boolean): DataTable | undefined;
}
/**
 * Returns whether the provider exposes `getDataTable`.
 *
 * @param provider
 * Data provider instance to test.
 *
 * @returns
 * `true` when provider exposes `getDataTable`.
 */
export declare function hasDataTableProvider(provider: unknown): provider is DataTableProvider;
