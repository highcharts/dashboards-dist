import type { EditModeContent } from '../../CellEditing/CellEditMode.js';
import type DateTimeInputRenderer from '../Renderers/DateTimeInputRenderer.js';
import DateInputContentBase from './DateInputContentBase.js';
/**
 * Represents a datetime input type of cell content.
 */
declare class DateTimeInputContent extends DateInputContentBase implements EditModeContent {
    options: DateTimeInputRenderer.Options;
    protected getInputType(): 'datetime-local';
    protected convertToInputValue(): string;
}
export default DateTimeInputContent;
