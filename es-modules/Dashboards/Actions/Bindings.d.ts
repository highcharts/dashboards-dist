import type { ComponentType } from '../Components/ComponentType';
import type Board from '../Board';
import type Cell from '../Layout/Cell';
import type Layout from '../Layout/Layout';
import type Row from '../Layout/Row';
import type Component from '../Components/Component.js';
import CellHTML from '../Layout/CellHTML.js';
declare namespace Bindings {
    interface MountedComponent {
        cell: Cell | CellHTML;
        component: ComponentType;
        options: Partial<Component.Options>;
    }
    function addComponent(options: Partial<ComponentType['options']>, board: Board, cell?: Cell): Promise<(Component | void)>;
    /** @internal */
    function componentFromJSON(json: Component.JSON): (Component | undefined);
    function getCell(idOrElement: string, parentElement?: HTMLElement): (Cell | undefined);
    function getRow(idOrElement: string, parentElement?: HTMLElement): (Row | undefined);
    function getLayout(idOrElement: string, parentElement?: HTMLElement): (Layout | undefined);
}
export default Bindings;
