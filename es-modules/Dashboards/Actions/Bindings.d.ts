import type { ComponentType } from '../Components/ComponentType';
import type Board from '../Board';
import type Cell from '../Layout/Cell';
import type Layout from '../Layout/Layout';
import type Row from '../Layout/Row';
import type Component from '../Components/Component.js';
import type { Options as ComponentOptions } from '../Components/Component.js';
import CellHTML from '../Layout/CellHTML.js';
export interface MountedComponent {
    cell: Cell | CellHTML;
    component: ComponentType;
    options: Partial<ComponentOptions>;
}
export declare function addComponent(options: Partial<ComponentType['options']>, board: Board, cell?: Cell): Promise<(Component | void)>;
export declare function getCell(idOrElement: string, parentElement?: HTMLElement): (Cell | undefined);
export declare function getRow(idOrElement: string, parentElement?: HTMLElement): (Row | undefined);
export declare function getLayout(idOrElement: string, parentElement?: HTMLElement): (Layout | undefined);
declare const Bindings: {
    addComponent: typeof addComponent;
    getCell: typeof getCell;
    getLayout: typeof getLayout;
    getRow: typeof getRow;
};
export default Bindings;
