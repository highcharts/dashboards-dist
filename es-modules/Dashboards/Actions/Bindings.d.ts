import type { ComponentType } from '../Components/ComponentType';
import type Cell from '../Layout/Cell';
import type Layout from '../Layout/Layout';
import type Row from '../Layout/Row';
import type Component from '../Components/Component.js';
import Board from '../Board';
declare namespace Bindings {
    interface MountedComponent {
        cell: Cell | Cell.DOMCell;
        component: ComponentType;
        options: Partial<Component.Options>;
    }
    function addComponent(options: Partial<ComponentType['options']>, board: Board, cell?: Cell): Promise<(Component | void)>;
    /** @internal */
    function componentFromJSON(json: Component.JSON): (Component | undefined);
    function getCell(idOrElement: string): (Cell | undefined);
    function getRow(idOrElement: string): (Row | undefined);
    function getLayout(idOrElement: string): (Layout | undefined);
}
export default Bindings;
