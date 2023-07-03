import type JSON from '../JSON';
import HTMLTableConnector from '../../Data/Connectors/HTMLTableConnector.js';
import Serializable from '../Serializable.js';
declare namespace HTMLTableConnectorHelper {
    interface JSON extends Serializable.JSON<'Data.HTMLTableConnector'> {
        options: OptionsJSON;
    }
    type OptionsJSON = (JSON.Object & HTMLTableConnector.Options);
}
declare const HTMLTableConnectorHelper: Serializable.Helper<HTMLTableConnector, HTMLTableConnectorHelper.JSON>;
export default HTMLTableConnectorHelper;
