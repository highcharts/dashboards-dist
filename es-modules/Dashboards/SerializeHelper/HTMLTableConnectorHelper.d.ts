import type JSON from '../JSON';
import type HTMLTableConnectorOptions from '../../Data/Connectors/HTMLTableConnectorOptions';
import type HTMLTableConverterOptions from '../../Data/Converters/HTMLTableConverterOptions';
import HTMLTableConnector from '../../Data/Connectors/HTMLTableConnector.js';
import Serializable from '../Serializable.js';
declare namespace HTMLTableConnectorHelper {
    interface JSON extends Serializable.JSON<'Data.HTMLTableConnector'> {
        options: OptionsJSON;
    }
    type OptionsJSON = JSON.Object & HTMLTableConnectorOptions & HTMLTableConverterOptions;
}
declare const HTMLTableConnectorHelper: Serializable.Helper<HTMLTableConnector, HTMLTableConnectorHelper.JSON>;
export default HTMLTableConnectorHelper;
